# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Sistem Pendukung Keputusan (SPK) for used laptops using the SMART method. Express + TypeScript backend with MongoDB.

## Commands

```bash
npm run dev          # Start dev server (tsx watch, NODE_ENV=development)
npm run build        # Compile TS → dist/ (rimraf + tsc + tsc-alias)
npm start            # Run compiled build (NODE_ENV=production)
npm run lint         # ESLint on src/**/*.ts

# Seeders
npm run seed:admin          # Seed default admin user
npm run seed:admin:clear    # Clear admin users (dev only)
npm run seed:criteria:up    # Seed criteria data
npm run seed:criteria:down  # Remove criteria data
```

No test framework configured.

## Architecture

Layered: **Controller → Service → Repository → Model**

Each feature is a self-contained module under `src/modules/{feature}/` containing:
- `*.route.ts` — registers Express routes + middleware chain
- `*.controller.ts` — parses request, calls service, sends response
- `*.service.ts` — business logic
- `*.repository.ts` — DB queries via Mongoose
- `*.model.ts` — Mongoose schema + model
- `*.type.ts` — TypeScript interfaces/types
- `*.validation.ts` — Joi schemas

Current modules: `auth`, `criteria`, `users`, `laptops`, `calculation`

## Key Patterns

**Async error handling:** All route handlers wrapped with `asyncHandler` middleware — no try/catch in controllers.

**Error system:** Throw `AppError(message, statusCode, code)` from any layer. `errorMiddleware` catches globally. HTTP codes and error codes defined in `src/common/error/http.ts`.

**Validation:** `validate(JoiSchema)` middleware runs before controllers. Returns `400` with `{ errors: { field: message } }` on failure. `abortEarly: false` — validates all fields. Error messages are in Indonesian.

**Auth flow:**
1. `authenticate` middleware extracts JWT from `Authorization` header or `accessToken` cookie
2. Attaches decoded payload `{ sub, username, role }` to `req.user`
3. `authorize(...roles)` middleware guards role-restricted routes

**Response shape:** All responses use `ApiResponse<T>` type: `{ success, message, data?, meta? }`

**Criteria weight invariant:** Sum of all active criteria weights must not exceed 1.0. Validated in service layer on create and update.

**SMART calculation** (`GET /api/v1/calculation`): Fetches active criteria + active laptops, normalizes weights, computes utility per criterion, returns ranked alternatives. Supported criterion names (matched by lowercase): `harga`, `performa`, `kondisi` (alias: `kondisi fisik`), `umur` (alias: `usia penggunaan`). The `performa` criterion is composite (average of 4 sub-utilities: processor_score, gpu_score, ram, storage — each min-max normalized). `kondisi`/`kondisi fisik` uses absolute scale (condition 1–5 → 0–100%). All other criteria use relative min-max normalization with direction from the criterion's `type` field (benefit/cost).

**Laptop fields for SMART:** `price` (harga), `processor_score` + `gpu_score` + `ram` + `storage` (performa), `condition` 1–5 (kondisi fisik), `age_months` (usia penggunaan). Benchmark scores sourced from cpubenchmark.net / videocardbenchmark.net.

## Environment

Loads `.env` then `.env.{NODE_ENV}` — development config in `.env.development`.

Required vars: `PORT`, `MONGO_URI`, `URL`, `CLIENT_URL`, `JWT_SECRET_KEY`, `JWT_REFRESH_TOKEN_KEY`, `JWT_EXPIRES_IN`

Default dev DB: `mongodb://localhost:27017/spk-laptop-dev`

Default admin seed: `admin@laptopinhil.com` / `admin@123456`

Seed laptop (20 data): `npm run seed:laptop:up` / `npm run seed:laptop:down`

## Path Aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`, resolved at build time via `tsc-alias`).
