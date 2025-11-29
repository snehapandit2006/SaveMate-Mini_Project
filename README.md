💰 SaveMate — Smart Finance & Learning Companion














A secure, student-friendly finance app that builds better saving habits using goals, streaks, parental lock, emergency mode, and AI-based insights.

🚀 Quick Links

Live Demo: (add link)

Frontend: /frontend

Backend: /backend

AI Service: /ai-service

Postman Collection: /docs/SaveMate_API.postman.json

📌 Table of Contents

Overview

Features

Architecture

Data Model

Setup Guide

Acceptance Criteria

Future Enhancements

Team

License

🧠 Overview

Students and young adults struggle with budgeting, overspending, and maintaining saving habits. SaveMate solves this using:

Goal-based saving

Budget limits & overspending alerts

Automated streak habit-building

OTP-secured parental lock

Emergency mode to restrict high-value spending

AES-256 encrypted data + JWT auth

AI-based categorization & insights

✨ Features
<details> <summary><strong>🔐 Authentication & Security</strong></summary>

JWT login system

AES-256 encrypted sensitive fields

Password hashing (bcrypt)

Parent/Child role-based access

OTP verification for parental lock

</details> <details> <summary><strong>💸 Expense Management</strong></summary>

Add / edit / delete expenses

Categories: Food, Travel, Education, Shopping, Rent, Others

Search + pagination

CSV export

</details> <details> <summary><strong>🎯 Goal Setting & Auto-Saving</strong></summary>

Create long-term savings goals

Auto-money-save logic

Goal progress indicators

Real-time milestone notifications (WebSocket)

</details> <details> <summary><strong>⚠️ Budget & Alerts</strong></summary>

Monthly spending limits

Overspending warnings

Parent alert trigger

</details> <details> <summary><strong>🛡 Parental Lock (OTP-Based)</strong></summary>

Triggered automatically when user overspends

OTP delivered via email

Lock/unlock dashboard features

</details> <details> <summary><strong>🔥 Emergency Mode</strong></summary>

Blocks non-essential expenses

Restricts large-value transactions

Notifies parent

</details> <details> <summary><strong>📅 Streak Habit System</strong></summary>

Daily saving streak

Reward-based motivation

Auto-reset on missed days

</details> <details> <summary><strong>📊 Analytics Dashboard</strong></summary>

Charts include:

Monthly spending

Category-wise analytics

Goal progress

Streak heatmap

</details>
🖼 Architecture
System Architecture
Frontend (React + Tailwind)
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Atlas (Database)
        ↓
AI Microservice (FastAPI + HuggingFace)
        ↓
WebSocket Notifications


Add these images inside /docs/:

architecture.png

flowchart.png

🗂 Data Model
MongoDB Collections
Users
email, password, role, encryptedFields

Expenses
amount, category, date, userId

Goals
target, savedAmount, deadline, autoSave

Budgets
limit, month, warnings

Streaks
currentStreak, lastUpdated

Notifications
type, message, timestamp

⚙️ Setup Guide
Backend Setup
cd backend
cp .env.example .env
npm install
npm run dev

Frontend Setup
cd frontend
cp .env.example .env
npm install
npm run dev

AI Microservice Setup
cd ai-service
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8001

🧪 Acceptance Criteria

JWT should be issued in <5 seconds

Adding an expense should instantly broadcast via WebSocket

Goal progress reaching 50% triggers notification

Overspending triggers OTP parental lock

🔮 Future Enhancements

UPI/Bank integration

AI-driven budgeting predictions

Group savings & collaborative goals

Mobile app (React Native)

OCR receipt scanning

Investment recommendations

👩‍💻 Team
Name	Role	Responsibilities
Sneha Pandit	Backend & Security Lead	Auth, encryption, parental lock, emergency mode, WebSocket
Avani Garg	Frontend Developer	UI, dashboards, charts, animations
Shristi Negi	AI & UX Prototyping	Categorization, AI insights, UX polishing
📝 License

MIT © 2025 Team SaveMate
  
