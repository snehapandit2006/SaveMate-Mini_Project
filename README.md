# 💰 SaveMate Backend — Smart Finance & Learning Companion

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-blue?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-AES--256%20%7C%20Argon2-red)]()
[![Status](https://img.shields.io/badge/Status-In%20Progress-orange)]()

> SaveMate is a smart personal finance and savings management web application that combines financial discipline, gamified learning, and AI insights to make money management easy and engaging.
          It enables users to: 
                   1. Set budgets and saving goals 🏦
                   2. Track expenses and spending habits 💳
                   3. Receive AI-powered money tips 🧠
                   4. Enable parental control and OTP-based locks for minors 🔐

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
## 🧱 Project Structure
```
          save-mate/
          │
          ├── frontend/                      # React app (Web) + UI kit
          │   ├── package.json
          │   ├── .env                      # FRONTEND env (API_URL, VITE_...)
          │   ├── tailwind.config.js
          │   ├── postcss.config.js
          │   ├── public/
          │   │   └── index.html
          │   └── src/
          │       ├── main.jsx               # React entry (Vite/CRA)
          │       ├── App.jsx
          │       ├── index.css
          │       ├── api/                   # axios instances, auth interceptors
          │       │   └── apiClient.js
          │       ├── assets/                # images, logo, icons, lottie
          │       ├── components/            # small reusable components (Button, Modal)
          │       │   ├── ui/
          │       │   │   ├── Button.jsx
          │       │   │   └── Card.jsx
          │       │   └── layout/
          │       │       ├── Header.jsx
          │       │       └── Footer.jsx
          │       ├── features/              # feature-level components
          │       │   ├── auth/
          │       │   │   ├── Login.jsx
          │       │   │   ├── Register.jsx
          │       │   │   └── VerifyOtp.jsx
          │       │   ├── dashboard/
          │       │   │   ├── Dashboard.jsx
          │       │   │   └── Charts.jsx
          │       │   ├── expenses/
          │       │   │   ├── ExpenseList.jsx
          │       │   │   └── ExpenseForm.jsx
          │       │   ├── goals/
          │       │   │   ├── GoalsList.jsx
          │       │   │   └── GoalForm.jsx
          │       │   └── parental/
          │       │       └── ParentalLockModal.jsx
          │       ├── context/               # React context (AuthContext)
          │       │   └── AuthContext.jsx
          │       ├── hooks/                 # custom hooks (useAuth, useFetch)
          │       ├── services/              # client-side business logic (aiService.js)
          │       ├── routes/                # route definitions (React Router)
          │       └── utils/                 # helpers (formatCurrency, validators)
          │
          ├── backend/                       # Node.js + Express API
          │   ├── package.json
          │   ├── .env
          │   ├── .env.example
          │   ├── Dockerfile
          │   ├── docker-compose.yml        # local dev with db + redis
          │   ├── src/
          │   │   ├── index.js              # server bootstrap
          │   │   ├── app.js                # express app, middleware, routes
          │   │   ├── config/
          │   │   │   ├── db.js             # Sequelize setup
          │   │   │   └── logger.js
          │   │   ├── controllers/
          │   │   │   ├── authController.js
          │   │   │   ├── expenseController.js
          │   │   │   ├── goalController.js
          │   │   │   ├── budgetController.js
          │   │   │   └── parentalController.js
          │   │   ├── routes/
          │   │   │   ├── auth.js
          │   │   │   ├── expenses.js
          │   │   │   ├── goals.js
          │   │   │   ├── budget.js
          │   │   │   └── parental.js
          │   │   ├── models/
          │   │   │   ├── index.js          # load & associate models
          │   │   │   ├── user.js
          │   │   │   ├── expense.js
          │   │   │   ├── goal.js
          │   │   │   └── budget.js
          │   │   ├── services/
          │   │   │   ├── aiService.js      # calls to AI microservice
          │   │   │   ├── notificationService.js
          │   │   │   └── budgetService.js
          │   │   ├── utils/
          │   │   │   ├── crypto.js         # AES-256 encrypt/decrypt
          │   │   │   ├── otp.js            # OTP generator/store (redis-ready)
          │   │   │   └── email.js          # nodemailer wrapper
          │   │   ├── middleware/
          │   │   │   ├── auth.js
          │   │   │   ├── roles.js
          │   │   │   ├── errorHandler.js
          │   │   │   └── rateLimiter.js
          │   │   └── jobs/                 # background jobs (cron or bull)
          │   │       └── budgetAlertJob.js
          │   ├── migrations/               # Sequelize migrations
          │   ├── seeders/                  # seed data
          │   └── tests/                    # unit / integration tests (jest/supertest)
          │
          ├── ai-service/                    # optional microservice for AI summarization
          │   ├── package.json
          │   ├── src/
          │   │   ├── main.py                # FastAPI app
          │   │   ├── model_runner.py        # TF/PyTorch or HF pipeline wrapper
          │   │   └── routes.py              # /summarize endpoint
          │   └── Dockerfile
          │
          ├── infra/                         # infra manifests, docs, terraform (optional)
          │   ├── k8s/                       # k8s manifests (deployment, svc)
          │   └── terraform/                 # infra-as-code (RDS, Redis, S3)
          │
          ├── docs/
          │   ├── ERD.png
          │   ├── architecture.pdf
          │   └── SaveMate_API.postman_collection.json
          │
          ├── .github/
          │   └── workflows/
          │       └── ci.yml                 # CI: lint, test, build, docker
          │
          └── README.md                      # top-level project README (monorepo)

```
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
```
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
          Name	                Role                              	Responsibilities
          Sneha Pandit	    Backend & Security Lead	          Auth, Database, Encryption, APIs
          Avani Garg	    Frontend & ML Integration       	React UI, OTP workflows, AI feed
          Shristi Negi	    AI & UX Prototyping	          AI summarizer, model integration
🧾 License

This project is licensed under the MIT License.
```

🌟 Acknowledgements

Special thanks to GLA University, Mathura and Prof. Preshit Desai (Mentor) for guiding the SaveMate project.

“SaveMate combines financial discipline, gamified learning, and AI insights — making money management simple, secure, and smart for every student.”

📧 Contact

Sneha Pandit — Backend & Security Lead
📩 sneha.pandit_cs.aiml23@gla.ac.in

📍 GLA University, Mathura
🕸️ GitHub: sneha20061901@gmail.com

Shristi Negi — AI & UX Prototyping
📩 shristi.negi_cs. aiml23@gla.ac.in 

📍 GLA University, Mathura
🕸️ GitHub: shristinegi658@gmail.com 

Avani Garg — Frontend & ML Integration
📩 avani.garg_cs.aiml23.gla.ac.in  

📍 GLA University, Mathura
🕸️ GitHub: gargavni2005@gmail.com



