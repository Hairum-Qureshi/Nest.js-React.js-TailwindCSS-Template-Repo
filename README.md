**NestJS + React + Vite + Tailwind + Turbo Template**

This repository is a **full-stack monorepo template** using **npm workspaces** and **Turborepo** to manage a React frontend and a NestJS backend in a single repository.

The goal of this template is to provide:

- A minimal but correct monorepo setup
- Clear separation of frontend and backend concerns
- Centralized dependency management
- Coordinated development scripts without over-engineering

This is a **template**, not a production-ready system.

---

## Repository Structure

```
.
├── apps/
│   ├── backend/          # NestJS backend application
│   └── frontend/         # React + Vite + Tailwind frontend
├── packages/             # Optional shared packages (empty by default)
├── package.json          # Root workspace + Turbo configuration
├── package-lock.json     # Single lockfile for the entire monorepo
├── turbo.json            # Turbo task pipeline
└── README.md
```

### Key Structural Notes

- This **is a monorepo**
- Dependency management is centralized at the **root**
- Each app remains a **standalone project**
- No code is shared by default
- Shared packages are optional, not assumed

---

## Tech Stack

### Backend (`apps/backend`)

- NestJS
- TypeScript
- Basic “Hello World” API

### Frontend (`apps/frontend`)

- React
- Vite
- TailwindCSS
- TypeScript

### Tooling

- npm workspaces (monorepo management)
- Turborepo (task orchestration and caching)

---

## Prerequisites

You need:

- Node.js (LTS recommended)
- npm (v7+ required for workspaces)

---

## Installation

From the **repository root**:

```bash
npm install
```

This installs dependencies for **all workspace packages** and generates a **single `package-lock.json`**.

Do not run `npm install` inside individual apps.

---

## Configure ENV Variables:
Create a .env file in the `apps/backend` directory and add the following:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Variable Descriptions:

`PORT`
The port on which the backend server will run.

`FRONTEND_URL`
The URL of the frontend application.
Used for CORS configuration and client–server communication during development.

---

## Development

Run all development servers concurrently:

```bash
npm run dev
```

This command:

- Uses Turbo to run the `dev` script in each app
- Starts the NestJS backend
- Starts the Vite frontend
- Streams logs with app prefixes

### Default Ports

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

---

## Building the Project

To build all apps:

```bash
npm run build
```

Turbo will:

- Run builds in the correct order
- Cache outputs for faster rebuilds
- Skip unchanged packages when possible

---

## Linting

To lint all packages:

```bash
npm run lint
```

Each app is responsible for defining its own lint configuration.

---

## App Independence

Even though this is a monorepo:

- Frontend and backend **do not depend on each other**
- They can be deployed independently
- They can be developed in isolation
- No API client or shared types are included by default

If you want frontend ↔ backend communication, you must:

- Configure CORS in the backend
- Add environment variables in the frontend
- Implement API calls manually

This is intentional.

---

## Turbo Configuration

Turbo is configured via `turbo.json` and operates on **script names**, not commands.

If an app does not define a script (e.g. `dev`, `build`, `lint`), Turbo will skip it.

Turbo is used only for:

- Task orchestration
- Caching
- Parallel execution

It does not manage dependencies or enforce architecture.
