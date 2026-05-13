<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

<h1 align="center">
  ✨ Day Planner — MTBC Executive Portal
</h1>

<p align="center">
  <strong>Enterprise-Grade SaaS Platform for Workforce Analytics & Operational Intelligence</strong>
</p>

<p align="center">
  <em>Transform operational visibility into executive intelligence. Built for MTBC leadership teams to monitor day planner tasks, track team productivity, and drive data-informed decisions — all in real time.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Roles-5_Hierarchies-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Theme-Dark_%2F_Light-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/API-Websoft_%26_Securesoft-red?style=flat-square" />
</p>

---

## 🎯 Purpose & Vision

Day Planner is a **next-generation executive portal** designed for the **MTBC** organization. It aggregates workforce task data from the **Websoft/Securesoft Billing Desk API**, transforming raw day planner entries into actionable executive intelligence through:

- 📊 **Real-time KPI dashboards** tailored per leadership role
- 📈 **Productivity analytics** with trend analysis, heatmaps & scoring
- 🏢 **Department & team performance** visibility for directors
- ⚡ **Task workflow management** with Kanban boards, SLA timers & escalation tracking
- 🔐 **Enterprise RBAC** with 5-level role hierarchy

---

## 🖼️ Screenshots

### 🌙 Dark Mode — Executive Dashboard
| Super Admin Dashboard | Task Kanban Board |
|---|---|
| ![Dashboard Dark](https://placehold.co/800x450/0a0014/6366f1?text=Super+Admin+Dashboard&font=raleway) | ![Tasks Dark](https://placehold.co/800x450/0a0014/a855f7?text=Task+Kanban+Board&font=raleway) |

### ☀️ Light Mode — Clean & Professional
| Light Mode Dashboard | Login Page |
|---|---|
| ![Dashboard Light](https://placehold.co/800x450/f8f9fc/6366f1?text=Light+Mode+Dashboard&font=raleway) | ![Login](https://placehold.co/800x450/f8f9fc/a855f7?text=Sign+In+Page&font=raleway) |

### 📱 More Views
| Analytics & Charts | User Profiles | Settings & Theme |
|---|---|---|
| ![Analytics](https://placehold.co/400x250/0a0014/10b981?text=Analytics&font=raleway) | ![Users](https://placehold.co/400x250/0a0014/f59e0b?text=User+Profiles&font=raleway) | ![Settings](https://placehold.co/400x250/0a0014/ec4899?text=Settings&font=raleway) |

> **💡 Tip:** Replace placeholders above with actual screenshots from your running instance.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    MTBC Executive Portal                 │
├─────────────┬───────────────────────────┬───────────────┤
│   Frontend  │       Backend API         │   External    │
│  (Next.js)  │    (Node + Express)       │    APIs       │
│             │                           │               │
│ ┌─────────┐ │ ┌───────────┐ ┌────────┐ │ ┌───────────┐ │
│ │Dashboard │ │ │Auth (JWT) │ │MongoDB │ │ │ Websoft   │ │
│ │ Pages   │◄──►│Controllers│◄►│Mongoose│ │ │ Billing   │ │
│ │(React)  │ │ │  + RBAC   │ │ Models │ │ │ Desk API  │ │
│ └─────────┘ │ └───────────┘ └────────┘ │ ├───────────┤ │
│ ┌─────────┐ │ ┌───────────┐            │ │Securesoft │ │
│ │Zustand  │ │ │ Cron Jobs │            │ │  Sync     │ │
│ │ Store   │ │ │ (Sync)    │            │ │  Service  │ │
│ └─────────┘ │ └───────────┘            │ └───────────┘ │
└─────────────┴───────────────────────────┴───────────────┘
```

---

## ✨ Features

### 🎨 UI / UX
| Feature | Description |
|---|---|
| 🌗 **Dark / Light Theme** | One-click toggle, persisted via localStorage, zero-flash on load |
| 💎 **Glassmorphism Design** | Premium frosted-glass cards with ambient glow effects |
| 🎬 **Framer Motion** | Cinematic page transitions, staggered animations, layout animations |
| 📱 **Fully Responsive** | Desktop sidebar collapses, mobile drawer navigation |
| 🔗 **Everything Clickable** | Every KPI, card, row, and badge navigates to detail pages |

### 🛡️ Security & Access Control
| Feature | Description |
|---|---|
| 🔐 **JWT Authentication** | Access + Refresh token strategy with httpOnly cookies |
| 👥 **5-Level RBAC** | Super Admin → Director → Asst. Director → Lead → Accounts Manager |
| 🛡️ **Helmet + CORS** | HTTP security headers, configurable origin policy |
| ⏱️ **Rate Limiting** | Express rate limiter to prevent abuse |
| 📝 **Audit Logging** | Winston-based structured logging with file + console transports |

### 📊 Dashboards (Role-Based)
| Role | Dashboard Includes |
|---|---|
| **Super Admin** | Org-wide KPIs, department stats, team performance, quick actions, API sync status |
| **Director** | Department tasks, team members, completion rate, overdue tracking |
| **Asst. Director** | Team monitoring, lead coordination, department analytics |
| **Team Lead** | Task management, employee productivity, workload balancing |
| **Accounts Manager** | Financial workflows, billing analytics, revenue tracking |

### 📋 Task Management
- ✅ **Kanban Board** — Drag-style columns: Pending → In Progress → Completed → Overdue → Cancelled
- 📋 **List View** — Sortable table with priority, status, assignee, due date
- 🔍 **Advanced Filters** — By priority (Critical/High/Medium/Low), category, status
- 📄 **Task Detail Page** — Progress bar, time tracking, activity log, comments, tags
- ⏰ **SLA Timers** — Automatic overdue detection and escalation indicators
- 🔗 **Cross-Navigation** — Task → User profile, User → Assigned tasks

### 📈 Analytics & Insights
- 📊 Productivity trend charts (Recharts)
- 🏢 Department efficiency comparison
- 👤 Employee performance ranking with scoring
- ⏰ Hourly activity heatmaps
- 📅 Monthly productivity tracking
- 🎯 Status & priority distribution pie charts

### 🔌 API Integration
- 🌐 **Websoft Billing Desk** — Real-time day planner task synchronization
- 🔄 **Securesoft API** — Workforce data aggregation
- 📡 **API Health Monitor** — Endpoint status, latency tracking, sync history
- ⏰ **Cron-based Sync** — Automated periodic data synchronization

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router, SSR, API routes |
| **React 19** | UI components with hooks & concurrent features |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS 3** | Utility-first styling with custom theme system |
| **Framer Motion 11** | Animations & page transitions |
| **Recharts 2** | Data visualization charts |
| **Zustand 4** | Lightweight state management with persistence |
| **Radix UI** | Accessible UI primitives |
| **Lucide React** | Beautiful icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB + Mongoose** | Document database with ODM |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Winston** | Structured logging |
| **Helmet** | HTTP security headers |
| **node-cron** | Scheduled task sync |
| **express-rate-limit** | API rate limiting |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** or **yarn**
- **MongoDB** (optional — app runs in demo mode without it)

### 1. Clone the repository

```bash
git clone https://github.com/aleemrana8/Day-Planner-Portal.git
cd Day-Planner-Portal
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets
```

<details>
<summary>📋 Environment Variables</summary>

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/day-planner
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
WEBSOFT_API_BASE_URL=https://api.websoft.com
NODE_ENV=development
```
</details>

```bash
# Start backend (with auto-reload)
npm run dev
```

> **💡 No MongoDB?** The backend gracefully starts in API-only mode. The frontend uses built-in demo data automatically.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** — you're in!

### 4. Demo Accounts (No Setup Needed)

| Role | Email | Password |
|---|---|---|
| 🔴 **Super Admin** | `admin@dayplanner.com` | `Admin@123456` |
| 🔵 **Director** | `ahmed.khan@dayplanner.com` | `Director@123` |
| 🟣 **Asst. Director** | `fatima.zahra@dayplanner.com` | `AD@123456` |
| 🟢 **Team Lead** | `ali.ahmed@dayplanner.com` | `Lead@12345` |
| 🟡 **Accounts Mgr** | `kashif.m@dayplanner.com` | `Accounts@123` |

---

## 📁 Project Structure

```
Day-Planner-Portal/
├── backend/
│   ├── src/
│   │   ├── config/         # Database & logger configuration
│   │   ├── controllers/    # Route handlers (auth, tasks, users, etc.)
│   │   ├── middleware/      # JWT auth & RBAC authorization
│   │   ├── models/          # Mongoose schemas (User, Task, Department, etc.)
│   │   ├── routes/          # Express route definitions
│   │   ├── seeders/         # Database seed script
│   │   └── server.js        # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── dashboard/   # All dashboard routes
│   │   │   │   ├── analytics/
│   │   │   │   ├── api-monitor/
│   │   │   │   ├── audit/
│   │   │   │   ├── billing/
│   │   │   │   ├── settings/
│   │   │   │   ├── tasks/[id]/
│   │   │   │   ├── users/[id]/
│   │   │   │   └── layout.tsx    # Dashboard shell with sidebar
│   │   │   ├── login/
│   │   │   ├── globals.css       # Theme CSS variables
│   │   │   ├── layout.tsx        # Root layout + ThemeProvider
│   │   │   └── page.tsx          # Landing page
│   │   ├── components/
│   │   │   ├── charts/      # Recharts visualizations
│   │   │   ├── dashboards/  # Role-specific dashboard components
│   │   │   ├── ui/          # KPICard, TaskStatus, ActivityFeed, etc.
│   │   │   └── ThemeProvider.tsx
│   │   ├── lib/             # Demo data & utilities
│   │   ├── store/           # Zustand stores (auth, theme)
│   │   └── types/           # TypeScript interfaces
│   └── package.json
│
└── README.md
```

---

## 🌗 Theme System

The portal features a **premium dual-theme system** built with CSS custom properties:

```
Light Mode                          Dark Mode
┌──────────────────────┐    ┌──────────────────────┐
│  #f8f9fc background  │    │  #030014 background  │
│  Indigo-tinted glass │    │  White-tinted glass  │
│  Dark readable text  │    │  Light crisp text    │
│  Subtle shadows      │    │  Ambient glow        │
└──────────────────────┘    └──────────────────────┘
```

- **Toggle** from navbar (Sun/Moon icon), login page, or Settings → Appearance
- **Persisted** via `localStorage` with zero-flash script on page load
- **60+ CSS variables** for backgrounds, surfaces, borders, text, overlays

---

## 🔒 Role-Based Access Control (RBAC)

```
                    ┌───────────────┐
                    │  Super Admin  │  Full organizational control
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   Director    │  Department-level management
                    └───────┬───────┘
                            │
                  ┌─────────▼─────────┐
                  │  Asst. Director   │  Team monitoring & coordination
                  └─────────┬─────────┘
                            │
                    ┌───────▼───────┐
                    │     Leads     │  Task & employee management
                    └───────┬───────┘
                            │
                 ┌──────────▼──────────┐
                 │  Accounts Manager   │  Financial workflows
                 └─────────────────────┘
```

Each role sees a **customized dashboard** with relevant KPIs, navigation items, and data access levels.

---

## 📦 Key Pages & Navigation Map

```
Landing (/)
  └── Login (/login)
        └── Dashboard (/dashboard)
              ├── Tasks (/dashboard/tasks)
              │     └── Task Detail (/dashboard/tasks/[id])
              ├── Analytics (/dashboard/analytics)
              ├── Users (/dashboard/users)
              │     └── User Detail (/dashboard/users/[id])
              ├── Billing (/dashboard/billing)
              ├── API Monitor (/dashboard/api-monitor)
              ├── Audit Logs (/dashboard/audit)
              └── Settings (/dashboard/settings)
```

**Every element is interlinked:** KPI cards → detail pages, task rows → task detail, user cards → user profiles, "View All" headers → full listings, activity feed → audit logs.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Muhammad Aleem** — Full-Stack Developer  
Built with ❤️ for **MTBC** operational excellence.

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-Next.js_+_Express-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Powered_by-Websoft_%26_Securesoft-6366f1?style=for-the-badge" />
</p>
