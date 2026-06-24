# Manual Testing Instructions

Run these after `npm run build` succeeds.

## Happy Path
```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["<valid-id-1>", "<valid-id-2>", "<valid-id-3>"]}'
```
Expected: 200, 3 laptops ranked

## Validation Errors
```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": []}'

curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{}'

curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": "invalid"}'
```
Expected: 400 with validation errors

## Not Found
```bash
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["000000000000000000000000"]}'
```
Expected: 404

## Edge Cases
```bash
# Single laptop
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["<valid-id>"]}'

# Duplicate IDs
curl -X POST http://localhost:3000/api/v1/calculation/compare \
  -H "Content-Type: application/json" \
  -d '{"laptop_ids": ["<valid-id>", "<valid-id>"]}'
```
Expected: 200
