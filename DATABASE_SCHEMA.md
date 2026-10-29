# Suggested PostgreSQL Schema

This is a starting point, not a migration-ready final schema. Review constraints and indexes before production.

## Core tables
### `institutes`
- `id` UUID primary key
- `slug` unique
- `name`
- `type` enum: school, college, coaching, mixed
- `status` enum: pending, active, suspended
- `logo_url` nullable
- `timezone`
- `created_at`, `updated_at`

### `users`
- `id` UUID primary key
- `auth_provider_user_id` unique
- `email_normalized`
- `full_name`
- `phone` nullable
- `status`
- `created_at`, `updated_at`

### `institute_memberships`
- `id` UUID primary key
- `institute_id` FK
- `user_id` FK
- `role` enum: owner, admin, accountant, receptionist, teacher, student, parent
- `status`
- unique (`institute_id`, `user_id`, `role`) as appropriate

### `students`
- `id` UUID primary key
- `institute_id` FK
- `user_id` nullable FK (pending until account activated)
- `student_code`
- `class_or_course_id` nullable
- `admission_number` nullable
- `admission_date`
- `status`
- unique (`institute_id`, `student_code`)

### `guardians`
- `id` UUID primary key
- `institute_id` FK
- `user_id` FK
- `relationship_label`
- `verification_status`

### `student_guardians`
- `institute_id` FK
- `student_id` FK
- `guardian_id` FK
- `relationship_verified_at` nullable
- `created_at`
- unique (`student_id`, `guardian_id`)

### `classes_courses_batches`
- `id` UUID primary key
- `institute_id` FK
- `name`
- `kind` enum: class, course, batch, semester, department
- `academic_year` nullable
- `status`

### `enrollment_tokens`
- `id` UUID primary key
- `institute_id` FK
- `user_id` FK
- `token_hash` unique
- `purpose` enum: student_activation, parent_activation, staff_activation, device_pairing
- `expires_at`
- `consumed_at` nullable
- `revoked_at` nullable
- `created_by_user_id` nullable
- `created_at`
- `email_delivery_status` nullable
- `email_provider_message_id` nullable

### `attendance_records`
- `id` UUID primary key
- `institute_id` FK
- `student_id` FK
- `session_date`
- `status` enum: present, absent, late, excused
- `marked_by_user_id`
- `created_at`
- unique (`student_id`, `session_date`) or a richer session-aware unique key

### `fee_invoices`
- `id` UUID primary key
- `institute_id` FK
- `student_id` FK
- `invoice_number`
- `amount_due`
- `due_date`
- `status`
- `created_at`

### `fee_payments`
- `id` UUID primary key
- `institute_id` FK
- `invoice_id` FK
- `amount`
- `payment_method`
- `external_payment_reference` nullable
- `received_by_user_id`
- `paid_at`
- `status`

### `audit_logs`
- `id` UUID primary key
- `institute_id` nullable FK
- `actor_user_id` nullable FK
- `action`
- `target_type`, `target_id`
- `metadata_json` with sensitive fields excluded
- `created_at`

## Required database practices
- Add indexes on `institute_id`, `user_id`, `student_id`, status and dates used in filters.
- Enforce foreign keys and tenant-consistent relationships.
- Use transactions for token redemption and fee/payment changes.
- Never store plaintext passwords or raw enrollment tokens.
- Apply Row Level Security if supported by the chosen database platform, and still perform server-side authorization.
