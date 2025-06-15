# Fullstack Integrated Admin Dashboard

A modern, full-stack admin dashboard built with Next.js, NestJS, and Material-UI. This project provides a comprehensive solution for user management, role-based access control, and menu configuration.

## Features

- **User Management**

  - Create, read, update, and delete users
  - Role assignment
  - Password management
  - User status tracking

- **Role Management**

  - Role-based access control (RBAC)
  - Custom role creation
  - Menu permission assignment
  - Role hierarchy support

- **Menu Configuration**

  - Dynamic menu management
  - Menu hierarchy support
  - Icon customization
  - URL and path configuration
  - Show/hide menu items

- **Modern UI/UX**
  - Material-UI components
  - Responsive design
  - Dark/Light theme support
  - Loading states and animations
  - Form validation

## Tech Stack

### Frontend

- Next.js 14
- Material-UI (MUI)
- TypeScript
- React Query
- Tailwind CSS

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- JWT Authentication

## Project Structure

```
fullstack-integrated/
├── apps/
│   ├── admin-client/     # Next.js frontend application
│   └── admin-server/     # NestJS backend application
├── packages/
│   └── shared/          # Shared utilities and types
└── docker/              # Docker configuration files
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Docker (optional)

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

## Development

### Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all applications
- `pnpm test` - Run tests
- `pnpm lint` - Run linting
- `pnpm format` - Format code

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## API Documentation

The API documentation is available at `/api/docs` when running the backend server. It provides detailed information about all available endpoints, request/response schemas, and authentication requirements.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Material-UI](https://mui.com/)
- [Prisma](https://www.prisma.io/)
