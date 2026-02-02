<div align="center">

# 🍽️ Siupo Restaurant - Frontend

### Graduation Project - Restaurant Ordering & Reservation System

*Modern web application built with React 19, TypeScript & Material-UI*

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![CI](https://github.com/hugn2k4/restaurant-booking-system-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/hugn2k4/restaurant-booking-system-frontend/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/hugn2k4/restaurant-booking-system-frontend/pulls)

---

</div>

## 📋 About

**Siupo Restaurant** is a full-featured restaurant management web application developed as a graduation project. The system provides comprehensive features for customers including menu browsing, food ordering, table reservations, online payment, and order management.

- 🎨 **Modern UI/UX** - Built with Material-UI & Tailwind CSS for a sleek, responsive design
- 🌐 **Multi-language** - Full support for English and Vietnamese with i18next
- 🔐 **Secure Authentication** - JWT-based auth with Google OAuth2 integration
- 🛒 **Smart Shopping Cart** - Real-time cart management with voucher support
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- ⚡ **Lightning Fast** - Powered by Vite with optimized chunk splitting
- 🎯 **Type-Safe** - 100% TypeScript with strict mode enabled

---

## 🚀 Features

### Customer Features

<table>
<tr>
<td width="50%">

#### 🍽️ Menu & Ordering
- Browse menu by categories
- Advanced search & filters
- Detailed product information
- Add to cart & wishlist
- Real-time price calculation

</td>
<td width="50%">

#### 👤 Account Management
- Registration/Login (Email + OAuth2)
- Profile management
- Order history tracking
- Address management

</td>
</tr>
<tr>
<td width="50%">

#### 📅 Table Reservation
- Select date & time
- Choose number of guests
- Pre-order menu items
- Booking confirmation

</td>
<td width="50%">

#### 💳 Secure Checkout
- Multiple payment methods
- Apply discount vouchers
- Secure payment processing
- Order confirmation

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react) | 19.1.1 | UI Library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript) | 5.8.3 | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?style=flat-square&logo=vite) | 7.1.3 | Build Tool |
| ![React Router](https://img.shields.io/badge/React_Router-7.8.1-CA4245?style=flat-square&logo=react-router) | 7.8.1 | Routing |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?style=flat-square&logo=tailwind-css) | 4.1.12 | Utility CSS |
| ![Material-UI](https://img.shields.io/badge/MUI-7.3.2-007FFF?style=flat-square&logo=mui) | 7.3.2 | Components |
| ![Framer Motion](https://img.shields.io/badge/Framer-12.23.12-0055FF?style=flat-square&logo=framer) | 12.23.12 | Animations |

### State & Data

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?style=flat-square) | 1.11.0 | HTTP Client |
| ![i18next](https://img.shields.io/badge/i18next-25.6.3-26A69A?style=flat-square) | 25.6.3 | Internationalization |
| ![React Hook Form](https://img.shields.io/badge/RHF-7.64.0-EC5990?style=flat-square) | 7.64.0 | Form Handling |

---

## 🏗️ Architecture

### 3-Layer Structure

```
UI Components (React)
       ↓
Service Layer (Business Logic)
       ↓
API Layer (Axios)
       ↓
Backend REST API
```

### Project Structure

```
src/
├── api/              # 20 API modules
├── services/         # 11 Service modules
├── pages/            # 21 Page components
├── components/       # UI components (common + layout)
├── contexts/         # Global state (Context API)
├── hooks/            # Custom hooks
├── types/            # TypeScript definitions
├── locales/          # i18n (VI/EN)
├── routers/          # Route config
└── utils/            # Utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0 (recommended: v20.19.4)
- npm >= 8.0.0

### Installation

```bash
# 1. Clone repository
git clone https://github.com/hugn2k4/siupo-frontend.git
cd siupo-frontend

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Update API URLs in .env

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |

---

## 📚 Documentation

Detailed documentation in [`/docs`](./docs):

- [Project Overview](./docs/01-overview.md)
- [Installation Guide](./docs/02-installation.md)
- [Project Structure](./docs/03-project-structure.md)
- [Internationalization](./docs/09-i18n.md)
- [API Integration](./docs/10-api.md)
- [Git Workflow](./docs/13-git-workflow.md)
- [Deployment](./docs/16-deployment.md)

---

## 🔐 Environment Variables

Create `.env` file from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BACKEND_BASE_URL=http://localhost:8080
```

---

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

Output in `dist/` folder. Deploy to Vercel, Netlify, or other hosting platforms.

---

## 👨‍💻 Author

**Lê Công Hùng**

- 📧 Email: [hungcl.dev@gmail.com](mailto:hungcl.dev@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/hungcl](https://www.linkedin.com/in/hungcl)
- 🐙 GitHub: [@hugn2k4](https://github.com/hugn2k4)
- 📂 Repository: [siupo-frontend](https://github.com/hugn2k4/siupo-frontend)

---

## 📞 Contact

For questions or feedback about the project, please create an [Issue](https://github.com/hugn2k4/siupo-frontend/issues) on GitHub.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for graduation project

</div>
