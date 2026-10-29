# Security & Privacy Requirements

## Highest-priority controls
1. Tenant isolation: a user from institute A must never access institute B's data.
2. Role-based access control with least privilege.
3. QR token is opaque, random, short-lived, one-time and revocable.
4. QR never contains a permanent password or privileged API key.
5. HTTPS only; validate trusted app links and backend hosts.
6. Passwords handled by a reputable auth provider or modern password hashing; never plaintext.
7. Rate limits for login, token redemption, resend, exports and password reset.
8. Audit log high-impact actions without storing secrets.
9. Backup and tested restore process.
10. Data minimization, retention rules, user support and incident response process.

## Threats to test
- Student changes URL or ID to see another student's data.
- Parent attempts to access an unlinked child.
- Admin from one tenant queries another tenant's records.
- QR token is replayed, expired, revoked or used twice.
- Email is sent to the wrong recipient.
- QR/deep link supplies a malicious endpoint.
- Password reset or resend endpoint is abused.
- CSV upload contains invalid data or formula injection.
- Fee records are edited without authorization or audit entry.

## Privacy
Student records are sensitive. Collect only necessary data, restrict access, define retention/deletion and export policies, obtain appropriate notices/consents, and review applicable Indian data-protection and education requirements with qualified counsel before production. Avoid collecting Aadhaar or other high-risk identifiers unless genuinely necessary and legally reviewed.
