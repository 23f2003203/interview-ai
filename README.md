# Interview AI

Interview AI is a full-stack interview preparation app that generates personalized interview reports from a candidate resume, self-description, and job description. Users can register, log in, upload a resume, generate an AI-powered report, and revisit previous reports from their dashboard.

## Features

- User registration, login, logout, and authenticated profile lookup
- Cookie-based JWT authentication with token blacklist support
- Resume upload and parsing for interview report generation
- AI-generated match score, technical questions, behavioral questions, skill gaps, and preparation plan
- Report history for each authenticated user
- React frontend built with Vite and Sass
- Express backend with MongoDB persistence

## Tech Stack

**Frontend**

- React
- React Router
- Vite
- Sass
- Axios

**Backend**

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs
- Multer
- pdf-parse
- Google GenAI SDK

## Project Structure

```text
.
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controller/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── app.routes.jsx
│       ├── components/
│       └── features/
└── README.md
```

## Prerequisites

- Node.js
- npm
- MongoDB connection string
- Google GenAI API key

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Running Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the frontend URL shown by Vite, usually:

```text
http://localhost:5173
```

## API Routes

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/logout` - Log out and blacklist the current token
- `GET /api/auth/get-me` - Get the authenticated user

### Interview Reports

- `POST /api/interview` - Upload resume and generate an interview report
- `GET /api/interview` - Get all reports for the authenticated user
- `GET /api/interview/report/:interviewId` - Get one report by ID

## Notes

- The frontend sends credentials with requests, so the backend must allow the frontend origin through CORS.
- Resume upload is handled as multipart form data using the `resume` field.
- Generated reports are stored in MongoDB and scoped to the authenticated user.
