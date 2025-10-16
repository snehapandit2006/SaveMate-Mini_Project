# 💰 SaveMate Backend — Smart Finance & Learning Companion

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-blue?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-AES--256%20%7C%20Argon2-red)]()
[![Status](https://img.shields.io/badge/Status-In%20Progress-orange)]()

> Backend for **SaveMate**, an AI-powered personal finance and savings management platform designed to help students and young earners build financial discipline, manage expenses, set savings goals, and learn smarter money habits.

---

## 🚀 Features Overview

### 🔐 **Authentication & Security**
- Secure **JWT-based authentication** (login/signup)
- **Argon2** password hashing for strong protection
- **Email & OTP verification** for registration & parental lock
- **AES-256 encryption** for sensitive user data
- Role-based access control (Student / Parent / Admin)

### 💰 **Finance Management**
- **Expense Tracking API** — Add, update, delete, and view categorized expenses
- **Goal Tracking API** — Create, track, and visualize savings goals
- **Budget Limitation API** — Set monthly/weekly/daily limits with overspending alerts
- **Notifications System** — Budget alerts, goal progress reminders, parental approvals

### 🧠 **AI Integration (Planned)**
- Connects to HuggingFace summarization models (**T5/BART**)
- Converts uploaded finance/study material into short AI insights
- “Study-to-Shorts” pipeline for interactive learning experience

### 👨‍👩‍👧 **Parental Lock Workflow**
- OTP-secured parental control for minors/students
- Verification system before unlocking spending limits
- Optional parental dashboard (Phase 3)

### ☁️ **Cloud-Ready & Scalable**
- Built with **Node.js + Express + PostgreSQL**
- ORM: **Sequelize** for clean schema management
- **Redis-ready** for OTP/session caching
- Deployable on **Render / Heroku / Vercel / AWS**

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Language** | JavaScript (Node.js + Express) |
| **Database** | PostgreSQL (Sequelize ORM) |
| **Authentication** | JWT + Argon2 + OTP |
| **Encryption** | AES-256-GCM |
| **Security** | Helmet.js, CORS, PCI DSS & GDPR compliance |
| **AI/ML** | HuggingFace (T5/BART) — via FastAPI microservice |
| **Deployment** | Render / Heroku / Vercel |
| **Cache** | Redis (optional) |

---

save-mate-backend/
│
├── src/
│ ├── config/ # Database setup (Sequelize + PostgreSQL)
│ ├── controllers/ # Business logic for routes
│ ├── middleware/ # Auth, role checks, error handling
│ ├── models/ # Sequelize models (User, Expense, Goal)
│ ├── routes/ # Express API endpoints
│ ├── utils/ # Crypto, OTP, email helpers
│ └── index.js # App entry point
│
├── .env.example # Environment variables template
├── package.json # Dependencies and scripts
└── README.md


---

## 🧩 Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/save-mate-backend.git
cd save-mate-backend

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file in the project root:

PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/savemate_dev
JWT_SECRET=supersecretkey
AES_SECRET=32_character_long_key_here
JWT_EXPIRES_IN=1h
OTP_TTL=300

4️⃣ Start the server
npm run dev


Server will run at: http://localhost:4000
```
🔥 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive JWT
POST	/api/auth/verify-otp	Verify OTP for email or parental lock
GET	/api/expenses	Get all expenses for the logged-in user
POST	/api/expenses	Add a new expense
GET	/api/goals	View all savings goals
POST	/api/goals	Create a new goal
GET	/api/budget	Get current budget summary (planned)
🧠 Roadmap
Phase	Goal	Status
Phase 1	Auth System (JWT + OTP + Argon2)	✅ Completed
Phase 2	Expense & Goal APIs (CRUD)	🟡 In Progress
Phase 3	Budget Control + Parental Lock	⚙️ Designing
Phase 4	AI Integration (Hugging Face Models)	⏳ Upcoming
Phase 5	Full Deployment + Testing	⏳ Upcoming
👨‍💻 Team
Name	Role	Responsibilities
Sneha Pandit	Backend & Security Lead	Auth, Database, Encryption, APIs
Avani Garg	Frontend & ML Integration	React UI, OTP workflows, AI feed
Shristi Negi	AI & UX Prototyping	AI summarizer, model integration
🧾 License

This project is licensed under the MIT License
.

🌟 Acknowledgements

Special thanks to GLA University, Mathura and Prof. Preshit Desai (Mentor) for guiding the SaveMate project.

“SaveMate combines financial discipline, gamified learning, and AI insights — making money management simple, secure, and smart for every student.”

📧 Contact

Sneha Pandit — Backend & Security Lead
📩 sneha.pandit_cs.aiml23@gla.ac.in

📍 GLA University, Mathura
🕸️ GitHub: sneha20061901@gmail.com

## 🧱 Project Structure
