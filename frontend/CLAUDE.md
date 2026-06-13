# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server (localhost:3000)
npm run build     # production build
npm run lint      # eslint check
```

No test suite configured.

## Environment Variables

Two required vars — create `.env.local`:

```
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api
```

Both are read at runtime in `src/constant/env.constan.ts` and will throw if missing.

## Architecture

**Next.js 16.2.5 + React 19** — non-standard versions with breaking changes. Read `node_modules/next/dist/docs/` before writing Next.js-specific code.

**Tailwind v4** — breaking changes from v3. Config via `postcss.config.mjs`, no `tailwind.config.js`.

### Route Groups

```
src/app/
  (admin)/        # authenticated admin pages, uses AdminSidebar + AdminTopbar layout
  (public)/       # unauthenticated public pages, uses Navbar + Footer layout
  auth/           # login page, centered card layout
```

### Feature Modules

`src/features/<domain>/` structure:
- `components/view/` — page-level components, imported by `app/` pages
- `components/ui/` — domain-specific form/table components
- `schemas/` — Zod schemas + inferred DTOs
- `services/` — HTTP calls for this domain (thin adapter, no business logic)
- `actions/` — Server Actions (use-case layer: validate → call service → handle side effects)

Shared UI (Button, Input, etc.) is in `src/components/`. Domain features do not import from other feature folders.

### API Integration Flow

```
HTTP GET (read):
  page.tsx (Server Component)
    └─ service.getX()           ← calls publicApi/privateApi
         └─ returns Result<T>   ← pass data as props to View component

Mutation (create/update/delete):
  'use client' component
    └─ calls server action
          ├─ validate input (Zod schema)
          ├─ service.mutateX()  ← calls publicApi/privateApi
          └─ handle Result<T>   → return error to client OR redirect/revalidate
```

**Service** = thin HTTP adapter. Only knows URL, method, and `Result<T>` shape. No validation, no redirects, no cookies.

**Server Action** = use-case layer. Owns: Zod validation, calling service, cookie/session side effects, redirect after success. Business logic lives here, not in service.

Example file layout for a domain:
```
src/features/criteria/
  actions/
    criteria.action.ts      # 'use server' — createCriteria, updateCriteria, deleteCriteria
  services/
    criteria.service.ts     # getCriteriaList, getCriteriaById, postCriteria, putCriteria, deleteCriteria
  schemas/
    criteria.schema.ts      # Zod schema + CriteriaDTO type
  components/
    view/AdminCriteriaView.tsx
    ui/CriteriaTable.tsx
```

### HTTP Client

`src/lib/http/client.ts` exports two Axios instances:

- `publicApi` — no auth header, for public endpoints
- `privateApi` — reads `accessToken` cookie and injects `Authorization: Bearer <token>` via request interceptor

Both return `Result<T>` (defined in `src/lib/http/types.ts`) — never throw, always return `{ success: true, data }` or `{ success: false, error }`. Check `result.success` before accessing data.

### Types

- `src/types/` — shared domain interfaces (`ICriteria`, `ILaptop`, etc.)
- `src/features/<domain>/schemas/` — Zod schemas with inferred DTO types
- `src/lib/http/types.ts` — `ApiResponse<T>`, `ApiError`, `Result<T>`

### Path Alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`).
