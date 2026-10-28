# K-12 School Management System

A comprehensive school management system built with modern technologies:

## Architecture Overview

```
school-management-system/
├── apps/
│   ├── backend/                 # Node.js/Express API (TypeScript)
│   ├── parent-student-app/      # Flutter Android App (Real APK)
│   └── teacher-staff-app/       # React + Capacitor (Android/Web)
├── packages/
│   └── shared/                  # Shared TypeScript types
├── memory/                      # Build memory tracking system
└── scripts/                     # Build and deployment scripts
```

## Technology Stack

| Component | Technology |
|-----------|------------|
| **Backend API** | Node.js, Express, TypeScript, Prisma, PostgreSQL |
| **Parent & Student App** | Flutter (Dart) → Real Android APK |
| **Teacher & Staff App** | React 18, TypeScript, Vite, Tailwind CSS, Capacitor |
| **Database** | PostgreSQL (with Prisma ORM) |
| **Authentication** | JWT with bcrypt password hashing |
| **Memory System** | JSON-based build tracking |

## Features Implemented

### Backend API (15+ endpoints)
- ✅ Authentication (Login, OTR Token Redemption)
- ✅ Student Management (CRUD, Search, OTR Generation)
- ✅ Attendance Recording (Homeroom, Period-wise)
- ✅ Exam Marks Entry & Grading
- ✅ Fee Management (Invoices, Payments, Receipts)
- ✅ Class & Subject Management
- ✅ Memory Tracking API

### Parent & Student App (Flutter)
- ✅ Splash Screen & Onboarding
- ✅ Login with Email/Phone
- ✅ OTR Code Connection (Deep Link/QR)
- ✅ Dashboard with navigation cards
- ✅ Attendance, Grades, Fees, Timetable, Messages
- ✅ API Service Layer
- ✅ Ready for Android APK build

### Teacher & Staff App (React + Capacitor)
- ✅ Responsive Layout with Sidebar
- ✅ Role-based Login (Teacher, Principal, Accountant)
- ✅ Dashboard with Stats & Quick Actions
- ✅ Attendance Marking (Present/Absent/Late/Excused)
- ✅ Marks Entry with Grade Calculation
- ✅ Student Management Table
- ✅ Settings (Profile, Notifications, Security, Appearance, Data)
- ✅ Capacitor Configuration for Android

### Memory System
- ✅ Build tracking with components and status
- ✅ CLI for init, add, show, list, update
- ✅ Metadata tracking for each component
- ✅ Integrated with build script

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- Flutter SDK (for parent-student APK)
- Android SDK (for Capacitor Android build)

### 1. Backend Setup

```bash
cd apps/backend
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

npm install
npm run db:generate
npm run db:push
npm run dev
```

### 2. Parent & Student App (Flutter)

```bash
cd apps/parent-student-app
flutter pub get
flutter run --debug          # For development
flutter build apk --release  # For production APK
```

### 3. Teacher & Staff App (React + Capacitor)

```bash
cd apps/teacher-staff-app
npm install
npm run dev                  # Development server
npm run build                # Production build
npx cap sync                 # Sync to native
npx cap open android         # Open in Android Studio
```

### 4. Build Everything

```bash
# From root directory
node scripts/build.js all

# Or build individual components
node scripts/build.js backend
node scripts/build.js parent-student
node scripts/build.js teacher-staff
```

## Memory System Usage

```bash
# Initialize build tracking
node memory/save.js init build-001

# Add entries during development
node memory/save.js add build-001 backend in_progress '{"endpoints": 10}'
node memory/save.js add build-001 parent-student-app completed '{"features": ["login", "dashboard"]}'

# View build progress
node memory/save.js show build-001
node memory/save.js list
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/redeem-otr` - Parent OTR token redemption

### Students
- `GET /api/v1/students` - List students (with filters)
- `POST /api/v1/students` - Create student (generates OTR)
- `GET /api/v1/students/:id` - Get student details

### Attendance
- `POST /api/v1/attendance/record-homeroom` - Record homeroom attendance
- `GET /api/v1/attendance` - Get attendance records

### Exams
- `PUT /api/v1/exams/marks/record` - Record marks
- `GET /api/v1/exams/marks` - Get marks

### Finance
- `POST /api/v1/finance/payments/collect-offline` - Collect payment
- `GET /api/v1/finance/invoices` - List invoices

### Memory
- `POST /api/v1/memory/save` - Save build memory
- `GET /api/v1/memory/load` - Load build memory

## Database Schema

The Prisma schema includes 20+ models:
- Institutions, Users, Academic Years
- Classes, Sections, Subjects
- Guardians, Students, Enrollments
- Onboarding Tokens (OTR)
- Attendance, Exam Terms, Marks
- Fee Heads, Fee Cards, Invoices, Payments
- Audit Logs

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@stmarys.edu | Admin123! |
| Teacher | teacher@stmarys.edu | Teacher123! |
| Parent | parent@stmarys.edu | Parent123! |

## Build Output

After running `node scripts/build.js all`, find APKs in:
```
build-output/
├── parent-student-app-release.apk    # Flutter Android APK
└── teacher-staff-app-release.apk     # Capacitor Android APK
```

## Development Workflow

1. **Backend First**: API endpoints drive frontend development
2. **Parallel Frontend**: Flutter and React apps can be developed simultaneously
3. **Memory Tracking**: Log progress at each milestone
4. **Test Integration**: Run both apps against local backend
5. **Build Release**: Generate APKs for distribution

## License

MIT License - See LICENSE file for details