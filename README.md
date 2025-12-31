# ITeach - Online Learning Platform

A comprehensive online learning management system designed to facilitate interactive programming education. ITeach provides a modern, feature-rich environment for students and instructors to engage in course creation, content delivery, and hands-on coding practice.

## Overview

ITeach is a full-stack web application that bridges the gap between traditional learning and practical programming skills. The platform enables educators to create structured courses with video content, coding exercises, and assessments, while students can learn at their own pace with integrated development environments and real-time code execution.

## Key Features

### For Students
- **Interactive Learning**: Access video lectures, reading materials, and hands-on coding exercises
- **Integrated IDE**: Practice coding directly in the browser with support for multiple programming languages
- **Progress Tracking**: Monitor course completion and track learning achievements
- **Code Execution**: Run and test code in real-time using integrated Judge0 API
- **Course Reviews**: Share feedback and ratings for completed courses
- **Certificate Generation**: Earn certificates upon successful course completion
- **Shopping Cart**: Browse and purchase courses with a streamlined checkout process

### For Instructors
- **Course Management**: Create and organize courses with chapters and lessons
- **Content Creation**: Upload video content, create coding exercises, and design assessments
- **Student Analytics**: Track student progress and engagement metrics
- **Revenue Tracking**: Monitor course sales and earnings
- **Rich Text Editor**: Create formatted lesson content with markdown support

### For Administrators
- **User Management**: Oversee student and instructor accounts
- **Course Moderation**: Review and approve course content
- **Platform Analytics**: Access comprehensive usage statistics and insights
- **Category Management**: Organize courses into structured categories

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: 
  - Radix UI primitives
  - Material-UI (MUI)
  - Shadcn/ui components
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **Rich Text**: Monaco Editor, Markdown Editor
- **Charts**: Recharts, CanvasJS
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: JavaScript (ES6+ with Babel)
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: 
  - JWT (JSON Web Tokens)
  - Passport.js (Google OAuth, Facebook OAuth)
- **File Storage**: AWS S3 / Supabase Storage
- **Email Service**: Nodemailer
- **Code Execution**: Judge0 API integration

### Infrastructure
- **Database**: PostgreSQL
- **Cloud Storage**: AWS S3 / Supabase
- **Authentication**: Firebase Admin SDK
- **Version Control**: Git

## Project Structure

```
SE100_ITeach/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Database and service configurations
│   │   ├── controller/     # Route controllers
│   │   ├── middleware/     # Authentication and validation middleware
│   │   ├── models/         # Sequelize database models
│   │   ├── migrations/     # Database migration files
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic layer
│   │   └── server.js       # Application entry point
│   └── package.json
│
├── frontend/               # Next.js web application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   │   ├── admin/     # Admin dashboard
│   │   │   ├── student/   # Student portal
│   │   │   ├── teacher/   # Instructor portal
│   │   │   └── course/    # Course pages
│   │   ├── components/    # Reusable React components
│   │   ├── services/      # API client services
│   │   ├── lib/           # Utility functions
│   │   └── firebase/      # Firebase configuration
│   └── package.json
│
└── README.md
```

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **PostgreSQL**: v14.x or higher
- **Git**: Latest version

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SE100_ITeach.git
cd SE100_ITeach
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=iteach_db
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DIALECT=postgres

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

# Supabase Configuration (Alternative to AWS)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Frontend URL
CLIENT_URL=http://localhost:3000
```

Run database migrations:

```bash
npx sequelize-cli db:migrate
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Judge0 Configuration
NEXT_PUBLIC_JUDGE0_API_URL=your_judge0_api_url
NEXT_PUBLIC_JUDGE0_API_KEY=your_judge0_api_key
```

## Running the Application

### Development Mode

Start the backend server:

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:5000`

In a new terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend application will be available at `http://localhost:3000`

### Production Build

Build the frontend:

```bash
cd frontend
npm run build
npm start
```

Start the backend in production mode:

```bash
cd backend
npm start
```

## Database Schema

The application uses the following main database entities:

- **Users**: Student, teacher, and admin accounts
- **Courses**: Course information and metadata
- **Course Categories**: Organizational structure for courses
- **Chapters**: Course content organization
- **Lessons**: Individual learning units
- **Lesson Content**: Detailed lesson materials
- **Lesson Comments**: Student discussions and Q&A
- **Video Progress**: Student video completion tracking
- **My Courses**: Student course enrollments
- **Reviews**: Course ratings and feedback
- **Orders**: Purchase transactions
- **Order Items**: Individual items in orders
- **Cart Items**: Shopping cart contents
- **Certificates**: Course completion certificates
- **Analysis**: Platform analytics data
- **IDE Used**: Code execution history

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/facebook` - Facebook OAuth login

### Course Endpoints

- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create new course (Teacher)
- `PUT /api/courses/:id` - Update course (Teacher)
- `DELETE /api/courses/:id` - Delete course (Teacher/Admin)

### Student Endpoints

- `GET /api/student/courses` - Get enrolled courses
- `POST /api/student/enroll` - Enroll in course
- `GET /api/student/progress` - Get learning progress
- `POST /api/student/review` - Submit course review

### Teacher Endpoints

- `GET /api/teacher/courses` - Get created courses
- `GET /api/teacher/analytics` - Get teaching analytics
- `POST /api/teacher/lesson` - Create lesson content

### Admin Endpoints

- `GET /api/admin/users` - List all users
- `GET /api/admin/analytics` - Platform analytics
- `PUT /api/admin/course/:id/approve` - Approve course

## Features in Detail

### Code Execution Engine

The platform integrates with Judge0 API to provide:
- Multi-language support (Python, JavaScript, Java, C++, etc.)
- Real-time code compilation and execution
- Test case validation
- Performance metrics and error reporting

### Authentication System

Supports multiple authentication methods:
- Email/password with JWT tokens
- Google OAuth 2.0
- Facebook OAuth
- Session management with secure cookies

### Payment Integration

- Shopping cart functionality
- Order processing and tracking
- Purchase history
- Revenue analytics for instructors

### Content Management

- Rich text editor for lesson content
- Video upload and streaming
- File attachments
- Markdown support

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- SQL injection prevention via Sequelize ORM
- XSS protection
- Rate limiting
- Secure cookie handling

## Contributing

We welcome contributions to ITeach! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

---

**Note**: This project was developed as part of the SE100 course. For educational purposes and demonstration of full-stack development capabilities.
