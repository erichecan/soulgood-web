#!/usr/bin/env bash
# Exports the tables needed for the Next.js migration as JSON, via a read-only
# SSH session into the soulgood-wp GCP VM. Safe to re-run any time (SELECT only).
#
# Usage: ./scripts/migrate-wp/export-wp.sh
# Output: scripts/migrate-wp/data/*.json (gitignored — contains real content and
# password hashes, never commit these files)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$SCRIPT_DIR/data"
mkdir -p "$DATA_DIR"

ZONE="us-central1-a"
INSTANCE="soulgood-wp"
DB_USER="soulgood_wp"
DB_PASS="0amXuTPw2p8g7oh9Xg6P7+Fw"
DB_NAME="soulgood_wp"
CRED="mysql -N -B --raw -u $DB_USER -p'$DB_PASS' $DB_NAME"

run_query() {
  local out_file="$1"
  local sql="$2"
  gcloud compute ssh "$INSTANCE" --zone="$ZONE" --tunnel-through-iap \
    --command="$CRED -e \"$sql\"" 2>/dev/null > "$DATA_DIR/$out_file"
}

echo "Exporting users..."
run_query users.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT(
  'id', u.ID, 'login', u.user_login, 'email', u.user_email,
  'passHash', u.user_pass, 'displayName', u.display_name,
  'registered', u.user_registered,
  'roles', (SELECT meta_value FROM wp_usermeta um WHERE um.user_id=u.ID AND um.meta_key='wp_capabilities' LIMIT 1)
)) FROM wp_users u;
"

echo "Exporting courses..."
run_query courses.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT(
  'id', p.ID, 'title', p.post_title, 'content', p.post_content, 'date', p.post_date,
  'thumbGuid', (SELECT guid FROM wp_posts WHERE ID = (SELECT meta_value FROM wp_postmeta WHERE post_id=p.ID AND meta_key='_thumbnail_id' LIMIT 1)),
  'level', (SELECT meta_value FROM wp_postmeta WHERE post_id=p.ID AND meta_key='_tutor_course_level' LIMIT 1),
  'price', (SELECT meta_value FROM wp_postmeta WHERE post_id=p.ID AND meta_key='tutor_course_price' LIMIT 1),
  'salePrice', (SELECT meta_value FROM wp_postmeta WHERE post_id=p.ID AND meta_key='tutor_course_sale_price' LIMIT 1),
  'benefits', (SELECT meta_value FROM wp_postmeta WHERE post_id=p.ID AND meta_key='_tutor_course_benefits' LIMIT 1),
  'trid', (SELECT trid FROM wp_icl_translations WHERE element_type='post_courses' AND element_id=p.ID LIMIT 1),
  'lang', (SELECT language_code FROM wp_icl_translations WHERE element_type='post_courses' AND element_id=p.ID LIMIT 1)
)) FROM wp_posts p WHERE p.post_type='courses' AND p.post_status='publish';
"

echo "Exporting blog posts..."
run_query blogs.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT(
  'id', p.ID, 'title', p.post_title, 'content', p.post_content, 'excerpt', p.post_excerpt, 'date', p.post_date,
  'author', (SELECT display_name FROM wp_users WHERE ID=p.post_author),
  'thumbGuid', (SELECT guid FROM wp_posts WHERE ID = (SELECT meta_value FROM wp_postmeta WHERE post_id=p.ID AND meta_key='_thumbnail_id' LIMIT 1)),
  'trid', (SELECT trid FROM wp_icl_translations WHERE element_type='post_post' AND element_id=p.ID LIMIT 1),
  'lang', (SELECT language_code FROM wp_icl_translations WHERE element_type='post_post' AND element_id=p.ID LIMIT 1)
)) FROM wp_posts p WHERE p.post_type='post' AND p.post_status='publish' AND p.ID<>1;
"

echo "Exporting PMPro membership levels..."
run_query membership_levels.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'initial', initial_payment, 'billing', billing_amount, 'cycle_number', cycle_number, 'cycle_period', cycle_period)) FROM wp_pmpro_membership_levels;
"

echo "Exporting PMPro memberships_users..."
run_query memberships_users.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT('id', mu.id, 'userId', mu.user_id, 'userEmail', (SELECT user_email FROM wp_users WHERE ID=mu.user_id), 'membershipId', mu.membership_id, 'status', mu.status, 'startdate', mu.startdate, 'enddate', mu.enddate)) FROM wp_pmpro_memberships_users mu;
"

echo "Exporting PMPro membership orders..."
run_query membership_orders.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT('id', o.id, 'userId', o.user_id, 'userEmail', (SELECT user_email FROM wp_users WHERE ID=o.user_id), 'membershipId', o.membership_id, 'total', o.total, 'status', o.status, 'timestamp', o.timestamp)) FROM wp_pmpro_membership_orders o;
"

echo "Exporting Tutor orders..."
run_query tutor_orders.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT('id', o.id, 'userId', o.user_id, 'userEmail', (SELECT user_email FROM wp_users WHERE ID=o.user_id), 'orderStatus', o.order_status, 'paymentStatus', o.payment_status, 'totalPrice', o.total_price, 'couponCode', o.coupon_code, 'createdAt', o.created_at_gmt)) FROM wp_tutor_orders o;
"

echo "Exporting Tutor order items..."
run_query tutor_order_items.json "
SELECT JSON_ARRAYAGG(JSON_OBJECT('id', oi.id, 'orderId', oi.order_id, 'courseId', oi.item_id, 'regularPrice', oi.regular_price)) FROM wp_tutor_order_items oi;
"

echo "Done. Files in $DATA_DIR:"
ls -la "$DATA_DIR"
