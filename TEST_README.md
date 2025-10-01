# Testing Setup

This project uses Vitest and React Testing Library for testing.

## Running Tests

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

Then run:
- `npm test` - Run tests in watch mode
- `npm test -- --run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Test Files

- `src/lib/utils.test.ts` - Tests for utility functions
- `src/contexts/CartContext.test.tsx` - Tests for cart context
- `src/components/ProductCard.test.tsx` - Tests for ProductCard component

## Jenkins Integration

For Jenkins, use `npm test -- --run` to run tests once without watch mode.

For JUnit reporting:
```bash
npm test -- --run --reporter=junit --outputFile=test-results/junit.xml
```

For coverage:
```bash
npm test -- --run --coverage
```
