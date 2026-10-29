# Roadmap & Acceptance Tests

## Phase 0 — Foundation
- Confirm product name, stack and deployment target.
- Create repository, environments, code style, CI and database migrations.
- Set up automated GitHub Actions workflow for Android APK builds (`.github/workflows/build-android-release.yml`).
- Write role matrix and tenant-isolation tests.

## Phase 1 — One-institute pilot
- Institute registration and admin authentication.
- Student and parent account creation.
- Separate QR activation emails with fallback links and app download link.
- QR scan/deep-link activation and token expiry/revoke/resend.
- Automated release APK build and GitHub Release artifact generation.
- Student/parent dashboards.
- Attendance and fee ledger.
- Audit log and basic reports.

## Phase 2 — Sellable SaaS
- Super-admin console and tenant lifecycle.
- Subscription plans, trial/expiry handling and invoice flow.
- Bulk import and queued emails with delivery tracking.
- Branding, institute settings and support workflows.
- Backups, monitoring, restore drills and production security review.

## Phase 3 — School/college/coaching modules
- Timetable, homework, exams, report cards.
- Coaching test series and analytics.
- School transport/library.
- College departments/semesters.
- Push notifications and additional languages.

## Acceptance tests (minimum)
1. Institute A admin cannot query institute B records.
2. Student A cannot fetch student B's fee/attendance by changing an identifier.
3. Parent sees only verified linked children.
4. A token succeeds once and fails on second use.
5. Expired or revoked QR cannot activate an account.
6. QR never includes plaintext password or privileged key.
7. QR with an untrusted endpoint is rejected/ignored; app uses the configured trusted API.
8. Account creation produces separate email invitations for student and parent recipients.
9. Email delivery failure is visible and can be retried safely.
10. Resending invalidates outstanding tokens according to policy.
11. Fee/payment changes are authorized and audited.
12. Logout/revocation prevents reuse of a revoked session.
13. CSV import validates duplicates, missing fields and unsafe values.
14. Backup can be restored in a test environment.
15. GitHub Actions workflow successfully compiles release APK and attaches it to the latest GitHub Release upon tag push.

## Release checklist
- Privacy notice and terms reviewed.
- Verified email sending domain and SPF/DKIM/DMARC configured.
- Production secrets stored safely (including Android keystore secrets in GitHub Actions).
- Android release signing key backed up securely.
- Automated APK build verified from GitHub Releases download link.
- Database backups and monitoring enabled.
- Security review completed before real student data is onboarded.
