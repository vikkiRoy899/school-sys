# Product Requirements Document (PRD)
## Product
Working name: Universal Education SaaS

## 1. Vision
A single platform that schools, colleges and coaching institutes can subscribe to. Every institute uses its own admin web panel, while students and parents use one universal Android app. An institute can create accounts and send each person an email containing a QR-based activation pass.

## 2. Problem
Institutes often rely on disconnected tools for admissions, fees, attendance, exams and parent communication. Students/parents should not need a different app for every institute using this platform.

## 3. Users and roles
- SaaS Super Admin: manages tenants, subscription plans, platform status and support.
- Institute Owner/Admin: configures the institute and manages users, classes, batches, fees and reports.
- Accountant/Receptionist: permitted fee and admission operations.
- Teacher/Faculty: assigned classes/batches, attendance, homework and marks.
- Student: sees only their own institute-linked academic and fee information.
- Parent/Guardian: sees only children explicitly linked and verified to that guardian.

## 4. Core product principles
- One universal student/parent Android app.
- One web-based institute admin panel.
- Multi-tenant backend; every institute's records are isolated.
- Role-based permissions and audit logs.
- Configurable modules for school, college and coaching.
- QR is an enrollment/connection mechanism, not a permanent credential.
- Accessible, mobile-friendly interface and clear error messages.

## 5. MVP scope (must-have)
1. Super-admin creates/approves an institute.
2. Institute admin login and profile/branding setup.
3. Institute admin can create student accounts and parent/guardian accounts.
4. Student and parent are linked only through a verified relationship workflow.
5. System generates a unique, short-lived, single-use enrollment token for each account.
6. System emails each intended recipient their own QR activation pass and a fallback activation link.
7. Universal app scans QR, validates the token with the central API and activates the correct account.
8. Secure login/session management and account recovery.
9. Student profile, class/batch, attendance, notices and fee status.
10. Fee ledger, payment record and receipt generation.
11. Basic exports/reports and audit log.
12. Tenant-aware authorization and automated tests for cross-tenant access.

## 6. Phase 2
- Timetable, homework and assignments.
- Exams, marks, report cards and coaching test analytics.
- Push notifications and configurable email/SMS notifications.
- Multiple children under one parent account.
- CSV bulk import, bulk QR email and delivery status.
- Online payment gateway integration after reconciliation and refund flows are defined.

## 7. Later modules
- School transport, library, payroll and certificates.
- College semester/subject/department workflows.
- Coaching question banks, mock tests, rank lists and recorded classes.
- Multiple branches, custom domains and white-label options.
- Additional language support.

## 8. Non-functional requirements
- Enforce tenant isolation on the server/database, not only in UI.
- HTTPS for all production traffic.
- Passwords handled by a trusted authentication provider or strong password hashing; never store plaintext.
- QR tokens stored hashed server-side, expire quickly, and are single-use.
- Email delivery must not expose another person's QR or credentials.
- Rate-limit authentication and token redemption.
- Backup, restore and audit processes documented.
- Responsive web panel and Android accessibility basics.
- Collect only necessary personal data and provide a data-retention/deletion policy.

## 9. Success metrics for pilot
- Admin can create an account and send an email successfully.
- Recipient can activate from QR or fallback link without manual endpoint configuration.
- A student cannot access another student's record by changing an ID.
- Parent sees only verified linked children.
- Admin can record attendance and fees and export a report.
- Email bounce/failure states are visible to admin.

## 10. Out of scope for MVP
- Storing permanent passwords in QR codes.
- Trusting arbitrary API endpoints supplied by QR codes.
- Biometric attendance, facial recognition or location tracking.
- Complex payroll/accounting compliance before core workflows are validated.
