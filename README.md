# GrocerAI - AI-Powered Grocery E-commerce Platform

A modern, full-stack grocery e-commerce application featuring AI-powered meal suggestions and intelligent shopping capabilities. Built with scalable technologies to deliver a seamless user experience.

## ✨ Key Features

- **🔐 Secure Authentication** - Complete user registration and login system with JWT-based security
- **📦 Product Management** - Comprehensive product catalog with advanced browsing capabilities
- **🛒 Smart Shopping Cart** - Persistent cart functionality with real-time updates
- **🤖 AI-Powered Recommendations** - Intelligent meal suggestions powered by Google Gemini AI
- **👨‍💼 Admin Dashboard** - Full administrative control over products, orders, and users
- **📋 Order Processing** - End-to-end order management system
- **📱 Responsive Design** - Mobile-first, responsive interface built with Tailwind CSS

## 🛠️ Technology Stack

**Backend:** Node.js, Express.js, PostgreSQL, JWT Authentication, Google Gemini AI

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios

## 🚀 Quick Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd GrocerAi

# Backend setup
cd backend && npm install

# Frontend setup  
cd ../frontend && npm install
```

2. **Environment Setup**
```bash
cd backend
cp .env.example .env
# Configure your database and API keys in .env
```

3. **Database Setup**
```bash
createdb dailygrocer
psql -d dailygrocer -f database/schema.sql
```

4. **Run Application**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

**URLs:** Backend: http://localhost:3001 | Frontend: http://localhost:5173

## 📁 Project Structure

```
GrocerAi/
├── backend/          # Node.js API server
├── frontend/         # React application  
└── README.md
```

## 🔐 Security Features

- JWT authentication
- Password encryption with bcrypt
- Input validation and sanitization
- Environment variable protection
