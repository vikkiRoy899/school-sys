# UI/UX Specification

## Visual direction
- Clean, modern Material-inspired interface.
- Mobile-first, accessible contrast, clear empty/loading/error states.
- Institute branding may change logo/accent colour, but core layout and safety warnings stay consistent.
- Use plain language and support Hindi/English readiness in architecture.

## Web admin screens
1. Sign in / password reset
2. Setup wizard: institute type, name, timezone, branding
3. Dashboard: student count, attendance, dues, collection, recent activity
4. Students: search, filters, create, bulk import, profile
5. Parents/guardians and verified child links
6. Staff/teachers and role permissions
7. Classes/courses/batches
8. Attendance register
9. Fees: invoices, payments, receipts, dues
10. Exams/results (Phase 2)
11. Notices and communication
12. Account invitations: QR preview, resend/revoke, email status
13. Reports/export
14. Institute settings, subscriptions and audit log

## Universal Android app
1. Welcome / scan institute QR / open activation link
2. QR scanner with permission explanation and manual-link fallback
3. Secure activation / set password or verify OTP
4. Role-aware home screen
5. Student: attendance, fees, results, timetable, homework, notices
6. Parent: child switcher, attendance, fees, results, notices
7. Notifications, profile, privacy, support and sign out
8. Multiple institute memberships handled explicitly; never silently switch context

## QR email admin UX
- Show QR generation and email delivery state separately.
- Make resend and revoke actions available to authorized admins.
- Warn before sending to an unverified or changed email.
- Never display the user's permanent password.
