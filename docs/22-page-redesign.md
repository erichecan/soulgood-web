# Soul Good 22-page visual redesign

## Pages and navigation

The supplied visual set contains 22 screens for the home, events, membership, venue, about, contact, FAQ, policy, and status flows. It uses a restrained horizontal editorial navigation, warm paper and lavender surfaces, serif headlines, fine rules, and a dark multi-column footer. A vertical sidebar would not match the public-site layouts; keep sidebar navigation for the admin area only.

The visual set does not contain a dedicated course catalogue screen. The existing courses remain available at `/courses`, linked in the footer, and are also surfaced as live course cards in the Events & Workshops page. They continue to use the current PostgreSQL course records, so the displayed title, photo, description, and CAD price are real data. Course purchase is still unavailable.

## Current status of forms and payments

The event, membership, contact, and venue forms are layout previews only. Fields and buttons are intentionally disabled because their submission, privacy, payment, and refund rules have not yet been connected. Dates, membership benefits, and prices marked as pending in the design are not invented or made purchasable.

## JetForm / WordPress / Stripe follow-up design

Keep the public site on Next.js. A separate WordPress service can own course editing and JetFormBuilder forms. Use WordPress/JetEngine REST API for course reads, and JetFormBuilder Formless Actions Endpoints only for configured form submissions such as create/update course. The Next.js server should call WordPress so credentials stay server-side; browser CORS should not be used as an authorization boundary.

For checkout, use a JetFormBuilder Stripe Checkout form hosted on WordPress (or a verified integration that reliably opens that checkout) rather than assuming the form submission REST endpoint is itself a payment API. Resolve the amount from the saved course record on the server. On verified payment success, notify the Next.js app to grant the existing course enrollment. Do not grant access from a return URL alone.

Refunds should be initiated from the JetFormBuilder payment record or Stripe dashboard. The follow-up integration must also revoke/expire the corresponding Soul Good enrollment after a verified refund event, and must safely ignore duplicate webhook deliveries. Before implementation, confirm the exact refund and event hooks available in the installed JetFormBuilder add-on version.

## Production rollback

Pre-redesign Cloud Run revision and Cloud SQL backup details are stored in `../backups/pre-redesign-2026-11-07/`. Run `./scripts/rollback-cloud-run.sh` to route all production traffic back to the pre-redesign application revision. The redesign does not apply a database migration.
