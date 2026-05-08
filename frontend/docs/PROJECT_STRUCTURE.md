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
