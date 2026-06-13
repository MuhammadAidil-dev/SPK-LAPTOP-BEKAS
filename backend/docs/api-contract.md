# API Contract — SPK Laptop Backend

**Base URL (development):** `http://localhost:5000/api/v1`  
**Base URL (production):** `{URL}/api/v1`

---

## Response Envelope

Semua endpoint menggunakan envelope yang sama.

### Success
```json
{
  "success": true,
  "message": "string",
  "data": {} | [] | null,
  "meta": null
}
```

### Error
```json
{
  "success": false,
  "message": "string",
  "code": "ERROR_CODE",
  "errors": null
}
```

### Validation Error (422)
```json
{
  "success": false,
  "message": "Validasi gagal",
  "code": "VALIDATION_ERROR",
  "errors": {
    "field_name": "pesan error"
  }
}
```

---

## Error Codes

| Code | HTTP | Keterangan |
|---|---|---|
| `VALIDATION_ERROR` | 422 | Field tidak lolos validasi — lihat `errors` object |
| `BAD_REQUEST` | 400 | Request tidak valid |
| `UNAUTHORIZED` | 401 | Tidak ada token / token tidak ditemukan |
| `TOKEN_EXPIRED` | 401 | Token sudah kadaluarsa |
| `INVALID_TOKEN` | 401 | Token tidak valid / rusak |
| `FORBIDDEN` | 403 | Tidak punya akses (role tidak sesuai) |
| `NOT_FOUND` | 404 | Resource tidak ditemukan |
| `DUPLICATE_KEY` | 409 | Data duplikat |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Authentication

Endpoint yang membutuhkan autentikasi wajib menyertakan token via salah satu cara:

```
Authorization: Bearer <accessToken>
```
atau cookie `accessToken` (set otomatis setelah login).

---

## Modul: Auth

### POST `/auth/login`

Login admin. Set cookie `accessToken` (httpOnly, 8 jam).

**Access:** Public  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "admin@laptopinhil.com",
  "password": "admin@123456"
}
```

| Field | Type | Validasi |
|---|---|---|
| `email` | string | required, min 3, max 100 |
| `password` | string | required, min 8, max 72 |

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil login",
  "data": {
    "accessToken": "eyJhbGci...",
    "user": {
      "email": "admin@laptopinhil.com",
      "role": "admin"
    }
  },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `VALIDATION_ERROR` 422 | Field tidak lengkap / format salah |
| `NOT_FOUND` 404 | Email tidak ditemukan |
| `UNAUTHORIZED` 401 | Password salah |

---

### POST `/auth/logout`

Logout. Clear cookie `accessToken`.

**Access:** Public (tidak perlu token)

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil logout",
  "data": null,
  "meta": null
}
```

---

## Modul: Criteria

### GET `/criteria`

Ambil semua kriteria.

**Access:** Public

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil mengambil data criteria",
  "data": [
    {
      "_id": "665abc...",
      "name": "harga",
      "type": "cost",
      "weight": 0.4,
      "isActive": true,
      "createdAt": "2026-06-13T00:00:00.000Z",
      "updatedAt": "2026-06-13T00:00:00.000Z"
    }
  ],
  "meta": null
}
```

---

### POST `/criteria/create`

Tambah kriteria baru. Total weight semua kriteria tidak boleh melebihi 1.0.

**Access:** Admin only  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "harga",
  "type": "cost",
  "weight": 0.4
}
```

| Field | Type | Validasi |
|---|---|---|
| `name` | string | required, min 3 |
| `type` | string | required, enum: `benefit` \| `cost` |
| `weight` | number | required, min 0, max 1 |

**Response 201:**
```json
{
  "success": true,
  "message": "Berhasil menambahkan criteria",
  "data": {
    "_id": "665abc...",
    "name": "harga",
    "type": "cost",
    "weight": 0.4,
    "isActive": true,
    "createdAt": "2026-06-13T00:00:00.000Z",
    "updatedAt": "2026-06-13T00:00:00.000Z"
  },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `VALIDATION_ERROR` 422 | Field tidak valid |
| `BAD_REQUEST` 400 | Total weight sudah = 1 / penambahan melebihi 1 |
| `DUPLICATE_KEY` 409 | Nama kriteria sudah ada |

---

### PATCH `/criteria/update/:id`

Update kriteria. Semua field opsional.

**Access:** Admin only  
**Content-Type:** `application/json`

**Request Body (semua opsional):**
```json
{
  "name": "harga",
  "type": "cost",
  "weight": 0.35,
  "isActive": true
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil update criteria",
  "data": { "...kriteria terupdate..." },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `VALIDATION_ERROR` 422 | Field tidak valid |
| `BAD_REQUEST` 400 | Total weight melebihi 1 setelah update |
| `NOT_FOUND` 404 | ID tidak ditemukan |

---

### DELETE `/criteria/delete/:id`

Hapus kriteria.

**Access:** Admin only

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil menghapus criteria",
  "data": { "...kriteria yang dihapus..." },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `NOT_FOUND` 404 | ID tidak ditemukan |

---

## Modul: Laptops

### GET `/laptops`

Ambil semua laptop (aktif + non-aktif).

**Access:** Public

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil mengambil data laptop",
  "data": [
    {
      "_id": "665abc...",
      "name": "TUF Gaming A15 FA506",
      "brand": "ASUS",
      "price": 7800000,
      "processor_score": 13500,
      "gpu_score": 7000,
      "ram": 16,
      "storage": 512,
      "condition": 4,
      "age_months": 20,
      "screen_size": 15.6,
      "battery_life": 5,
      "image": "http://localhost:5000/uploads/1234567890-abc.jpg",
      "isActive": true,
      "createdAt": "2026-06-13T00:00:00.000Z",
      "updatedAt": "2026-06-13T00:00:00.000Z"
    }
  ],
  "meta": null
}
```

---

### GET `/laptops/:id`

Ambil satu laptop berdasarkan ID.

**Access:** Public

**Response 200:** sama dengan item tunggal dari array di atas.

**Error:**
| Code | Kondisi |
|---|---|
| `NOT_FOUND` 404 | ID tidak ditemukan |

---

### POST `/laptops/create`

Tambah laptop baru. Gambar opsional.

**Access:** Admin only  
**Content-Type:** `multipart/form-data`

**Form Fields:**

| Field | Type | Validasi |
|---|---|---|
| `name` | string | required, min 3 |
| `brand` | string | required |
| `price` | number | required, min 0 (IDR) |
| `processor_score` | number | required, min 0 (CPU PassMark benchmark) |
| `gpu_score` | number | required, min 0 (GPU benchmark) |
| `ram` | number | required, min 0 (GB) |
| `storage` | number | required, min 0 (GB) |
| `condition` | integer | required, 1–5 |
| `age_months` | integer | required, min 0 |
| `screen_size` | number | required, min 0 (inci) |
| `battery_life` | number | required, min 0 (jam) |
| `image` | file | opsional, JPEG/PNG/WebP, max 5MB |

**Response 201:**
```json
{
  "success": true,
  "message": "Berhasil menambahkan laptop",
  "data": {
    "_id": "665abc...",
    "name": "TUF Gaming A15 FA506",
    "brand": "ASUS",
    "price": 7800000,
    "processor_score": 13500,
    "gpu_score": 7000,
    "ram": 16,
    "storage": 512,
    "condition": 4,
    "age_months": 20,
    "screen_size": 15.6,
    "battery_life": 5,
    "image": "http://localhost:5000/uploads/1234567890-abc.jpg",
    "isActive": true,
    "createdAt": "2026-06-13T00:00:00.000Z",
    "updatedAt": "2026-06-13T00:00:00.000Z"
  },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `VALIDATION_ERROR` 422 | Field tidak valid |
| `BAD_REQUEST` 400 | Format file salah / ukuran > 5MB |

---

### PATCH `/laptops/update/:id`

Update laptop. Semua field opsional. Kirim `image` file hanya jika ingin mengganti gambar.

**Access:** Admin only  
**Content-Type:** `multipart/form-data`

**Form Fields (semua opsional):**

| Field | Type | Keterangan |
|---|---|---|
| `name` | string | min 3 |
| `brand` | string | |
| `price` | number | min 0 |
| `processor_score` | number | min 0 |
| `gpu_score` | number | min 0 |
| `ram` | number | min 0 |
| `storage` | number | min 0 |
| `condition` | integer | 1–5 |
| `age_months` | integer | min 0 |
| `screen_size` | number | min 0 |
| `battery_life` | number | min 0 |
| `isActive` | boolean | |
| `image` | file | JPEG/PNG/WebP, max 5MB — jika tidak dikirim, gambar lama tetap |

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil memperbarui laptop",
  "data": { "...laptop terupdate..." },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `VALIDATION_ERROR` 422 | Field tidak valid |
| `NOT_FOUND` 404 | ID tidak ditemukan |
| `BAD_REQUEST` 400 | Format file salah / ukuran > 5MB |

---

### DELETE `/laptops/delete/:id`

Hapus laptop.

**Access:** Admin only

**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil menghapus laptop",
  "data": { "...laptop yang dihapus..." },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `NOT_FOUND` 404 | ID tidak ditemukan |

---

## Modul: Calculation

### GET `/calculation`

Jalankan perhitungan SMART dan kembalikan ranking laptop.

**Access:** Public

**Cara kerja:**
1. Ambil kriteria aktif dari DB
2. Normalisasi bobot agar total = 1
3. Hitung utility tiap laptop per kriteria:
   - `harga` → min-max normalisasi (cost)
   - `performa` → rata-rata 4 sub-utility: processor_score, gpu_score, ram, storage
   - `kondisi` → skala absolut: `(condition - 1) / 4 × 100`
   - `umur` → min-max normalisasi (cost)
4. Hitung skor akhir = Σ(utility × bobot normalisasi)
5. Urutkan descending

**Response 200:**
```json
{
  "success": true,
  "message": "Perhitungan SMART berhasil",
  "data": {
    "total_laptops": 20,
    "total_criteria": 4,
    "rankings": [
      {
        "rank": 1,
        "laptop_id": "665abc...",
        "name": "TUF Gaming A15 FA506",
        "brand": "ASUS",
        "price": 7800000,
        "final_score": 78.45,
        "criteria": [
          {
            "name": "harga",
            "weight": 0.4,
            "normalized_weight": 0.4,
            "utility": 61.22,
            "weighted_score": 24.49
          },
          {
            "name": "performa",
            "weight": 0.3,
            "normalized_weight": 0.3,
            "utility": 72.5,
            "weighted_score": 21.75
          },
          {
            "name": "kondisi",
            "weight": 0.15,
            "normalized_weight": 0.15,
            "utility": 75,
            "weighted_score": 11.25
          },
          {
            "name": "umur",
            "weight": 0.15,
            "normalized_weight": 0.15,
            "utility": 74.19,
            "weighted_score": 11.13
          }
        ]
      }
    ]
  },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `BAD_REQUEST` 400 | Tidak ada kriteria aktif |
| `BAD_REQUEST` 400 | Tidak ada laptop aktif |

---

## Modul: Uploads

### POST `/uploads/image`

Upload gambar secara terpisah (opsional — biasanya gambar langsung dikirim lewat endpoint laptop).

**Access:** Admin only  
**Content-Type:** `multipart/form-data`

**Form Fields:**

| Field | Type | Validasi |
|---|---|---|
| `image` | file | required, JPEG/PNG/WebP, max 5MB |

**Response 201:**
```json
{
  "success": true,
  "message": "Gambar berhasil diupload",
  "data": {
    "url": "http://localhost:5000/uploads/1234567890-abc.jpg"
  },
  "meta": null
}
```

**Error:**
| Code | Kondisi |
|---|---|
| `BAD_REQUEST` 400 | File tidak dikirim / format salah / ukuran > 5MB |

---

## Static Files

File gambar yang sudah diupload dapat diakses langsung:

```
GET /uploads/{filename}
```

Contoh: `http://localhost:5000/uploads/1234567890-abc.jpg`

---

## Referensi: Benchmark Score

Sumber benchmark untuk mengisi `processor_score` dan `gpu_score`:

| Kriteria | Sumber |
|---|---|
| `processor_score` | [cpubenchmark.net](https://www.cpubenchmark.net) — PassMark score |
| `gpu_score` | [videocardbenchmark.net](https://www.videocardbenchmark.net) — PassMark score |

Contoh nilai:
| Processor | Score |
|---|---|
| Intel Core i7-13700H | ~24000 |
| AMD Ryzen 7 5800H | ~16200 |
| Intel Core i5-11400H | ~12500 |

| GPU | Score |
|---|---|
| RTX 3070 Laptop | ~11000 |
| RTX 3060 Laptop | ~9500 |
| GTX 1650 | ~5500 |
