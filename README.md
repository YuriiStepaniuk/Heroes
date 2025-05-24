# Superhero App Monorepo 🦸

This is a monorepo for the **Superhero App**, a fullstack application for managing superheroes — built using **Turborepo**, **React**, **NestJS**, **TypeORM**, **PostgreSQL**, and more.

## 📦 Structure

This Turborepo contains the following apps and packages:

### Apps

- `apps/client` — React frontend built with [React](https://react.dev/)
- `apps/server` — Backend server built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io)

### Packages

- `packages/ui` — Shared UI components (used in `web`)
- `packages/typescript-config`,
- `packages/eslint-config` — Shared `eslint`, `tsconfig`, etc.

## 🚀 Getting Started

Install dependencies with [npm](https://www.npmjs.com/):

```bash
npm install
```

### Run the apps

From the root, navigate to each app and start them:

Before running the apps, create a .env file inside apps/server, apps/client based on the provided .env.example file.

Start the backend (NestJS):

```bash
cd apps/server
npm run start:dev
```

Start the frontend (React):

```bash
cd apps/client
npm run start
```
