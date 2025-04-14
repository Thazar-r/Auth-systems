Auth System
A complete authentication system built with Next.js, Neon Database, and shadcn/ui components.

Features
User registration and login

Secure password hashing with bcrypt

JWT-based authentication

Protected routes

User profile management

Responsive dashboard

Form validation

Tech Stack
Frontend: Next.js, React, Tailwind CSS, shadcn/ui

Backend: Next.js API Routes

Database: Neon PostgreSQL

Authentication: JWT (jose)

Form Handling: React Hook Form, Zod

Styling: Tailwind CSS

Getting Started
Prerequisites
Node.js 16.8 or later

npm or yarn

A Neon database account (or any PostgreSQL database)

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/Thazar-r/Auth-systems.git
cd Auth-systems
Install dependencies:

# bash
Copy
Edit
npm install --legacy-peer-deps
# or
yarn install --ignore-peer-deps
Set up your database:

Create a .env.local file in the root directory with the following variables:

env
Copy
Edit
DATABASE_URL=your_neon_database_connection_string
Create the database tables:

Run the following SQL in your Neon database:

sql
Copy
Edit
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
Start the development server:

bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.

Usage
Registration
Navigate to /signup

Fill in the registration form with your details

Submit the form to create your account

Login
Navigate to /login

Enter your username and password

Click "Login" to access your dashboard

Dashboard
After logging in, you'll be redirected to the dashboard where you can:

View your profile information

Access quick actions

Navigate to your full profile

Profile
The profile page displays detailed information about your account and provides options to:

Change your avatar

Update your password

Modify account settings

Development
Project Structure
css
Copy
Edit
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       ├── logout/
│   │       ├── me/
│   │       └── signup/
│   ├── dashboard/
│   ├── login/
│   ├── profile/
│   ├── signup/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── login-form.tsx
│   ├── logout-button.tsx
│   ├── signup-form.tsx
│   └── ui/
├── lib/
│   └── auth.ts
└── middleware.ts
API Routes
POST /api/auth/signup: Register a new user

POST /api/auth/login: Authenticate a user

POST /api/auth/logout: Log out a user

GET /api/auth/me: Get the current user's information

Security Considerations
Passwords are hashed using bcrypt

JWT tokens are used for authentication

Protected routes are secured with middleware

Form validation is implemented with Zod

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Next.js

Neon Database

shadcn/ui

Tailwind CSS
.