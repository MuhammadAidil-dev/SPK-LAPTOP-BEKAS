# Laptop Comparison Feature - Design Document

**Date:** 2026-06-24  
**Author:** Claude (Kiro)  
**Status:** Approved

## Overview

Fitur comparison memungkinkan user untuk membandingkan beberapa laptop pilihan mereka dengan perhitungan SMART yang hanya melibatkan laptop-laptop tersebut. User dapat menambahkan laptop ke "keranjang perbandingan" dan sistem akan menghitung ranking hanya untuk laptop yang dipilih.

### Key Requirements

- User dapat memilih beberapa laptop untuk dibandingkan (tidak ada batasan jumlah)
- Frontend menyimpan selected laptop IDs di localStorage/sessionStorage
- Backend menyediakan endpoint baru untuk menghitung SMART hanya untuk laptop yang dipilih
- Min-max normalization dihitung hanya berdasarkan laptop yang dipilih
- Jika tidak ada laptop yang dipilih, sistem fallback ke perhitungan default (semua laptop)
- Backend tetap stateless (tidak menyimpan selection di session/cookie)

## Architecture

Mengikuti pola layered architecture existing:

```
Controller → Service → Repository → Model
```

### Component Changes

- **calculation.route.ts** — tambah route baru `POST /compare`
- **calculation.controller.ts** — tambah method `compareController`
- **calculation.service.ts** — tambah method `compareService(laptopIds)` + refactor calculation logic
- **calculation.validation.ts** — file baru untuk validasi request body

### Principles

- **Stateless backend** — tidak ada session/cookie management untuk comparison
- **Backward compatible** — endpoint existing `GET /api/v1/calculation` tidak berubah
- **DRY** — reuse existing calculation helpers (`minMax`, `computeUtility`, dll)
- **Explicit over implicit** — frontend explicitly mengirim laptop IDs yang ingin dibandingkan

## API Design

### New Endpoint

```
POST /api/v1/calculation/compare
Content-Type: application/json
```

**Access:** PUBLIC (sama seperti calculation endpoint existing)

### Request Body

```typescript
{
  "laptop_ids": [
    "507f1f77bcf86cd799439011",
    "507f191e810c19729de860ea",
    "507f1f77bcf86cd799439013"
  ]
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `laptop_ids` | Required | "laptop_ids wajib diisi" |
| `laptop_ids` | Must be array | "laptop_ids harus berupa array" |
| `laptop_ids` | Not empty | "Minimal pilih 1 laptop untuk dibandingkan" |
| Each ID | Valid MongoDB ObjectId | "Format ID laptop tidak valid: {id}" |

### Response Format

**Success (200):**

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
        "laptop_id": "507f1f77bcf86cd799439011",
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
          }
        ]
      }
    ]
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| 400 | Validation error | "laptop_ids wajib diisi" (atau error lainnya) |
| 400 | No active criteria | "Tidak ada kriteria aktif untuk perhitungan" |
| 404 | Laptop not found/inactive | "Laptop dengan ID {id} tidak ditemukan atau tidak aktif" |
| 404 | Multiple laptops not found | "Laptop dengan ID {id1}, {id2} tidak ditemukan atau tidak aktif" |

## Calculation Logic

### Core Flow

1. **Fetch data:**
   - Fetch all active criteria
   - Fetch **only laptops with IDs in `laptop_ids` array** AND status active

2. **Validation:**
   - No active criteria → throw 400 error
   - Laptop ID not found or inactive → throw 404 error with specific IDs
   - All selected laptops inactive → throw 404 error

3. **SMART Calculation:**
   - Normalize criteria weights (sum = 1.0)
   - **Min-max normalization only from selected laptops** (key difference from default calculation)
   - Compute utility per criterion per laptop
   - Calculate weighted scores
   - Sum to final score

4. **Ranking:**
   - Sort by `final_score` descending
   - Assign rank (1, 2, 3, ...)

### Min-Max Normalization Behavior

**Example scenario:**
- Total laptops in DB: 20
- User selects: Laptop A (Rp 10jt), Laptop C (Rp 15jt), Laptop E (Rp 20jt)

**For "Harga" criterion (cost type):**
- Min = 10 juta (from selected laptops only)
- Max = 20 juta (from selected laptops only)
- Laptop A utility = (20 - 10) / (20 - 10) × 100 = 100%
- Laptop C utility = (20 - 15) / (20 - 10) × 50 = 50%
- Laptop E utility = (20 - 20) / (20 - 10) × 0 = 0%

This is different from default calculation where min-max would use all 20 laptops.

### Special Cases

**Composite criterion (Performa):**
- Still uses average of 4 sub-utilities (processor, GPU, RAM, storage)
- Each sub-utility normalized from selected laptops only

**Absolute scale (Kondisi Fisik):**
- Still uses condition 1-5 → 0-100% mapping
- Not affected by other laptops (absolute, not relative)

**Single laptop selected:**
- All min = max for relative criteria
- All utilities become 100 (or 0 for cost type where formula gives same result)
- Final score depends on absolute-scale criteria (e.g., kondisi fisik)

**Duplicate IDs:**
- De-duplicate automatically in service layer before fetching
- Example: `["id1", "id1", "id2"]` → `["id1", "id2"]`

### Code Reuse

Extract common calculation logic into private method:

```typescript
private _performCalculation(
  laptops: ILaptopResponse[],
  activeCriteria: ICriteriaResponse[]
): ICalculationResult
```

Both `calculateSmartService()` and `compareService()` will call this method.

## Error Handling

### Validation Errors (400)

- Missing `laptop_ids` field
- `laptop_ids` is not an array
- `laptop_ids` is empty array
- Invalid MongoDB ObjectId format

Error format follows existing `errorMiddleware`:
```json
{
  "success": false,
  "message": "laptop_ids wajib diisi",
  "code": "BAD_REQUEST",
  "errors": {
    "laptop_ids": "laptop_ids wajib diisi"
  }
}
```

### Not Found Errors (404)

When laptop IDs are not found or inactive:

**Single invalid ID:**
```json
{
  "success": false,
  "message": "Laptop dengan ID 507f1f77bcf86cd799439011 tidak ditemukan atau tidak aktif",
  "code": "NOT_FOUND"
}
```

**Multiple invalid IDs:**
```json
{
  "success": false,
  "message": "Laptop dengan ID 507f1f77bcf86cd799439011, 507f191e810c19729de860ea tidak ditemukan atau tidak aktif",
  "code": "NOT_FOUND"
}
```

### Business Logic Errors (400)

- No active criteria: reuse existing error message

## Implementation Structure

### File Changes

```
src/modules/calculation/
├── calculation.route.ts          [UPDATE] +1 route
├── calculation.controller.ts     [UPDATE] +1 method
├── calculation.service.ts        [UPDATE] refactor + 1 method
├── calculation.type.ts           [NO CHANGE]
└── calculation.validation.ts     [NEW FILE]
```

### New File: calculation.validation.ts

```typescript
import Joi from 'joi';

export const compareSchema = Joi.object({
  laptop_ids: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .min(1)
    .required()
    .messages({
      'array.base': 'laptop_ids harus berupa array',
      'array.min': 'Minimal pilih 1 laptop untuk dibandingkan',
      'any.required': 'laptop_ids wajib diisi',
      'string.pattern.base': 'Format ID laptop tidak valid'
    })
});
```

### Update: calculation.route.ts

Add new route:
```typescript
calculationRouter.post(
  '/compare',
  validate(compareSchema),
  asyncHandler(calculationController.compareController)
);
```

### Update: calculation.controller.ts

Add new method:
```typescript
async compareController(req: Request, res: Response) {
  const { laptop_ids } = req.body;
  const result = await calculationService.compareService(laptop_ids);
  
  sendSuccess<ICalculationResult>(res, {
    message: 'Perhitungan SMART perbandingan berhasil',
    data: result,
  });
}
```

### Update: calculation.service.ts

1. **Refactor:** Extract `_performCalculation` private method
2. **Add:** `compareService(laptopIds: string[])` method
3. **Keep:** `calculateSmartService()` unchanged (calls `_performCalculation` with all active laptops)

```typescript
async compareService(laptopIds: string[]): Promise<ICalculationResult> {
  // De-duplicate IDs
  const uniqueIds = [...new Set(laptopIds)];
  
  // Fetch criteria and selected laptops
  const [allCriteria, selectedLaptops] = await Promise.all([
    criteriaRepository.findAll(),
    laptopRepository.findByIdsAndActive(uniqueIds)
  ]);
  
  // Validate
  const activeCriteria = allCriteria.filter(c => c.isActive);
  if (activeCriteria.length === 0) {
    throw new AppError(/* no active criteria error */);
  }
  
  // Check if all requested IDs are found
  if (selectedLaptops.length < uniqueIds.length) {
    const foundIds = selectedLaptops.map(l => String(l._id));
    const notFoundIds = uniqueIds.filter(id => !foundIds.includes(id));
    throw new AppError(
      `Laptop dengan ID ${notFoundIds.join(', ')} tidak ditemukan atau tidak aktif`,
      HTTP_CODE.NOT_FOUND,
      ERROR_CODE.NOT_FOUND
    );
  }
  
  // Perform calculation
  return this._performCalculation(selectedLaptops, activeCriteria);
}

private _performCalculation(
  laptops: ILaptopResponse[],
  activeCriteria: ICriteriaResponse[]
): ICalculationResult {
  // Existing calculation logic (extracted from calculateSmartService)
  // ...
}
```

### New Repository Method

Add to `laptop.repository.ts`:

```typescript
async findByIdsAndActive(ids: string[]): Promise<ILaptopResponse[]> {
  return await Laptop.find({
    _id: { $in: ids },
    isActive: true
  }).lean();
}
```

## Testing Strategy

Since no test framework is configured, manual testing is required:

### Test Cases

1. **Happy path:**
   - Select 3-5 laptops
   - Verify calculation returns only those laptops
   - Verify ranking is correct (highest score = rank 1)

2. **Validation:**
   - Empty `laptop_ids` array → 400 error
   - Invalid ObjectId format → 400 error
   - Missing `laptop_ids` field → 400 error

3. **Not found:**
   - Non-existent laptop ID → 404 error
   - Inactive laptop ID → 404 error
   - Mix of valid and invalid IDs → 404 with all invalid IDs listed

4. **Edge cases:**
   - Single laptop selected → rank 1, verify score calculation
   - Duplicate IDs → de-duplicated automatically
   - All laptops have same price/spec → verify no division by zero

5. **Business rules:**
   - No active criteria → 400 error
   - Min-max normalization only uses selected laptops (manually verify math)

### Manual Testing Commands

```bash
# Happy path
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["id1", "id2", "id3"]}'

# Validation error
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": []}'

# Not found
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["000000000000000000000000"]}'
```

## Frontend Integration Notes

Frontend responsibilities:
1. Implement localStorage/sessionStorage untuk menyimpan selected laptop IDs
2. Provide UI untuk add/remove laptops dari comparison list
3. Provide "Reset" button untuk clear selection
4. Ketika user trigger comparison:
   - Jika ada laptops selected → call `POST /api/v1/calculation/compare`
   - Jika tidak ada → call `GET /api/v1/calculation` (default)
5. Display comparison results (ranking, scores, criteria breakdown)

## Rollout Plan

1. **Backend implementation:**
   - Create `calculation.validation.ts`
   - Add repository method `findByIdsAndActive`
   - Refactor service layer
   - Add new route + controller
   - Manual testing

2. **Frontend integration:**
   - Implement comparison state management
   - Build comparison UI
   - Integrate with new endpoint
   - End-to-end testing

3. **Deployment:**
   - Deploy backend first (backward compatible)
   - Deploy frontend after backend is live
   - Monitor error logs for any issues

## Open Questions

None — design is complete and approved.

---

**Why this approach:**
- Stateless backend is easier to scale and maintain
- Explicit request body makes debugging easier than implicit session state
- Minimal changes to existing code (backward compatible)
- Clear separation of concerns (frontend handles state, backend handles calculation)
