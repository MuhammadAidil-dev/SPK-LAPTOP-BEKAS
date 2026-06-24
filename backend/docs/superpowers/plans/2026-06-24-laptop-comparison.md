# Laptop Comparison Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement comparison endpoint that calculates SMART ranking for user-selected laptops only.

**Architecture:** Add new `POST /api/v1/calculation/compare` endpoint following existing layered architecture (Controller → Service → Repository → Model). Extract common calculation logic to avoid duplication. Backend remains stateless.

**Tech Stack:** Express.js, TypeScript, MongoDB (Mongoose), Joi validation

## Global Constraints

- TypeScript strict mode enabled
- Follow existing layered architecture pattern
- All error messages in Indonesian
- Response format follows ApiResponse envelope: `{ success, message, data?, meta? }`
- Error responses follow: `{ success: false, message, code, errors? }`
- Backend must remain stateless (no session/cookie management)
- Backward compatible with existing `GET /api/v1/calculation` endpoint

---

## File Structure

**New Files:**
- `src/modules/calculation/calculation.validation.ts` — Joi schema for compare endpoint

**Modified Files:**
- `src/modules/laptops/laptop.repository.ts` — Add `findByIdsAndActive()` method
- `src/modules/calculation/calculation.service.ts` — Extract `_performCalculation()` private method, add `compareService()` method
- `src/modules/calculation/calculation.controller.ts` — Add `compareController()` method
- `src/modules/calculation/calculation.route.ts` — Add `POST /compare` route

---

### Task 1: Add Repository Method for Fetching Laptops by IDs

**Files:**
- Modify: `src/modules/laptops/laptop.repository.ts`

**Interfaces:**
- Consumes: Existing `ILaptopResponse` type from `laptop.type.ts`
- Produces: `findByIdsAndActive(ids: string[]): Promise<ILaptopResponse[]>` — fetches laptops with given IDs that are active

- [ ] **Step 1: Read existing repository to understand pattern**

```bash
cat src/modules/laptops/laptop.repository.ts
```

Expected: See existing methods like `findAllActive()`, understand Mongoose query pattern

- [ ] **Step 2: Add findByIdsAndActive method**

Add this method to the `LaptopRepository` class:

```typescript
async findByIdsAndActive(ids: string[]): Promise<ILaptopResponse[]> {
  return await Laptop.find({
    _id: { $in: ids },
    isActive: true,
  }).lean();
}
```

Location: Add after existing `findAllActive()` method in the class

- [ ] **Step 3: Verify TypeScript compilation**

```bash
npm run build
```

Expected: No TypeScript errors. If error about `Laptop` model, check import statement includes `Laptop` model.

- [ ] **Step 4: Commit**

```bash
git add src/modules/laptops/laptop.repository.ts
git commit -m "feat: add findByIdsAndActive repository method

Add method to fetch laptops by array of IDs with active status filter.
Needed for comparison feature.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Create Validation Schema

**Files:**
- Create: `src/modules/calculation/calculation.validation.ts`

**Interfaces:**
- Consumes: Joi library
- Produces: `compareSchema` — Joi schema that validates `{ laptop_ids: string[] }`

- [ ] **Step 1: Create validation file**

```typescript
import Joi from 'joi';

export const compareSchema = Joi.object({
  laptop_ids: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
          'string.pattern.base': 'Format ID laptop tidak valid',
        })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'laptop_ids harus berupa array',
      'array.min': 'Minimal pilih 1 laptop untuk dibandingkan',
      'any.required': 'laptop_ids wajib diisi',
    }),
});
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npm run build
```

Expected: No TypeScript errors. Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/modules/calculation/calculation.validation.ts
git commit -m "feat: add validation schema for compare endpoint

Add Joi schema to validate laptop_ids array with:
- Required field
- Array type check
- Min 1 item
- Valid MongoDB ObjectId format

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Refactor Service - Extract Common Calculation Logic

**Files:**
- Modify: `src/modules/calculation/calculation.service.ts:80-160`

**Interfaces:**
- Consumes: Existing types `ILaptopResponse`, `ICriteriaResponse` from their respective modules
- Produces: 
  - `_performCalculation(laptops: ILaptopResponse[], activeCriteria: ICriteriaResponse[]): ICalculationResult` — private method that performs SMART calculation
  - Refactored `calculateSmartService(): Promise<ICalculationResult>` — now calls `_performCalculation()`

- [ ] **Step 1: Read current service implementation**

```bash
cat src/modules/calculation/calculation.service.ts
```

Expected: Understand current `calculateSmartService()` method structure (lines 81-160)

- [ ] **Step 2: Extract calculation logic to private method**

Add this private method at the end of the `CalculationService` class (before closing brace):

```typescript
private _performCalculation(
  laptops: ILaptopResponse[],
  activeCriteria: ICriteriaResponse[],
): ICalculationResult {
  // Normalize weights so they sum to 1
  const totalWeight = activeCriteria.reduce((sum, c) => sum + c.weight, 0);
  const normalizedCriteria = activeCriteria.map((c) => ({
    name: c.name,
    type: c.type,
    weight: c.weight,
    normalizedWeight: totalWeight > 0 ? c.weight / totalWeight : 0,
  }));

  const rankings = laptops.map((laptop) => {
    const criteriaDetails: ICriterionDetail[] = normalizedCriteria.map(
      (criterion) => {
        const utility = computeUtility(
          criterion.name,
          criterion.type,
          laptop,
          laptops,
        );
        const weightedScore = round2(utility * criterion.normalizedWeight);

        return {
          name: criterion.name,
          weight: criterion.weight,
          normalized_weight: round2(criterion.normalizedWeight),
          utility: round2(utility),
          weighted_score: weightedScore,
        };
      },
    );

    const finalScore = round2(
      criteriaDetails.reduce((sum, c) => sum + c.weighted_score, 0),
    );

    return {
      rank: 0,
      laptop_id: String(laptop._id),
      name: laptop.name,
      brand: laptop.brand,
      price: laptop.price,
      final_score: finalScore,
      criteria: criteriaDetails,
    };
  });

  rankings.sort((a, b) => b.final_score - a.final_score);
  rankings.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return {
    total_laptops: laptops.length,
    total_criteria: activeCriteria.length,
    rankings,
  };
}
```

- [ ] **Step 3: Refactor calculateSmartService to use _performCalculation**

Replace the calculation logic in `calculateSmartService()` method (lines 105-159) with:

```typescript
async calculateSmartService(): Promise<ICalculationResult> {
  const [allCriteria, laptops] = await Promise.all([
    criteriaRepository.findAll(),
    laptopRepository.findAllActive(),
  ]);

  const activeCriteria = allCriteria.filter((c) => c.isActive === true);

  if (activeCriteria.length === 0) {
    throw new AppError(
      'Tidak ada kriteria aktif untuk perhitungan',
      HTTP_CODE.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
    );
  }

  if (laptops.length === 0) {
    throw new AppError(
      'Tidak ada data laptop tersedia untuk perhitungan',
      HTTP_CODE.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
    );
  }

  return this._performCalculation(laptops, activeCriteria);
}
```

- [ ] **Step 4: Verify TypeScript compilation**

```bash
npm run build
```

Expected: No TypeScript errors. Build succeeds.

- [ ] **Step 5: Test existing endpoint still works**

Start dev server:
```bash
npm run dev
```

Test in another terminal:
```bash
curl http://localhost:3000/api/v1/calculation
```

Expected: 200 response with rankings data (same behavior as before refactor)

- [ ] **Step 6: Stop dev server**

Press `Ctrl+C` in the terminal running dev server

- [ ] **Step 7: Commit**

```bash
git add src/modules/calculation/calculation.service.ts
git commit -m "refactor: extract common calculation logic to private method

Extract SMART calculation logic from calculateSmartService into
_performCalculation private method for reuse in compare feature.

No behavior change - existing endpoint works the same.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Add Compare Service Method

**Files:**
- Modify: `src/modules/calculation/calculation.service.ts`

**Interfaces:**
- Consumes: 
  - `laptopRepository.findByIdsAndActive(ids: string[])` from Task 1
  - `_performCalculation()` from Task 3
- Produces: `compareService(laptopIds: string[]): Promise<ICalculationResult>` — validates and calculates SMART for selected laptops

- [ ] **Step 1: Import laptop repository if not already imported**

Check imports at top of `calculation.service.ts`. If `laptopRepository` is not imported, the import should already exist from the refactor. Verify this line exists:

```typescript
import { laptopRepository } from '@/modules/laptops/laptop.repository';
```

- [ ] **Step 2: Add compareService method**

Add this method to `CalculationService` class (after `calculateSmartService`, before `_performCalculation`):

```typescript
async compareService(laptopIds: string[]): Promise<ICalculationResult> {
  // De-duplicate IDs
  const uniqueIds = [...new Set(laptopIds)];

  // Fetch criteria and selected laptops
  const [allCriteria, selectedLaptops] = await Promise.all([
    criteriaRepository.findAll(),
    laptopRepository.findByIdsAndActive(uniqueIds),
  ]);

  const activeCriteria = allCriteria.filter((c) => c.isActive === true);

  // Validate: no active criteria
  if (activeCriteria.length === 0) {
    throw new AppError(
      'Tidak ada kriteria aktif untuk perhitungan',
      HTTP_CODE.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
    );
  }

  // Validate: check if all requested IDs are found
  if (selectedLaptops.length < uniqueIds.length) {
    const foundIds = selectedLaptops.map((l) => String(l._id));
    const notFoundIds = uniqueIds.filter((id) => !foundIds.includes(id));
    throw new AppError(
      `Laptop dengan ID ${notFoundIds.join(', ')} tidak ditemukan atau tidak aktif`,
      HTTP_CODE.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
    );
  }

  // Perform calculation with selected laptops only
  return this._performCalculation(selectedLaptops, activeCriteria);
}
```

- [ ] **Step 3: Verify TypeScript compilation**

```bash
npm run build
```

Expected: No TypeScript errors. Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/modules/calculation/calculation.service.ts
git commit -m "feat: add compareService for laptop comparison

Add compareService method that:
- Accepts array of laptop IDs
- De-duplicates IDs automatically
- Validates all IDs exist and are active
- Calculates SMART ranking only for selected laptops
- Returns 404 if any ID not found/inactive

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Add Compare Controller

**Files:**
- Modify: `src/modules/calculation/calculation.controller.ts`

**Interfaces:**
- Consumes: 
  - `calculationService.compareService(laptop_ids: string[])` from Task 4
  - `sendSuccess` helper from existing imports
- Produces: `compareController(req: Request, res: Response): Promise<void>` — handles compare endpoint request

- [ ] **Step 1: Read current controller**

```bash
cat src/modules/calculation/calculation.controller.ts
```

Expected: See existing `calculateSmartController` method, understand pattern

- [ ] **Step 2: Add compareController method**

Add this method to `CalculationController` class (after `calculateSmartController`):

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

- [ ] **Step 3: Verify TypeScript compilation**

```bash
npm run build
```

Expected: No TypeScript errors. Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/modules/calculation/calculation.controller.ts
git commit -m "feat: add compareController for compare endpoint

Add controller method that:
- Extracts laptop_ids from request body
- Calls compareService
- Returns success response with ranking data

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: Add Compare Route

**Files:**
- Modify: `src/modules/calculation/calculation.route.ts`

**Interfaces:**
- Consumes:
  - `compareSchema` from `calculation.validation.ts` (Task 2)
  - `calculationController.compareController` from Task 5
  - Existing `validate` middleware
  - Existing `asyncHandler` middleware
- Produces: New route `POST /compare` registered on `calculationRouter`

- [ ] **Step 1: Add import for validation schema**

Add this import at the top of `calculation.route.ts`:

```typescript
import { compareSchema } from './calculation.validation';
import { validate } from '@/middleware/validate';
```

Note: Check if `validate` middleware is already imported. If yes, only add the `compareSchema` import.

- [ ] **Step 2: Add compare route**

Add this route after the existing `GET /` route (before `export default`):

```typescript
/**
 * @access PUBLIC
 * @method POST
 */
calculationRouter.post(
  '/compare',
  validate(compareSchema),
  asyncHandler(calculationController.compareController),
);
```

- [ ] **Step 3: Verify TypeScript compilation**

```bash
npm run build
```

Expected: No TypeScript errors. Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/modules/calculation/calculation.route.ts
git commit -m "feat: add POST /compare route

Add new route POST /api/v1/calculation/compare with:
- Joi validation using compareSchema
- compareController handler
- asyncHandler wrapper for error handling
- PUBLIC access (no auth required)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: Manual Testing - Happy Path

**Files:**
- No file changes

**Interfaces:**
- Tests the complete flow: Route → Controller → Service → Repository

- [ ] **Step 1: Seed laptop data if needed**

```bash
npm run seed:laptop:up
```

Expected: Console output showing 20 laptops seeded (or already exist)

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

Expected: Server starts on configured PORT (check console output)

- [ ] **Step 3: Get list of available laptops**

In another terminal:
```bash
curl http://localhost:3000/api/v1/laptops
```

Expected: 200 response with array of laptops. Copy 3-5 laptop IDs from the response.

- [ ] **Step 4: Test compare endpoint with valid IDs**

Replace `ID1`, `ID2`, `ID3` with actual laptop IDs from step 3:

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": [\"ID1\", \"ID2\", \"ID3\"]}"
```

Expected: 200 response with:
- `success: true`
- `message: "Perhitungan SMART perbandingan berhasil"`
- `data.total_laptops: 3`
- `data.rankings` array with 3 laptops
- Each laptop has `rank`, `final_score`, `criteria` details

- [ ] **Step 5: Verify ranking order**

Check response from step 4:
- Rank 1 has highest `final_score`
- Rank 2 has middle `final_score`
- Rank 3 has lowest `final_score`

Expected: Scores are in descending order

- [ ] **Step 6: Document test results**

Create note: "Happy path test passed - compare endpoint returns correct ranking for selected laptops"

---

### Task 8: Manual Testing - Validation Errors

**Files:**
- No file changes

**Interfaces:**
- Tests validation layer (Joi schema)

Note: Keep dev server running from Task 7, or restart with `npm run dev`

- [ ] **Step 1: Test empty laptop_ids array**

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": []}"
```

Expected: 400 response with:
- `success: false`
- `message` or `errors.laptop_ids`: "Minimal pilih 1 laptop untuk dibandingkan"

- [ ] **Step 2: Test missing laptop_ids field**

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{}"
```

Expected: 400 response with:
- `success: false`
- `message` or `errors.laptop_ids`: "laptop_ids wajib diisi"

- [ ] **Step 3: Test laptop_ids not an array**

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": \"not-an-array\"}"
```

Expected: 400 response with:
- `success: false`
- `message` or `errors.laptop_ids`: "laptop_ids harus berupa array"

- [ ] **Step 4: Test invalid ObjectId format**

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": [\"invalid-id\"]}"
```

Expected: 400 response with:
- `success: false`
- Message about "Format ID laptop tidak valid"

- [ ] **Step 5: Document test results**

Create note: "Validation tests passed - all invalid inputs return 400 with appropriate error messages"

---

### Task 9: Manual Testing - Not Found Errors

**Files:**
- No file changes

**Interfaces:**
- Tests service validation logic (laptop ID existence check)

Note: Keep dev server running from previous tasks, or restart with `npm run dev`

- [ ] **Step 1: Test non-existent laptop ID**

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": [\"000000000000000000000000\"]}"
```

Expected: 404 response with:
- `success: false`
- `code: "NOT_FOUND"`
- `message`: "Laptop dengan ID 000000000000000000000000 tidak ditemukan atau tidak aktif"

- [ ] **Step 2: Test mix of valid and invalid IDs**

Get one valid laptop ID from `curl http://localhost:3000/api/v1/laptops`, then:

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": [\"VALID_ID\", \"000000000000000000000000\", \"111111111111111111111111\"]}"
```

Replace `VALID_ID` with actual laptop ID.

Expected: 404 response with:
- `success: false`
- `code: "NOT_FOUND"`
- `message`: "Laptop dengan ID 000000000000000000000000, 111111111111111111111111 tidak ditemukan atau tidak aktif"

Note: Valid ID should NOT appear in error message, only invalid ones

- [ ] **Step 3: Document test results**

Create note: "Not found tests passed - missing/inactive laptop IDs return 404 with specific IDs listed"

---

### Task 10: Manual Testing - Edge Cases

**Files:**
- No file changes

**Interfaces:**
- Tests edge cases in service logic

Note: Keep dev server running from previous tasks, or restart with `npm run dev`

- [ ] **Step 1: Test single laptop comparison**

Get one valid laptop ID:

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": [\"VALID_ID\"]}"
```

Replace `VALID_ID` with actual laptop ID.

Expected: 200 response with:
- `data.total_laptops: 1`
- `data.rankings` array with 1 laptop
- Laptop has `rank: 1`
- `final_score` should be calculated (not NaN or error)

- [ ] **Step 2: Test duplicate IDs**

Get one valid laptop ID and use it twice:

```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": [\"VALID_ID\", \"VALID_ID\"]}"
```

Replace `VALID_ID` with actual laptop ID.

Expected: 200 response with:
- `data.total_laptops: 1` (de-duplicated)
- `data.rankings` array with 1 laptop (not 2)

- [ ] **Step 3: Verify min-max normalization scope**

Get 3 laptop IDs. Run compare with those 3, note their scores. Then run default calculation (`GET /calculation`) and compare scores.

```bash
# Compare selected
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d "{\"laptop_ids\": [\"ID1\", \"ID2\", \"ID3\"]}"

# Default (all laptops)
curl http://localhost:3000/api/v1/calculation
```

Expected: Same laptop IDs may have DIFFERENT scores in compare vs default, because min-max normalization uses different laptop sets.

- [ ] **Step 4: Stop dev server**

Press `Ctrl+C` in the terminal running dev server

- [ ] **Step 5: Document test results**

Create note: "Edge case tests passed - single laptop, duplicate IDs, and min-max normalization scope all work correctly"

---

### Task 11: Final Verification and Documentation

**Files:**
- No file changes (verification only)

**Interfaces:**
- Verifies entire implementation is complete and working

- [ ] **Step 1: Verify all files exist**

```bash
ls src/modules/calculation/calculation.validation.ts
ls src/modules/calculation/calculation.route.ts
ls src/modules/calculation/calculation.controller.ts
ls src/modules/calculation/calculation.service.ts
ls src/modules/laptops/laptop.repository.ts
```

Expected: All files exist (no "not found" errors)

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build completes with no TypeScript errors

- [ ] **Step 3: Verify existing endpoint still works**

Start dev server:
```bash
npm run dev
```

Test existing endpoint:
```bash
curl http://localhost:3000/api/v1/calculation
```

Expected: 200 response with all laptops ranked (backward compatible)

Stop dev server: `Ctrl+C`

- [ ] **Step 4: Review all commits**

```bash
git log --oneline -11
```

Expected: See 11 commits from this implementation (or fewer if some tasks combined), each with clear message

- [ ] **Step 5: Create summary note**

Create note with summary:
- Feature: Laptop comparison endpoint
- Endpoint: `POST /api/v1/calculation/compare`
- Request: `{ laptop_ids: string[] }`
- Response: Same format as default calculation, but only selected laptops
- All tests passed (happy path, validation, not found, edge cases)
- Backward compatible - existing endpoint unchanged
- Code follows DRY principle - shared calculation logic extracted

---

## Implementation Complete

All tasks completed. The comparison feature is now ready for use:

**New endpoint:** `POST /api/v1/calculation/compare`

**Request example:**
```json
{
  "laptop_ids": ["507f1f77bcf86cd799439011", "507f191e810c19729de860ea"]
}
```

**Key features:**
- Validates input (required array, min 1 item, valid ObjectId format)
- De-duplicates IDs automatically
- Returns 404 if any ID not found or inactive
- Calculates SMART ranking only for selected laptops
- Min-max normalization uses selected laptops only (not all laptops)
- Backward compatible with existing calculation endpoint

**Testing completed:**
- Happy path ✓
- Validation errors ✓
- Not found errors ✓
- Edge cases (single laptop, duplicates, normalization scope) ✓

**Frontend integration:**
Frontend should store selected laptop IDs in localStorage/sessionStorage and call this endpoint when user triggers comparison.
