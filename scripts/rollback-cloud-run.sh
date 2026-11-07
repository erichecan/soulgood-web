#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="soulgood-506103"
REGION="northamerica-northeast2"
SERVICE="soulgood-web"
ROLLBACK_REVISION="soulgood-web-00003-xlx"

printf 'Routing 100%% of %s traffic to %s in %s...\n' "$SERVICE" "$ROLLBACK_REVISION" "$PROJECT_ID"
gcloud run services update-traffic "$SERVICE" \
  --to-revisions="${ROLLBACK_REVISION}=100" \
  --region="$REGION" \
  --project="$PROJECT_ID" \
  --quiet

gcloud run services describe "$SERVICE" \
  --region="$REGION" \
  --project="$PROJECT_ID" \
  --format='table(status.traffic.revisionName,status.traffic.percent)'
