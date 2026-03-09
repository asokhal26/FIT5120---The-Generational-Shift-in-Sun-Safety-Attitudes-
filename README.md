# The Generational Shift in Sun-Safety Attitudes
### FIT5120 — Onboarding Iteration

A web application helping young Australians aged 15–25 
understand UV risks and adopt sun-safe behaviours.

---

##  Documentation
| Document | Link |
|---|---|
| Analysis & Design Report | [View](#) |
| Tech Stack Decision | [View](#) |
| Data Sources | [View](#) |
| Leankit Board | [View](#) |
| Project Governance | [View](#) |

---

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Flask (Python) |
| Database | PostgreSQL |
| UV API | OpenWeatherMap |
| Charts | Recharts |
| Hosting | Vercel + Render |

---

## Features (Onboarding Iteration)
- Real-time UV level alerts by location
- Skin cancer data visualisations
- Clothing recommendations by UV index

---

##  Team
| Name | Role |
|---|---|
| Xueer Yao | Business Analyst & UI Developer |
| Saubhagya Das | Data Analyst & Front end Developer |
| Shimin Cai | Project Manager & UI Developer |
| Zedongwang | Data Engineer |
| Arshdeep Sokhal | Data Analyst & Backend Developer  |

---

## Getting Started
(Setup instructions will be added when build begins)

---

##  Project Structure

```
FIT5120-Sun-Safety/
│
├── CLAUDE.md                              ← AI context file
├── README.md                              ← project overview
├── .gitignore                             ← git ignore rules
├── .env.example                           ← environment variables template
├── docker-compose.yml                     ← local dev environment
├── docker-compose.prod.yml                ← production Docker config
│
├── docs/                                  ← all documentation
│   ├── analysis-design-report.pdf
│   ├── tech-stack-decision.md
│   ├── data-sources.md
│   ├── security-plan.md                   ← data security plan
│   ├── data-management-plan.md            ← data management plan
│   └── diagrams/
│       ├── tech-stack-diagram.png
│       ├── database-schema.png
│       └── user-flow.png
│
├── .github/
│   ├── workflows/
│   │   ├── deploy-frontend.yml            ← auto deploy frontend
│   │   ├── deploy-backend.yml             ← auto deploy backend
│   │   └── run-tests.yml                  ← auto run tests
│   ├── PULL_REQUEST_TEMPLATE.md           ← PR template
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── frontend/                              ← React app
│   ├── public/
│   │   ├── index.html
│   │   ├── robots.txt                     ← search engine control
│   │   └── favicon.ico
│   ├── src/
│   │   ├── animations/                    ← Framer Motion configs
│   │   │   ├── index.js
│   │   │   ├── fadeIn.js
│   │   │   ├── slideUp.js
│   │   │   ├── slideIn.js
│   │   │   ├── pulse.js                   ← UV alert pulse
│   │   │   └── stagger.js
│   │   │
│   │   ├── assets/
│   │   │   ├── icons/
│   │   │   ├── images/
│   │   │   ├── fonts/
│   │   │   └── lottie/                    ← Lottie animation files
│   │   │
│   │   ├── components/
│   │   │   ├── index.js                   ← exports all components
│   │   │   ├── common/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   ├── Button.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.jsx
│   │   │   │   │   ├── Card.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Loader/
│   │   │   │   │   ├── Loader.jsx
│   │   │   │   │   ├── Loader.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Modal/
│   │   │   │   │   ├── Modal.jsx
│   │   │   │   │   ├── Modal.css
│   │   │   │   │   └── index.js
│   │   │   │   └── Toast/
│   │   │   │       ├── Toast.jsx
│   │   │   │       ├── Toast.css
│   │   │   │       └── index.js
│   │   │   ├── Navigation/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Navbar.css
│   │   │   │   └── index.js
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Footer.css
│   │   │   │   └── index.js
│   │   │   ├── UVAlert/
│   │   │   │   ├── UVAlert.jsx
│   │   │   │   ├── UVAlert.css
│   │   │   │   ├── UVGauge.jsx
│   │   │   │   └── index.js
│   │   │   ├── Charts/
│   │   │   │   ├── CancerTrendChart.jsx
│   │   │   │   ├── UVTrendChart.jsx
│   │   │   │   ├── Charts.css
│   │   │   │   └── index.js
│   │   │   ├── ClothingCard/
│   │   │   │   ├── ClothingCard.jsx
│   │   │   │   ├── ClothingCard.css
│   │   │   │   └── index.js
│   │   │   └── Auth/
│   │   │       ├── LoginForm.jsx
│   │   │       ├── RegisterForm.jsx
│   │   │       └── index.js
│   │   │
│   │   ├── constants/
│   │   │   ├── index.js
│   │   │   ├── uvLevels.js
│   │   │   ├── clothing.js
│   │   │   ├── routes.js
│   │   │   └── api.js
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   ├── UVContext.js
│   │   │   └── ThemeContext.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useUVData.js
│   │   │   ├── useLocation.js
│   │   │   ├── useClothing.js
│   │   │   ├── useAuth.js
│   │   │   └── useTheme.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Home.css
│   │   │   │   └── index.js
│   │   │   ├── UVTracker/
│   │   │   │   ├── UVTracker.jsx
│   │   │   │   ├── UVTracker.css
│   │   │   │   └── index.js
│   │   │   ├── Awareness/
│   │   │   │   ├── Awareness.jsx
│   │   │   │   ├── Awareness.css
│   │   │   │   └── index.js
│   │   │   ├── Prevention/
│   │   │   │   ├── Prevention.jsx
│   │   │   │   ├── Prevention.css
│   │   │   │   └── index.js
│   │   │   ├── Login/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Login.css
│   │   │   │   └── index.js
│   │   │   └── NotFound/
│   │   │       ├── NotFound.jsx
│   │   │       ├── NotFound.css
│   │   │       └── index.js
│   │   │
│   │   ├── services/
│   │   │   ├── uvService.js
│   │   │   ├── dataService.js
│   │   │   ├── authService.js
│   │   │   └── api.js                     ← axios base config
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── variables.css
│   │   │   ├── animations.css
│   │   │   └── themes/
│   │   │       ├── light.css
│   │   │       └── dark.css
│   │   │
│   │   ├── utils/
│   │   │   ├── uvCalculator.js
│   │   │   ├── formatters.js
│   │   │   └── validators.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── routes.jsx
│   │
│   ├── vercel.json                        ← Vercel deployment config
│   ├── .env.example
│   └── package.json
│
├── backend/                               ← Flask app
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── uv_routes.py
│   │   │   ├── cancer_routes.py
│   │   │   ├── clothing_routes.py
│   │   │   └── auth_routes.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── uv_reading.py
│   │   │   ├── cancer_data.py
│   │   │   ├── clothing_rule.py
│   │   │   └── user.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── uv_service.py
│   │   │   ├── clothing_service.py
│   │   │   ├── cancer_service.py
│   │   │   └── auth_service.py
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   ├── validators.py
│   │   │   ├── helpers.py
│   │   │   └── security.py
│   │   ├── middleware/
│   │   │   ├── __init__.py
│   │   │   ├── error_handler.py
│   │   │   ├── cors.py
│   │   │   ├── auth_middleware.py         ← JWT token validation
│   │   │   └── rate_limiter.py            ← API rate limiting
│   │   └── data/                          ← AIHW CSV files
│   │
│   ├── database/
│   │   ├── migrations/                    ← database version control
│   │   ├── seeds/
│   │   │   ├── import_aihw.py
│   │   │   └── seed_clothing.py
│   │   └── schema.sql
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_uv_routes.py
│   │   ├── test_cancer_routes.py
│   │   ├── test_clothing_routes.py
│   │   └── test_auth_routes.py
│   │
│   ├── Procfile                           ← Render deployment
│   ├── gunicorn.conf.py                   ← production server
│   ├── runtime.txt                        ← Python version
│   ├── config.py
│   ├── requirements.txt
│   └── run.py
│
```

---

### Academic Project
This project was developed as part of FIT5120 
Industry Experience Studio at Monash University, 2026. 
Not licensed for commercial use.
---

