# Deploy script for agenticus.eu (region: eu-north-1)
# Actions:
# 1) Build the project using: sudo npm run build
# 2) Delete ALL contents of S3 bucket: s3://agenticus.eu (eu-north-1)
# 3) Copy contents of ./dist to the bucket (eu-north-1)
# 4) Invalidate CloudFront distribution cache

BUCKET="s3://agenticus.eu"
REGION="eu-north-1"
DIST_DIR="dist"
CF_DISTRIBUTION_ID="E3UTIRA6BZEQYM"

echo "[1/6] Checking prerequisites..."
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed or not in PATH." >&2
  exit 1
fi
if ! command -v aws >/dev/null 2>&1; then
  echo "Error: AWS CLI is not installed or not in PATH." >&2
  echo "Install from: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" >&2
  exit 1
fi

echo "[2/6] Building the project (this may prompt for sudo password)..."
sudo npm run build

echo "[3/6] Verifying build output directory: ${DIST_DIR}"
if [ ! -d "${DIST_DIR}" ]; then
  echo "Error: ${DIST_DIR} directory not found after build." >&2
  exit 1
fi

echo "[4/6] Deleting ALL contents of ${BUCKET} in region ${REGION}..."
aws s3 rm "${BUCKET}" --recursive --region "${REGION}"

echo "[5/6] Uploading ${DIST_DIR} contents to ${BUCKET} in region ${REGION}..."
aws s3 cp "${DIST_DIR}" "${BUCKET}" --recursive --region "${REGION}"

echo "[6/6] Creating CloudFront invalidation for distribution ${CF_DISTRIBUTION_ID}..."
aws cloudfront create-invalidation \
  --distribution-id "${CF_DISTRIBUTION_ID}" \
  --paths "/*"

echo "Deployment completed successfully to ${BUCKET} (${REGION})."
