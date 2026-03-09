# CLAUDE.md — Project Overview

## What This App Does
A web application helping young Australians aged 15-25 
in Victoria understand UV risks and adopt sun-safe 
behaviours, countering the TikTok tanning trend.

## Quick Links
- Full Tech Stack → docs/tech-stack-decision.md
- Database Schema → docs/database-schema.md (in progress)
- API Endpoints → docs/api-endpoints.md (in progress)
- Data Sources → docs/data-sources.md
- Security Plan → docs/security-plan.md (in progress)
- UI Guidelines → docs/ui-guidelines.md (in progress)

## Tech Stack (Summary)
- Frontend: React (Vite)
- Backend: Flask (Python)
- Database: PostgreSQL (Neon.tech)
- UV API: OpenWeatherMap
- Charts: Recharts
- Animations: Framer Motion
- Auth: JWT
- Hosting: Vercel + Render

## Must Have Features
1. US1.1 — Real-time UV alerts by location
2. US2.1 — Skin cancer data visualisations
3. US3.3 — Clothing recommendations by UV index

## Project Structure
- frontend/src/components/ ← reusable UI
- frontend/src/pages/ ← one folder per page
- frontend/src/services/ ← all API calls
- frontend/src/hooks/ ← business logic
- backend/app/routes/ ← Flask endpoints
- backend/app/models/ ← database models
- backend/app/services/ ← business logic

## Coding Standards
- JSDoc comments on every JS function
- Docstrings on every Python function
- No hardcoded values — use constants/
- No API keys in code — use .env

## Git Workflow
- main → production
- develop → working branch
- feature/xxx → one per feature
- Always branch from develop

## Team
| Name | Role |
|---|---|
| Saubhagya Das | Project Lead & Full Stack |
| Xueer Yao | Full Stack Developer |
| Shimin Cai | Business Analyst & UI |
| Zedongwang | Data Engineer & Backend |
| Arshdeep Sokhal | Data Analyst & Backend |