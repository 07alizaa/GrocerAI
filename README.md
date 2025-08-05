# DailyGrocer - AI-Powered Grocery E-commerce Platform

A modern, full-stack grocery e-commerce application featuring AI-powered meal suggestions an## 📄 License

This project is licensed under the **ISC License**.

## 👨‍💻 Developer

**Aliza**

---

## ⚠️ Important Notesnt shopping capabilities. Built with scalable technologies to deliver a seamless user experience.

## ✨ Key Features

- **🔐 Secure Authentication** - Complete user registration and login system with JWT-based security
- **📦 Product Management** - Comprehensive product catalog with advanced browsing capabilities
- **🛒 Smart Shopping Cart** - Persistent cart functionality with real-time updates
- **🤖 AI-Powered Recommendations** - Intelligent meal suggestions powered by Google Gemini AI
- **👨‍💼 Admin Dashboard** - Full administrative control over products, orders, and users
- **📋 Order Processing** - End-to-end order management system
- **📱 Responsive Design** - Mobile-first, responsive interface built with Tailwind CSS

## 🛠️ Technology Stack

### Backend Technologies
- **Node.js** with Express.js framework
- **PostgreSQL** database with optimized queries
- **JWT** for secure authentication
- **bcrypt** for password encryption
- **Google Gemini AI** integration for meal suggestions
- **Multer** for efficient file upload handling

### Frontend Technologies
- **React 18** with Vite for fast development
- **React Router** for client-side navigation
- **Axios** for HTTP requests and API communication
- **Tailwind CSS** for modern, utility-first styling
- **React Hot Toast** for user notifications
- **Lucide React** for consistent iconography

## 📋 System Requirements

- **Node.js** v14 or higher
- **PostgreSQL** database server
- **Google Gemini API key** (optional for AI meal suggestions)

## ⚡ Quick Start Guide

### 1. Clone the Repository
```bash
git clone <repository-url>
cd GrocerAi
```

### 2. Backend Configuration
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### 3. Environment Setup
Create your environment configuration:
```bash
cp .env.example .env
```

Configure the `.env` file with your specific values:
```env
PORT=3001
DB_USER=postgres
DB_HOST=localhost
DB_NAME=dailygrocer
DB_PASSWORD=your_actual_password
DB_PORT=5432
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
HF_API_KEY=your_huggingface_api_key
```

### 4. Database Initialization
Set up your PostgreSQL database:
```bash
createdb dailygrocer
psql -d dailygrocer -f database/schema.sql
```

### 5. Frontend Setup
Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start the Backend Server
Launch the API server in development mode:
```bash
cd backend
npm run dev
```
**Server URL:** http://localhost:3001

### Start the Frontend Application
Launch the React development server:
```bash
cd frontend
npm run dev
```
**Application URL:** http://localhost:5173

> **Note:** Ensure both servers are running simultaneously for full functionality.

## 📁 Project Architecture

```
GrocerAi/
├── backend/                 # Server-side application
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic handlers
│   ├── middleware/         # Authentication & validation middleware
│   ├── models/             # Data models and schemas
│   ├── routes/             # API endpoint definitions
│   ├── database/           # Database schema and migrations
│   └── index.js            # Main server entry point
├── frontend/               # Client-side application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components and routing
│   │   └── services/       # API integration services
│   └── public/             # Static assets and resources
└── README.md               # Project documentation
```

## 🔐 Security Implementation

This application implements industry-standard security practices:

- **Environment Variables** - All sensitive configuration data is externalized
- **Password Security** - bcrypt hashing with salt for password storage
- **JWT Authentication** - Secure token-based authentication system
- **API Rate Limiting** - Protection against abuse and DDoS attacks
- **Input Validation** - Comprehensive validation on all API endpoints
- **SQL Injection Prevention** - Parameterized queries and ORM protection

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'Add some AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

## � License

This project is licensed under the **ISC License**.

## �‍💻 Developer

**Saish Tiwari**

---

## ⚠️ Important Notes

- **Environment Configuration**: Ensure all environment variables are properly configured before running the application
- **Security**: Never commit sensitive information such as API keys, passwords, or JWT secrets to version control
- **Database**: Make sure PostgreSQL is running and accessible before starting the backend server
- **API Keys**: The AI features require a valid Google Gemini API key for full functionality
