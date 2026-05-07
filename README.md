#SPK Pemilihan Laptop Bekas (SMART)

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

feature structure

```txt
frontend/
├── app/
├── components/
├── features/
├── services/
├── hooks/
├── types/
├── lib/
└── utils/
```

## Backend

layer structure (controller, service, repository)

```txt
backend/
├── src/
│   ├── common/
│   │   ├── error/
│   │   ├── middleware/
│   │   └── utils/
│   ├── config/
│   │   └── env.ts
│   ├── modules/
│   │   ├── */**
│   └── app.ts
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
