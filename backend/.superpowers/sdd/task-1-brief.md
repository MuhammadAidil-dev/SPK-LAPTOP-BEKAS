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
