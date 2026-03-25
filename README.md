# DevHive 🚀

DevHive is a platform for developers to post collaborative projects and apply to join them. This project features a React (Vite) frontend and a Node.js (Express) backend.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express, MySQL, JWT, Multer, Helmet.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL Server

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
4. Initialize the database:
   ```bash
   npm run db:setup
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📋 Features

- **User Authentication**: Secure login and registration using JWT and bcrypt.
- **Project Board**: Post projects with roles and technology requirements.
- **Applications**: Users can apply to projects with optional resume uploads.
- **Ownership**: Project owners can manage applications and update project details.

## 🧪 Demo Accounts

For testing, you can use the following demo accounts:
- **Project Owner**: `owner@example.com` / `password123`
- **Applicant**: `applicant@example.com` / `password123`


## 🔒 Security & Deployment


- **Environment Variables**: Managed via `.env` (never commit these!).
- **CORS**: Restricted origins in production.
- **Error Handling**: Centralized global error handling middleware.
- **Security Headers**: Uses `helmet` for enhanced protection.

## 📂 Project Structure

- `/frontend`: React application.
- `/backend`: Express API and database scripts.
- `/backend/sql`: Database schema and seed data.
- `/backend/uploads`: Local storage for resumes (ignored by git).
