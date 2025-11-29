# 💰 SaveMate — Smart Finance & Learning Companion

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue?logo=postgresql)](https://www.postgresql.org/)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-AI-orange?logo=huggingface)](https://huggingface.co/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-In%20Progress-orange)]()

> **SaveMate** — an AI-enhanced full-stack app to help students and young earners set budgets, track expenses, achieve goals, and learn via short AI summaries.

---

# 🚀 Quick links
- Live demo: [_(add link when deployed)_](https://savemate-mini-project-2.onrender.com)
- Frontend: [`frontend/`](https://www.figma.com/make/jdd0mFaTd36XGCvrv9k7qG/SaveMate-Workflow-Overview?node-id=0-1&t=5AIygvC95z8BYyDY-1 )
- Backend: [/backend](https://savemate-mini-project-1.onrender.com/)
- AI service: [/api](https://savemate-mini-project.onrender.com)
- Postman collection: `docs/SaveMate_API.postman_collection.json`

---

# ✨ Core Features (point-to-point)

- **Authentication & Security**
  - JWT-based auth, Argon2 password hashing
  - Email & OTP verification (user + parental flows)
  - AES-256-GCM encryption for sensitive fields

- **Expense & Goal Management**
  - CRUD endpoints for expenses and goals
  - Category-based expense tracking, progress bars for goals

- **Budget & Alerts**
  - Daily/weekly/monthly budget limits
  - Auto-alerts for overspending and parental lock triggers

- **AI Summarization**
  - AI microservice (FastAPI) using HuggingFace (T5/BART) — returns short “insights” / shorts
  - Backend stores AI insights and serves feed to UI

- **Parental Controls**
  - OTP-secured approvals and role-based access for parent accounts

- **DevOps & Scalability**
  - Docker + docker-compose for local dev (backend, postgres, redis)
  - Deploy-ready (Vercel frontend, Render/Heroku backend, Supabase/Neon Postgres)

---

# 🧩 Repo structure (short)

    save-mate/
    ├─ frontend/ # React + Tailwind app
    ├─ backend/ # Node/Express API (Sequelize + Mongodb Atlas)
    ├─ ai-service/ # FastAPI summarizer (HuggingFace)
    ├─ docs/ # diagrams, postman collection
    └─ README.md


---

# ⚙️ Getting started (quick)

## Backend
```bash
cd backend
cp .env.example .env
# edit .env (DATABASE_URL, JWT_SECRET, AES_SECRET)
npm install
npm run dev
```
## Frontend
```
cd frontend
cp .env.example .env
# set VITE_API_URL
npm install
npm run dev
```
## AI Service (optional)
```
cd ai-service
# create venv & install
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8001
```
📦 Deployment hints
  Use managed Postgres (Supabase / Neon / RDS) and enable SSL in db.js.
  Store secrets in environment variables or a secret manager (do not commit .env).
  Use Redis for OTP store & caching; replace in-memory OTP store before production.
  Add rate limiting for OTP endpoints and login.
  

🧪 Testing & CI
  Tests: backend uses Jest + Supertest for integration tests; frontend uses Vitest or Jest.
  CI: .github/workflows/ci.yml — lint, test, build, (optional) dockerize.
  

📈 Roadmap (short)
   Auth: JWT + OTP + Argon2
   DB: PostgreSQL models (User, Expense, Goal)
   Expense & Goal CRUD (complete + testing)
   Budget & Parental Lock (integration)
   AI fine-tuning & production deployment
   Security audit & final deployment
   

👩‍💻 Contributors

| Name             | Role                      | Email                                                                       | GitHub                                                      | Institute               |
| ---------------- | ------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------- |
| **Sneha Pandit** | Backend & Security Lead   | [sneha.pandit_cs.aiml23@gla.ac.in](mailto:sneha.pandit_cs.aiml23@gla.ac.in) | [sneha20061901@gmail.com](mailto:sneha20061901@gmail.com)   | GLA University, Mathura |
| **Shristi Negi** | AI & UX Prototyping       | [shristi.negi_cs.aiml23@gla.ac.in](mailto:shristi.negi_cs.aiml23@gla.ac.in) | [shristinegi658@gmail.com](mailto:shristinegi658@gmail.com) | GLA University, Mathura |
| **Avani Garg**   | Frontend & ML Integration | [avani.garg_cs.aiml23@gla.ac.in](mailto:avani.garg_cs.aiml23@gla.ac.in)     | [gargavni2005@gmail.com](mailto:gargavni2005@gmail.com)     | GLA University, Mathura |


📚 References & Resources

    Sequelize docs — https://sequelize.org
    HuggingFace models — https://huggingface.co/models
    OWASP best practices — https://owasp.org
    Node & Express security — Helmet, rate-limit, CORS

📝 License

MIT © 2025 Team SaveMate


--- now i want you to update this according to the synopsis 

