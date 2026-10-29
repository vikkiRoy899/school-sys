# QR + Email Account Creation Flow

## Requirement
When an institute admin creates a student or parent account, the platform sends the intended person an email containing a QR enrollment pass and a fallback activation link.

## Recommended sequence
1. Admin enters a student's details and verified email address.
2. Admin may enter parent/guardian details and email separately.
3. Backend validates admin permissions and the institute membership.
4. Backend creates the account/invitation in `pending` state.
5. Backend generates a cryptographically secure random one-time token. Store only its hash.
6. Backend sets a short expiry (e.g. 15–30 minutes for a high-security activation flow; choose the final duration based on usability and threat model).
7. QR encodes a verified app deep link with the opaque token, not the user's password.
8. Email service sends a branded message containing institute name, recipient role, QR image, fallback link, expiry, and help/contact information.
9. When scanned, the app opens the deep link and redeems the token over HTTPS.
10. Backend atomically validates and consumes the token, then completes activation using the chosen auth provider.
11. Send a confirmation email after activation, where appropriate.
12. If expired or lost, allow a rate-limited resend that revokes prior outstanding tokens.

## Student and parent emails
- Send each person a separate email with a separate token.
- Do not forward the student's QR to the parent or vice versa.
- Parent access requires a verified link to one or more children.
- If a parent email is missing, leave the parent account pending and allow the institute to send an invitation later.
- Bulk account creation should queue emails and show sent, queued, bounced, failed and resend states.

## Email content checklist
Subject: `Activate your [Institute Name] account`
Include:
- Institute name and logo (if configured)
- Recipient's display name and role
- QR code
- Secure activation link
- Expiry explanation
- Steps: install/open the universal app → scan QR or open activation link → set up/sign in
- Support contact
- Security note: never share the QR; request a new one if it was sent to the wrong email

## Password policy
Prefer an activation link that lets the user set their own password or verify by OTP. Do not email plaintext passwords. If an institute requires issuing an initial password, generate a temporary credential and force a reset at first login; the QR itself should still use a separate one-time token.

## Delivery reliability
- Use a transactional email provider, verified sending domain and SPF/DKIM/DMARC.
- Queue bulk sends, retry transient failures, track provider message IDs and process delivery/bounce webhooks.
- Do not log full tokens, activation URLs or QR contents.
