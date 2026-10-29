# Architecture

## Recommended baseline
- Web admin: Next.js + TypeScript.
- Universal Android app: React Native with Expo (or another Android-capable stack selected before implementation).
- Database: PostgreSQL.
- Auth: managed authentication provider or a carefully implemented server-side auth system.
- API: HTTPS REST API initially; typed contracts and versioned routes.
- Email: transactional email provider such as Resend, Postmark or Amazon SES, selected after checking current pricing, regional availability and terms.
- QR: generated in admin/backend from a one-time activation URL/token.
- Hosting: deploy web/API/database with managed services; free tiers are for prototypes only and may sleep, impose quotas or change.

## High-level components
1. Super-admin web console
2. Institute admin web console
3. Universal student/parent mobile app
4. Central API
5. PostgreSQL database
6. Transactional email provider
7. Object storage for documents, if needed
8. Background job/queue for bulk email and retry handling
9. Monitoring, backups and audit logs

## Multi-tenant design
Every tenant-owned row has `tenant_id` (or `institute_id`). The server derives the tenant from the authenticated session and validates it for every operation. Never trust a tenant ID sent by the client without authorization checks. Consider PostgreSQL Row Level Security as a defense-in-depth layer.

## Endpoint/QR model
For the first version, QR should identify the institute in the central platform and carry a one-time enrollment token. Do not allow QR payloads to choose arbitrary API hosts. The app talks to a fixed, verified platform API; the institute context is resolved securely from the token. If customer-hosted servers are needed later, design a signed, allow-listed endpoint registration and verification protocol separately.

## Account activation
1. Admin creates account with verified recipient email or sends an invitation to the recipient.
2. Server creates pending enrollment and random token; store only a cryptographic hash of the token.
3. Token expires after a short configurable window and can be redeemed once.
4. Email contains a QR image and a normal activation link.
5. App scans QR and sends token to the API over HTTPS.
6. API validates token hash, expiry, status, intended account and tenant.
7. API consumes token atomically and issues a secure session through the auth system.
8. If token expired, user requests a fresh email or admin resends it.
9. If the email belongs to a parent, require a separate parent enrollment and verify/link the child relationship.

## Email failure handling
Use a queued job, provider delivery events/webhooks where supported, retries with backoff, bounce suppression, and an admin-visible delivery status. Never mark an account as activated just because an email was accepted by a provider.

## Important production controls
- HTTPS only.
- Rate limits and abuse protection.
- Token hashing, expiry and one-time redemption.
- Short-lived access tokens and refresh-token rotation/revocation where supported.
- Audit events for account creation, role changes, fee edits, exports and token reissue.
- Secrets only in environment variables/secret manager, never committed to Git.
