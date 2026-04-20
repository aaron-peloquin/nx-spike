# experiment-nx

Full-stack Nx monorepo with **Next.js**, **FastAPI**, and a shared **React component library** — all orchestrated with Docker for production.

## Architecture

```
apps/
├── nextjs/        → Next.js 16 (App Router, port 3000)
└── python/        → FastAPI service (port 8000)

packages/
└── components/    → Shared React components (zero-build in dev)
```

| Layer | Tech | Purpose |
|---|---|---|
| Frontend | Next.js 16 | App Router, route handlers, SSR |
| API Proxy | `apps/nextjs/src/app/api/hello/route.ts` | Proxies browser requests to FastAPI |
| Backend | FastAPI + Uvicorn | Python service with `/hello` endpoint |
| Shared UI | `@experiment-nx/components` | React components consumed by Next.js |
| Orchestration | Nx 22 | Task graph, caching, monorepo tooling |
| Production | Docker Compose | Container-based prod deployment |

---

## Prerequisites

- **Node.js** ≥ 22
- **pnpm** ≥ 9 (`corepack enable && corepack prepare pnpm@latest --activate`)
- **Python** ≥ 3.12
- **Docker** (for production builds / `serveprod`)

---

## Getting Started

### 1. Install JS Dependencies

```bash
pnpm install
```

### 2. Set Up Python Virtual Environment

```bash
cd apps/python
python -m venv .venv

# Windows
.\.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
cd ../..
```

### 3. Start Local Development

One command boots **both** Next.js and FastAPI in parallel:

```bash
pnpm dev
```

| Service | URL |
|---|---|
| Next.js | [http://localhost:3000](http://localhost:3000) |
| FastAPI | [http://localhost:8000](http://localhost:8000) |
| API Docs | [http://localhost:8000/docs](http://localhost:8000/docs) |

The `components` package requires **no build** for local development — Next.js compiles it on-the-fly via `transpilePackages`.

---

## Project Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start both Next.js + FastAPI dev servers |
| `pnpm build` | Build Docker images for both services |
| `pnpm serveprod` | Build & run production Docker containers |
| `npx nx build nextjs` | Build the Next.js app (standalone output) |
| `npx nx serve python` | Start the FastAPI dev server |
| `npx nx graph` | Visualize the project dependency graph |

---

## Production (Docker)

Build and launch both services in Docker containers:

```bash
pnpm serveprod
```

This runs `docker compose up --build`, which:
1. Builds the FastAPI image (`experiment-nx-python`)
2. Builds the Next.js image (`experiment-nx-nextjs`) with standalone output
3. Starts both containers with the correct networking
4. Next.js connects to FastAPI via internal Docker DNS (`http://python:8000`)

---

## How It Works

### Shared Components (Zero-Build Dev)

The `packages/components` library exports raw TypeScript + JSX source. In development, Next.js compiles it directly using `transpilePackages` in `next.config.js`. No watch process or intermediate build step is needed for the component library.

At build time, the Next.js build compiles the components package as part of the app bundle.

### API Proxy Pattern

The browser component (`HelloButton`) calls `/api/hello` on the same origin. The Next.js route handler (`route.ts`) proxies this request to the FastAPI backend. This avoids CORS issues and decouples the browser from the Python service URL.

```
Browser → /api/hello (Next.js) → http://localhost:8000/hello (FastAPI)
```
