# SPK Pemilihan Laptop Bekas (SMART)

Sistem Pendukung Keputusan (SPK) berbasis web untuk membantu proses pemilihan laptop bekas menggunakan metode **SMART (Simple Multi Attribute Rating Technique)**.

Project ini dikembangkan untuk membantu calon pembeli mendapatkan rekomendasi laptop bekas terbaik secara:

- Objektif
- Konsisten
- Transparan
- Efisien

---

# SMART Method

Metode SMART digunakan untuk menghitung nilai akhir setiap alternatif laptop berdasarkan bobot kriteria tertentu.

## Tahapan SMART

1. Menentukan kriteria
2. Menentukan bobot kriteria
3. Normalisasi bobot
4. Menghitung utility value
5. Menghitung skor akhir
6. Melakukan ranking

---

# Criteria

| Criteria       | Weight |
| -------------- | ------ |
| Harga          | 40%    |
| Performa       | 30%    |
| Kondisi Fisik  | 15%    |
| Usia Pemakaian | 15%    |

**Catatan: Kriteria yang digunakan bisa disesuaikan sesuai kebutuhan**

---

# Tech Stack

## Frontend

- Next.js 16
- TypeScript
- Tailwind CSS

## Backend

- Express.js
- TypeScript
- MongoDB

## Validation

- Joi

## Authentication

- JWT Authentication

---

# Architecture

Project menggunakan arsitektur layered:

```txt
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

## Principles

- Clean Architecture
- Separation of Concerns
- SOLID Principle
- Stateless SMART Engine
- Reusable Components
- Type-safe Development

---

# Project Structure

## Frontend

Feature-Based + Clean Architecture

```txt
my-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Route groups
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── users/
│   │   │   └── products/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── global-error.tsx
│   │
│   ├── features/                     # ⭐ Feature modules (DOMAIN-DRIVEN)
│   │   ├── auth/
│   │   │   ├── components/           # Komponen khusus feature
│   │   │   │   ├── LoginForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   ├── services/             # API calls
│   │   │   │   └── auth.service.ts
│   │   │   ├── stores/               # State management
│   │   │   │   └── auth.store.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   ├── schemas/              # Zod validation
│   │   │   │   └── auth.schema.ts
│   │   │
│   │   ├── users/
│   │   │   └── ...(struktur sama)
│   │   └── products/
│   │       └── ...(struktur sama)
│   │
│   ├── components/                   # Shared/Global components
│   │   ├── ui/                       # Primitives (Button, Input, dll)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   └── index.ts
│   │   │   └── Input/
│   │   ├── layouts/                  # Layout components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   └── Footer/
│   │   └── common/                   # Reusable composite components
│   │       ├── DataTable/
│   │       └── Modal/
│   │
│   ├── lib/                          # Third-party configurations
│   │   ├── axios.ts                  # HTTP client setup
│   │   ├── react-query.ts            # Query client
│   │   ├── auth.ts                   # NextAuth config
│   │   └── db.ts                     # Database client (Prisma, dll)
│   │
│   ├── hooks/                        # Global shared hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── utils/                        # Pure utility functions
│   │   ├── formatters/
│   │   │   ├── date.ts
│   │   │   ├── currency.ts
│   │   │   └── date.test.ts
│   │   ├── validators/
│   │   └── helpers/
│   │
│   ├── constants/                    # App constants
│   │   ├── routes.ts
│   │   ├── api-endpoints.ts
│   │   └── config.ts
│   │
│   ├── types/                        # Global TypeScript types
│   │   ├── api.types.ts
│   │   ├── common.types.ts
│   │   └── env.d.ts
│   │
│   ├── styles/                       # Global styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   │
│   ├── config/                       # App configuration
│   │   ├── env.ts                    # Validated env vars
│   │   └── site.config.ts
│   │
│   ├── providers/                    # React context providers
│   │   ├── QueryProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── AuthProvider.tsx
│   │
│   └── middleware.ts                 # Next.js middleware
│
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── jest.config.ts
├── playwright.config.ts
└── package.json

```

## Backend

layer structure (controller, service, repository)

```txt
backend/
├── src/
│
│   ├── app.ts
│   │   # Entry point aplikasi Express.
│   │   # Bertugas menginisialisasi middleware global,
│   │   # routing utama, koneksi database, dan bootstrap server.
│
│   ├── config/
│   │   ├── env.ts
│   │   │   # Loader dan validator environment variables.
│   │   │   # Menyimpan konfigurasi seperti:
│   │   │   # PORT, DATABASE_URL, JWT_SECRET, dll.
│   │   │
│   │   ├── database.ts
│   │   │   # Konfigurasi koneksi database.
│   │   │   # Contoh: MongoDB connection, pooling, transaction setup.
│   │   │
│   │   └── logger.ts
│   │       # Konfigurasi logging aplikasi.
│   │       # Digunakan untuk logging request, error, dan activity system.
│
│   ├── common/
│   │   # Shared layer yang dapat digunakan seluruh module.
│   │
│   │   ├── error/
│   │   │   ├── AppError.ts
│   │   │   │   # Base custom error untuk standardisasi error aplikasi.
│   │   │   │
│   │   │   ├── error-handler.ts
│   │   │   │   # Global error handling middleware Express.
│   │   │   │
│   │   │   └── error-code.ts
│   │   │       # Kumpulan kode error agar konsisten di seluruh sistem.
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   │   # Middleware autentikasi JWT/session.
│   │   │   │
│   │   │   ├── role.middleware.ts
│   │   │   │   # Middleware authorization berbasis role.
│   │   │   │
│   │   │   ├── validation.middleware.ts
│   │   │   │   # Middleware validasi request body/query/params.
│   │   │   │
│   │   │   └── request-logger.middleware.ts
│   │   │       # Middleware logging request API.
│   │   │
│   │   ├── utils/
│   │   │   ├── response.ts
│   │   │   │   # Helper standard response API.
│   │   │   │
│   │   │   ├── pagination.ts
│   │   │   │   # Utility pagination untuk query list data.
│   │   │   │
│   │   │   ├── date.ts
│   │   │   │   # Helper manipulasi dan formatting tanggal.
│   │   │   │
│   │   │   └── hash.ts
│   │   │       # Utility hashing password/token.
│   │   │
│   │   ├── constants/
│   │   │   # Konstanta global aplikasi.
│   │   │
│   │   └── types/
│   │       # Shared TypeScript types/interfaces.
│
│   ├── modules/
│   │   # Setiap business domain dipisahkan menjadi module independen.
│   │   # Contoh: auth, user, member, subscription, payment, attendance.
│   │
│   │   ├── auth/
│   │   │   ├── controller/
│   │   │   │   └── auth.controller.ts
│   │   │   │       # Layer HTTP handling.
│   │   │   │       # Bertugas menerima request dan mengirim response.
│   │   │   │       # Tidak berisi business logic.
│   │   │   │
│   │   │   ├── service/
│   │   │   │   └── auth.service.ts
│   │   │   │       # Business logic layer.
│   │   │   │       # Mengatur flow login, register, token validation, dll.
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   └── auth.repository.ts
│   │   │   │       # Data access layer.
│   │   │   │       # Bertugas berinteraksi langsung dengan database.
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   └── login.dto.ts
│   │   │   │       # Data Transfer Object untuk validasi payload request.
│   │   │   │
│   │   │   ├── validation/
│   │   │   │   └── auth.validation.ts
│   │   │   │       # Schema validasi request.
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   └── auth.route.ts
│   │   │   │       # Routing endpoint module auth.
│   │   │   │
│   │   │   ├── types/
│   │   │   │   # Type/interface khusus module auth.
│   │   │   │
│   │   │   └── index.ts
│   │   │       # Export module auth.
│   │   │
│   │   ├── user/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── dto/
│   │   │   ├── validation/
│   │   │   ├── routes/
│   │   │   └── index.ts
│   │   │
│   │   ├── member/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── dto/
│   │   │   ├── validation/
│   │   │   ├── routes/
│   │   │   └── index.ts
│   │   │
│   │   └── ...
│   │
│   ├── routes/
│   │   └── index.ts
│   │       # Registrasi seluruh route module ke aplikasi utama.
│   │
│   ├── database/
│   │   ├── models/
│   │   │   # Schema/model database.
│   │   │
│   │   ├── migrations/
│   │   │   # File migration database.
│   │   │
│   │   └── seeders/
│   │       # Seeder data awal aplikasi.
│   │
│   └── tests/
│       ├── unit/
│       │   # Unit testing service dan utility.
│       │
│       ├── integration/
│       │   # Integration testing API/database.
│       │
│       └── e2e/
│           # End-to-end testing flow aplikasi.
│
├── .env
│   # Environment variables.
│
├── package.json
│   # Dependency dan script project.
│
├── tsconfig.json
│   # Konfigurasi TypeScript.
│
└── README.md
    # Dokumentasi project backend.
```

---

# Non Functional Requirements

## Performance

- Response time < 2 seconds

## Security

- JWT Authentication
- Input validation
- Protected routes

## Usability

- Simple UI
- Easy to use
- Responsive design

## Scalability

- Support large laptop dataset

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# 🔧 Frontend Setup

```bash
cd frontend
npm install
```

## Run Development

```bash
npm run dev
```

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

## Environment Variables

Create `.env`

```env
PORT=5000

MONGO_URI=mongouriexample

JWT_SECRET=jwtexample

CLIENT_URL=http://localhost:3000
```

## Run Development

```bash
npm run dev
```

---

# API Example

## Get Recommendations

```http
GET /api/recommendations
```

## Create Laptop

```http
POST /api/laptops
```

---

# Engineering Notes

## SMART Engine Rules

- Pure function
- Stateless
- Testable
- Independent from framework

## Coding Standards

- ESLint
- Prettier
- Strict TypeScript

---

# Author

**Muhammad Aidil**  
Full Stack Developer

---

# 📄 License

This project is for educational and research purposes.
