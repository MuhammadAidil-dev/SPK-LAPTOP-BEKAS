# Fitur Pembanding Laptop — Panduan Penggunaan

## Overview

Fitur pembanding memungkinkan user membandingkan beberapa laptop pilihan dengan metode SMART. User bisa memilih laptop yang ingin dibandingkan (disimpan di localStorage/sessionStorage frontend), lalu sistem menghitung ranking hanya untuk laptop-laptop tersebut.

Perbedaan dengan perhitungan default:

| Aspek | Default (`GET /calculation`) | Pembanding (`POST /calculation/compare`) |
|-------|------------------------------|------------------------------------------|
| Laptop yang dihitung | Semua laptop aktif | Hanya laptop yang dipilih user |
| Normalisasi min-max | Dari semua laptop di DB | Dari laptop yang dipilih saja |
| Jumlah ranking | N laptop | N laptop yang dipilih |

---

## Endpoint

```
POST /api/v1/calculation/compare
Content-Type: application/json
Authorization: (tidak diperlukan — PUBLIC)
```

## Request Body

```json
{
  "laptop_ids": [
    "664a1f77bcf86cd799439011",
    "664a191e810c19729de860ea",
    "664a1f77bcf86cd799439abc"
  ]
}
```

### Aturan Validasi

| Field | Aturan | Pesan Error |
|-------|--------|-------------|
| `laptop_ids` | Wajib ada | `laptop_ids wajib diisi` |
| `laptop_ids` | Harus array | `laptop_ids harus berupa array` |
| `laptop_ids` | Minimal 1 item | `Minimal pilih 1 laptop untuk dibandingkan` |
| Setiap ID | Format MongoDB ObjectId valid | `Format ID laptop tidak valid` |

---

## Response

### Success (200)

```json
{
  "success": true,
  "message": "Perhitungan SMART perbandingan berhasil",
  "data": {
    "total_laptops": 3,
    "total_criteria": 4,
    "rankings": [
      {
        "rank": 1,
        "laptop_id": "664a1f77bcf86cd799439011",
        "name": "ASUS ROG Strix G15",
        "brand": "ASUS",
        "price": 15000000,
        "final_score": 85.67,
        "criteria": [
          {
            "name": "Harga",
            "weight": 0.3,
            "normalized_weight": 0.3,
            "utility": 75.5,
            "weighted_score": 22.65
          },
          {
            "name": "Performa",
            "weight": 0.3,
            "normalized_weight": 0.3,
            "utility": 90.0,
            "weighted_score": 27.0
          },
          {
            "name": "Kondisi Fisik",
            "weight": 0.2,
            "normalized_weight": 0.2,
            "utility": 100.0,
            "weighted_score": 20.0
          },
          {
            "name": "Umur",
            "weight": 0.2,
            "normalized_weight": 0.2,
            "utility": 80.0,
            "weighted_score": 16.0
          }
        ]
      }
    ]
  }
}
```

### Error Response Examples

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "code": "VALIDATION_ERROR",
  "errors": {
    "laptop_ids": "laptop_ids wajib diisi"
  }
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Laptop dengan ID 664a000000000000000000000 tidak ditemukan atau tidak aktif",
  "code": "NOT_FOUND"
}
```

**Multiple IDs Not Found (404):**
```json
{
  "success": false,
  "message": "Laptop dengan ID 664a000000000000000000000, 664a111111111111111111111 tidak ditemukan atau tidak aktif",
  "code": "NOT_FOUND"
}
```

**No Active Criteria (400):**
```json
{
  "success": false,
  "message": "Tidak ada kriteria aktif untuk perhitungan",
  "code": "BAD_REQUEST"
}
```

---

## Alur Perhitungan SMART

1. **Fetch data** — ambil semua kriteria aktif + laptop yang ID-nya dikirim user
2. **Validasi** — pastikan kriteria aktif ada, semua ID laptop ditemukan & aktif
3. **Normalisasi bobot** — bobot kriteria dinormalisasi agar total = 1.0
4. **Hitung utility** — setiap laptop dihitung utility per kriterianya (min-max normalization **hanya dari laptop yang dipilih**)
5. **Hitung weighted score** — utility × normalized weight
6. **Ranking** — urutkan berdasarkan total score descending

### Contoh Normalisasi

Jika user pilih 3 laptop dengan harga: Rp 10jt, Rp 15jt, Rp 20jt:

| Laptop | Harga | Utility (cost) |
|--------|-------|-----------------|
| Laptop A | Rp 10jt | (20-10)/(20-10) × 100 = 100 |
| Laptop C | Rp 15jt | (20-15)/(20-10) × 100 = 50 |
| Laptop E | Rp 20jt | (20-20)/(20-10) × 100 = 0 |

> **Catatan:** Utility ini bisa berbeda dengan perhitungan default karena min-max hanya dari 3 laptop, bukan dari semua laptop di database.

### Edge Cases

| Skenario | Perilaku |
|----------|----------|
| **1 laptop saja** | Tetap diproses. Semua utility benefit jadi 100 (min=max), score tergantung absolute criteria (kondisi fisik) |
| **Duplicate IDs** | Otomatis di-deduplicate. `["id1", "id1", "id2"]` → `["id1", "id2"]` |
| **Semua harga sama** | `min=max` → utility 100 untuk semua (tidak ada division by zero) |

---

## Testing dengan cURL

### Prasyarat

```bash
# Seed laptop data (20 laptop sample)
npm run seed:laptop:up

# Pastikan ada kriteria aktif
npm run seed:criteria:up

# Start server
npm run dev
```

### Test Cases

```bash
# 1. HAPPY PATH — Bandingkan 3 laptop
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["ID1", "ID2", "ID3"]}'
# Expected: 200, 3 laptop diranking

# 2. VALIDASI — Array kosong
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": []}'
# Expected: 400, "Minimal pilih 1 laptop"

# 3. VALIDASI — Field tidak ada
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{}'
# Expected: 400, "laptop_ids wajib diisi"

# 4. VALIDASI — Bukan array
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": "string"}'
# Expected: 400, "laptop_ids harus berupa array"

# 5. NOT FOUND — ID tidak valid
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["000000000000000000000000"]}'
# Expected: 404, "tidak ditemukan atau tidak aktif"

# 6. EDGE CASE — 1 laptop saja
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["VALID_ID"]}'
# Expected: 200, 1 laptop rank 1

# 7. EDGE CASE — Duplicate IDs
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["VALID_ID", "VALID_ID"]}'
# Expected: 200, 1 laptop saja (di-deduplicate)
```

---

## Integrasi Frontend

### State Management (localStorage)

```typescript
// Tambah laptop ke perbandingan
function addToCompare(laptopId: string): void {
  const current = JSON.parse(
    localStorage.getItem('compare_ids') || '[]'
  );
  if (!current.includes(laptopId)) {
    current.push(laptopId);
    localStorage.setItem('compare_ids', JSON.stringify(current));
  }
}

// Hapus laptop dari perbandingan
function removeFromCompare(laptopId: string): void {
  const current = JSON.parse(
    localStorage.getItem('compare_ids') || '[]'
  );
  const updated = current.filter((id: string) => id !== laptopId);
  localStorage.setItem('compare_ids', JSON.stringify(updated));
}

// Reset semua pilihan
function resetCompare(): void {
  localStorage.removeItem('compare_ids');
}

// Ambil daftar ID yang dipilih
function getCompareIds(): string[] {
  return JSON.parse(localStorage.getItem('compare_ids') || '[]');
}
```

### Memanggil API

```typescript
async function getComparisonResult(): Promise<void> {
  const laptopIds = getCompareIds();

  let response;

  if (laptopIds.length > 0) {
    // Ada laptop dipilih → panggil endpoint compare
    response = await fetch('/api/v1/calculation/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ laptop_ids: laptopIds }),
    });
  } else {
    // Tidak ada → fallback ke perhitungan default
    response = await fetch('/api/v1/calculation');
  }

  const result = await response.json();
  // Tampilkan result.data.rankings ke user
}
```

### Tips

1. **Simpan di localStorage** agar tidak hilang saat refresh, tapi tidak perlu dikirim ke server tiap request
2. **Tombol Reset** — panggil `resetCompare()` lalu trigger ulang perhitungan
3. **Badge counter** — tampilkan jumlah laptop yang dipilih di UI (misal: "Bandingkan (3)")
4. **Min-max normalization berbeda** — beri tahu user bahwa ranking compare bisa berbeda dengan ranking default karena normalisasi hanya dari laptop yang dipilih

---

## Troubleshooting

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| `MongoDB connection error` | Server tidak bisa konek DB | Jalankan MongoDB terlebih dahulu |
| `Tidak ada kriteria aktif` | Belum seed criteria | `npm run seed:criteria:up` |
| Semua laptop score 100 | Harga/spesifikasi semua sama | Normal — min=max → utility 100 |
| Score compare berbeda dengan default | Normalisasi dari dataset berbeda | Ini expected behavior |
