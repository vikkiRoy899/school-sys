# Initial API Contract

Prefix: `/api/v1`. All production endpoints use HTTPS. Example paths are proposed and need implementation-specific review.

## Institute admin
- `POST /admin/students` — create student record and optional login invitation.
- `POST /admin/guardians` — create/invite parent/guardian.
- `POST /admin/students/{studentId}/guardian-links` — initiate a verified guardian link.
- `POST /admin/accounts/{userId}/enrollment-email` — create a fresh enrollment token and send email.
- `GET /admin/email-deliveries/{deliveryId}` — inspect delivery status.
- `POST /admin/students/import` — validate and import CSV in a later phase.

## Mobile enrollment
- `POST /enrollment/redeem` — body contains one-time token; returns activation result and session setup instructions.
- `POST /enrollment/resend` — request a fresh email after identity/rate-limit checks.
- `POST /auth/login` — standard login if enabled.
- `POST /auth/logout` — revoke current session where supported.
- `GET /me` — return current user, memberships and permitted institute context.
- `GET /me/children` — return verified linked children for parent role.
- `GET /student/me/attendance`
- `GET /student/me/fees`
- `GET /student/me/results`
- `GET /student/me/notices`

## API rules
- Do not return passwords in any response.
- Enrollment tokens are single-use, expire quickly, are stored hashed and redeemed atomically.
- Do not accept arbitrary `endpoint` URLs from a QR as a trusted server destination.
- Return generic errors for invalid/expired tokens to reduce token enumeration.
- Rate-limit login, resend and redeem endpoints.
- Validate request bodies, authorization, institute membership and record ownership on every request.
- Use pagination and bounded exports.
- Keep API versioning from the start.

## Example QR activation payload (conceptual)
The QR should preferably encode an HTTPS deep link such as:
`https://app.example.com/enroll?t=<opaque-one-time-token>`
The app's verified deep-link handler can open the app and redeem the token with the fixed platform API. Include a visible fallback code/link in the email. Do not embed a permanent password, payment secret or admin key.
