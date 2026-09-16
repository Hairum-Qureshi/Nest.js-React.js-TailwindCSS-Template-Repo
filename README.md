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
├── packages/
│   └── shared/            # Shared TypeScript interfaces and types
├── package.json          # Root workspace + Turbo configuration
├── package-lock.json     # Single lockfile for the entire monorepo
├── turbo.json            # Turbo task pipeline
└── README.md
```

### Key Structural Notes

- This **is a monorepo**
- Dependency management is centralized at the **root**
- Each app remains a **standalone project**
- Shared code belongs in `packages/*`
- Both apps can consume `@repo/shared` through the npm workspace

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

### Shared package (`packages/shared`)

The shared package is the contract layer between the frontend and backend. It currently exports the `GreetingResponse` interface from `packages/shared/src/types/greeting.ts`:

```ts
export interface GreetingResponse {
	greeting: string;
	timestamp: string;
}
```

Add shared interfaces, type aliases, enums, and other platform-neutral contracts under `packages/shared/src`. Re-export each public type from `packages/shared/src/index.ts` so both applications have a stable import path.

For example:

```ts
import type { GreetingResponse } from "@repo/shared";
```

The backend can use the type for controller and service responses, and the frontend can use the same type for API response handling. Types are erased at runtime, so this package does not replace request validation or API runtime serialization. Validate untrusted input in the backend and keep browser-only or server-only implementation details in their respective app.

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

## Environment Variables

Each app has an `.env.example` file that documents its local environment configuration. Copy the example for the app you are running, then update the local `.env` file as needed:

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

Do not commit `.env` files or secrets. The example files are safe templates; the frontend example is currently empty because the frontend does not read any environment variables yet.

### Backend environment (`apps/backend/.env.example`)

The backend example currently contains:

```env
PORT=4000
```

`PORT` controls the port on which the NestJS server runs. The backend also reads `FRONTEND_URL` for CORS configuration. Add it to `apps/backend/.env` when running the frontend locally:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
```

### Frontend environment (`apps/frontend/.env.example`)

This file is a placeholder for frontend-only configuration. Vite exposes variables to browser code only when their names begin with `VITE_`. For example, if the frontend is later configured with an API base URL, add this to `apps/frontend/.env`:

```env
VITE_API_URL=http://localhost:4000
```

Then read it in frontend code with `import.meta.env.VITE_API_URL`. Never put private credentials or server-only secrets in frontend environment variables, because Vite bundles exposed values into the browser application.

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

Run one workspace independently when needed:

```bash
npm run dev --workspace frontend
npm run dev --workspace backend
```

### Default Ports

- Backend: `http://localhost:4000`
- Frontend: `http://localhost:5173`

---

## Sharing Interfaces and Types

1. Create a type in `packages/shared/src`, for example `packages/shared/src/types/user.ts`.
2. Export it from `packages/shared/src/index.ts`:

   ```ts
   export type { User } from "./types/user";
   ```

3. Import it from either app:

   ```ts
   import type { User } from "@repo/shared";
   ```

Because `packages/shared` is included in the root npm workspaces and listed as a dependency in both app `package.json` files, no relative path or separate package installation is required. Run `npm install` from the repository root after changing workspace dependencies.

Keep shared definitions focused on data contracts. Do not import NestJS, React, browser APIs, or Node-only modules into the shared package. When an API contract changes, update the shared type and the backend/frontend consumers in the same change, then run the build and lint checks.

---

## App Independence and API Communication

Even though this is a monorepo:

- Frontend and backend **do not depend directly on each other**
- They can be deployed independently
- They can be developed in isolation
- Shared API contracts are available through `@repo/shared`

If you want frontend ↔ backend communication, you must:

- Configure CORS in the backend
- Add environment variables in the frontend
- Implement API calls manually

This keeps the apps independent while allowing their request and response shapes to stay aligned. The shared package does not create API calls or a client automatically; use `fetch`, Axios, or another client in the frontend and configure the backend's CORS settings as needed.