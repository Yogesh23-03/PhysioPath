# PhysioPath

PhysioPath is an offline-first physiotherapy exercise card system built for a hackathon. It helps doctors create guided rehabilitation plans and share them with patients through a QR code or direct link. Patients can follow exercises, view illustrations, track reps, use voice/manual rep counting, log progress, and continue using the app even without internet after the first load.

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Offline-First Patient Experience](#offline-first-patient-experience)
- [Doctor Features](#doctor-features)
- [Patient Features](#patient-features)
- [AI and Media Features](#ai-and-media-features)
- [Authentication and Verification](#authentication-and-verification)
- [Analytics](#analytics)
- [API Summary](#api-summary)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [Demo Registration](#demo-registration)
- [Known Notes](#known-notes)

## Overview

PhysioPath solves a common physiotherapy problem: patients often forget exercise steps, perform movements incorrectly, or lose access to instructions when offline. The platform gives doctors a simple plan builder and gives patients a no-login, mobile-first, offline-ready exercise experience.

Doctors create exercise prescriptions with sets, reps, rest time, steps, mistakes, and images. Each plan generates a patient URL and QR code. Patients open the link once, and the plan is stored locally for offline use.

## Core Features

- Doctor registration and login
- NMC-style medical license verification flow with demo fallback
- Doctor dashboard with plans, patients, progress, completed records, analytics, and profile
- Patient plan creation with QR/share link
- Patient exercise dashboard
- Exercise detail pages with multilingual content
- Offline-ready exercise images
- Guided workout mode
- Manual rep counting
- Voice-based rep counting using the browser SpeechRecognition API
- Sequential rep validation to prevent skipping reps
- Patient progress tracking
- Completed-patient tracking
- Patient rating system that updates the doctor profile
- Contact doctor button using direct phone dialer
- Doctor profile with editable DB-backed data
- PWA service worker and IndexedDB storage for offline patient access

## User Roles

### Doctor

Doctors can:

- Register and verify account
- Log in securely
- Create patient exercise plans
- Edit patient exercise details
- Delete patient plans
- Generate QR codes
- View patient progress
- View completed patients
- View analytics charts
- Edit profile details
- See patient ratings on profile

### Patient

Patients can:

- Open a shared plan link without login
- Use the app offline after first load
- View prescribed exercises
- View exercise details and images
- Select language
- Listen to exercise explanation
- Start guided workout mode
- Count reps manually
- Count reps by voice
- Track daily progress
- Rate the doctor
- Call the doctor directly
- Access the same plan using QR code

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS and Tailwind-style utility classes
- Lucide React icons
- Framer Motion
- Dexie.js for IndexedDB
- vite-plugin-pwa for PWA service worker
- qrcode.react for QR generation
- Three.js for landing page 3D scene

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs password hashing

## Architecture

```text
PhysioPath
├── client
│   ├── React + Vite frontend
│   ├── PWA service worker
│   ├── IndexedDB patient storage
│   └── Patient and doctor UI
│
└── server
    ├── Express API
    ├── MongoDB models
    ├── Auth routes
    ├── Plan routes
    └── Doctor verification and rating logic
```

## Offline-First Patient Experience

PhysioPath is designed so patients are not blocked by poor internet connectivity.

### How it works

1. The patient opens the shared plan link once while online.
2. The plan is fetched from the backend.
3. The plan is stored locally in IndexedDB using Dexie.
4. The PWA service worker caches the app shell and public assets.
5. Exercise images are served from the local `public` folder and included in the PWA cache.
6. Patient progress is saved locally first.
7. When online, progress and completion can sync back to the backend.

### Offline capabilities

Patients can use these features offline after first load:

- View patient dashboard
- View exercise list
- View exercise details
- View exercise images
- Run guided workout mode
- Track completed exercises
- View local progress history
- Use manual rep counting

Online sync is needed for:

- Sending completed status to the doctor dashboard
- Updating doctor rating
- Fetching a plan for the first time

## Doctor Features

### Dashboard

The doctor dashboard includes:

- Plans tab
- Patients tab
- Progress tab
- Completed tab
- Analytics tab
- Profile route

### Plan Builder

Doctors can create and edit plans with:

- Patient name
- Duration in weeks
- Exercise selection
- Sets
- Reps
- Rest seconds
- Step instructions
- Common mistakes
- Exercise images

### QR and Share Link

Each plan produces:

- Shareable patient URL
- QR code
- Copy link option

The QR code points to:

```text
/patient/:token
```

When scanned, it opens the patient plan if the app and backend are reachable.

## Patient Features

### Patient Dashboard

Patients can see:

- Greeting
- Daily completion percentage
- Current streak
- Recovery plan timeline
- Exercise list
- Language selector
- Contact doctor button
- Plan QR code
- Doctor rating card

### Exercise Details

Exercise details include:

- Main exercise image
- Sets, reps, rest
- Step-by-step text
- Mistakes to avoid
- Voice explanation button

### Guided Workout Mode

The workout mode includes:

- Countdown
- Active rep counter
- Rest timer
- Completion screen
- Manual rep counting
- Voice rep counting

### Voice Rep Counting

The app uses the browser SpeechRecognition API.

Behavior:

- Language: `en-US`
- Continuous listening: enabled
- Interim results: disabled
- Accepts number words such as `one`, `two`, `three`
- Accepts digits such as `1`, `2`, `3`
- Only accepts reps in sequence
- Shows a warning if the patient skips a rep
- Manual counting remains available at all times

## AI and Media Features

PhysioPath supports:

- Offline exercise images from `client/public`
- Gemini image generation endpoint as a fallback/prototype feature
- Generated/fallback exercise visuals
- 3D landing page scene using Three.js

Current offline exercise images include:

- Quad Sets
- Glute Bridges
- Wall Slides
- Ankle Pumps
- Heel Slides
- Straight Leg Raise
- Clamshells
- Seated Knee Extension

## Authentication and Verification

### Doctor Registration

Registration collects:

- Full name
- Email
- Password
- Medical License Number
- State Medical Council
- Profile photo URL or uploaded image

### License Verification

The backend includes an NMC-style verification flow:

- Maps State Medical Council to NMC `smcId`
- Calls the NMC public endpoint
- Verifies matching registration number
- Creates account only if verification succeeds

For hackathon/demo use, license numbers starting with `DEMO` are accepted locally to avoid public service downtime blocking the demo.

### Login

Login uses:

- Email/password
- bcrypt password comparison
- JWT token
- Verified account check

## Analytics

The Analytics tab uses real DB-backed data from patient plans.

It displays:

- Patient growth chart
- Pending, in-progress, and completed status graph
- Most prescribed muscle groups
- Plans shared this week
- Active exercise count
- Completed recovery count

Progress is synced from the patient app to MongoDB using plan progress fields:

- `completedExerciseIds`
- `progressPercent`
- `status`
- `lastProgressAt`

## API Summary

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
PUT  /api/auth/me
```

### Plans

```text
GET    /api/plans
POST   /api/plans
GET    /api/plans/:token
PUT    /api/plans/:token
DELETE /api/plans/:token
GET    /api/plans/completed
POST   /api/plans/:token/progress
POST   /api/plans/:token/complete
POST   /api/plans/:token/rate
```

### Gemini

```text
POST /api/gemini/exercise-images
```

## Project Structure

```text
NCETHackathon
├── client
│   ├── public
│   │   ├── exercise images
│   │   └── medical illustrations
│   └── src
│       ├── api
│       ├── components
│       ├── context
│       ├── data
│       ├── db
│       ├── pages
│       ├── App.jsx
│       └── App.css
│
└── server
    ├── models
    │   ├── User.js
    │   ├── Plan.js
    │   └── CompletedPlan.js
    ├── routes
    │   ├── authRoutes.js
    │   ├── planRoutes.js
    │   └── geminiRoutes.js
    └── index.js
```

## Environment Variables

Create a `.env` file inside `server`.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_optional
```

Optional frontend environment:

```env
VITE_API_URL=http://localhost:5000/api
```

## Setup Instructions

### 1. Install frontend dependencies

```bash
cd client
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Start backend

```bash
cd server
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 4. Start frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://127.0.0.1:5173
```

## Demo Registration

For hackathon testing, use a demo license number.

```text
Full Name: Dr Demo Physio
Email: demo.physio1@physiopath.com
Password: password123
Medical License Number: DEMO12345
State Medical Council: Karnataka
```

If the email already exists, change only the email.

Example:

```text
demo.physio2@physiopath.com
```

## Demo Flow

1. Register or log in as doctor.
2. Create a patient plan.
3. Add exercises.
4. Save the plan.
5. Copy the patient URL or scan the QR code.
6. Open patient link.
7. Complete exercises manually or using voice rep counting.
8. View progress in doctor dashboard.
9. Rate doctor from patient dashboard.
10. View updated rating in doctor profile.

## Known Notes

- Patient offline mode works after the first successful online load.
- Voice rep counting depends on browser SpeechRecognition support.
- NMC public verification can be unavailable; demo license numbers beginning with `DEMO` bypass this for hackathon testing.
- Patient completion and ratings require internet to sync to MongoDB.
- Existing old plans may show pending until patient progress syncs again.

## License

This project was created for hackathon demonstration and educational purposes.
