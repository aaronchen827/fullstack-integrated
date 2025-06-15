# Fullstack Integrated Admin Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Dashboard-blue?style=for-the-badge)](https://fullstack-integrated-admin-client.vercel.app/dashboard)
[![API Docs](https://img.shields.io/badge/API%20Docs-Swagger-orange?style=for-the-badge)](https://truthful-insight-production.up.railway.app/api-docs)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A modern, full-stack admin dashboard built with Next.js, NestJS, and Material-UI. This project demonstrates my fullstack engineering skills and best practices in building scalable, maintainable applications.

## 🚀 Live Demo

- **Frontend Dashboard:** [https://fullstack-integrated-admin-client.vercel.app/dashboard](https://fullstack-integrated-admin-client.vercel.app/dashboard)
- **API Documentation:** [https://truthful-insight-production.up.railway.app/api-docs](https://truthful-insight-production.up.railway.app/api-docs)

## 🎯 Project Highlights

- **Monorepo Architecture**: Managed with Turborepo and pnpm workspaces
- **Type-Safe Development**: Full TypeScript implementation
- **Modern Frontend**: Next.js 14 with Material-UI and React Query
- **Robust Backend**: NestJS with Prisma ORM and PostgreSQL
- **Production Ready**: Dockerized deployment with Vercel
- **Security First**: JWT authentication and role-based access control

## 🏗️ Architecture Overview

```
fullstack-integrated/
├── apps/
│   ├── admin-client/     # Next.js frontend application
│   └── admin-server/     # NestJS backend application
├── packages/
│   └── shared/          # Shared utilities and types
├── docker/              # Docker configuration files
├── turbo.json          # Turborepo configuration
└── pnpm-workspace.yaml # pnpm workspace configuration
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Backend

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI

### Build Tools

- **Package Manager**: pnpm
- **Monorepo**: Turborepo
- **Containerization**: Docker
- **CI/CD**: Vercel

## ✨ Key Features

### User Management

- Create, read, update, and delete users
- Role assignment
- Password management
- User status tracking

### Role Management

- Role-based access control (RBAC)
- Custom role creation
- Menu permission assignment
- Role hierarchy support

### Menu Configuration

- Dynamic menu management
- Menu hierarchy support
- Icon customization
- URL and path configuration
- Show/hide menu items

### Modern UI/UX

- Material-UI components
- Responsive design
- Dark/Light theme support
- Loading states and animations
- Form validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Docker (optional)
- pnpm (v8 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aaronchen827/fullstack-integrated.git
   cd fullstack-integrated
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   # Copy example env files
   cp apps/admin-client/.env.example apps/admin-client/.env
   cp apps/admin-server/.env.example apps/admin-server/.env
   ```

4. Start the development servers:
   ```bash
   # Start both frontend and backend
   pnpm dev
   ```

### Docker Setup

1. Build and start the containers:

   ```bash
   docker-compose up -d
   ```

2. Access the applications:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## 💻 Development

### Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all applications
- `pnpm test` - Run tests
- `pnpm lint` - Run linting
- `pnpm format` - Format code

### Turborepo Features

- **Incremental Builds**: Only rebuild what changed
- **Parallel Execution**: Run tasks in parallel
- **Caching**: Cache build outputs for faster rebuilds
- **Task Dependencies**: Automatically handle task dependencies
- **Remote Caching**: Share build caches across team members

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## 📚 API Documentation

The API documentation is available at `/api-docs` when running the backend server. It provides detailed information about all available endpoints, request/response schemas, and authentication requirements.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Material-UI](https://mui.com/)
- [Prisma](https://www.prisma.io/)
- [Turborepo](https://turbo.build/repo)
