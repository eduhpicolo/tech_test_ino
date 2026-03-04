# Ino Games - Technical Assessment

> **⚠️ IMPORTANT NOTICE - NO FORKING ALLOWED**
> 
> **🚫 DO NOT FORK THIS REPOSITORY**
> 
> This repository is provided for technical assessment purposes only. **Forking, copying, or creating derivatives of this repository is strictly prohibited.** Any unauthorized fork will be reported and may result in legal action.
> 
> **✅ Permitted:** Clone locally for evaluation only  
> **❌ Prohibited:** Fork, copy, share, or distribute
> 
> By accessing this repository, you agree to these terms.

---

This repository contains JavaScript/TypeScript projects with implementations and automated tests for technical evaluation purposes.

## 📁 Project Structure

```
test-js/
├── package.json                     # Global dependencies and scripts
├── tsconfig.json                    # Global TypeScript configuration
├── vitest.config.js                 # Global Vitest configuration
├── LICENSE                          # Proprietary license terms
├── Cadence/
│   ├── SlotMachineCadence.ts        # Implementation file
│   └── README.md                    # Project documentation
└── Winning Combinations/
    ├── winning-combinations.ts      # Implementation file
    ├── tests/
    │   └── winning-combinations.test.ts  # Test suite (28 test cases)
    └── README.md                    # Project documentation
```

### Winning Combinations
Implementation challenge for a payline verification system for slot machine games.

### Cadence
Implementation challenge for slot machine column cadence system with anticipation mechanics.

## ⚙️ Global Configuration

This project uses centralized configuration for better maintainability:

- **Package Management:** Single `package.json` with all dependencies
- **TypeScript:** Global `tsconfig.json` with shared compiler options
- **Testing:** Centralized `vitest.config.js` for all test suites
- **Scripts:** Unified npm scripts for running tests across projects

## 🧪 Automated Tests

### Winning Combinations - Unit Tests

**Location:** `Winning Combinations/tests/winning-combinations.test.ts`

#### Test Objectives
The tests verify the functionality for detecting winning combinations in slot machine lines, considering:

- **Paying Symbols:** [1, 2, 3, 4, 5, 6, 7, 8, 9]
- **Non-Paying Symbols:** [10, 11, 12, 13, 14, 15]
- **Wild Symbol:** 0 (substitutes any paying symbol)

#### Test Cases
The file contains **28 test cases** covering various scenarios:

1. **Cases with no winning combinations:**
   - `[1, 6, 6, 7, 2, 3]` → `[]`
   - `[9, 9, 5, 9, 9]` → `[]` (no 3+ consecutive symbols)

2. **Basic combinations:**
   - `[1, 2, 6, 6, 6]` → `[[6, [2, 3, 4]]]` (3 consecutive 6s at positions 2, 3, 4)
   - `[3, 3, 3, 8, 6, 3]` → `[[3, [0, 1, 2]]]` (3 consecutive 3s at the beginning)

3. **Multiple combinations:**
   - `[3, 3, 3, 8, 8, 8]` → `[[3, [0, 1, 2]], [8, [3, 4, 5]]]`

4. **Cases with Wild symbols (0):**
   - `[1, 2, 0, 0, 3, 3]` → `[[2, [1, 2, 3]], [3, [2, 3, 4, 5]]]`
   - `[0, 0, 0, 0, 0]` → `[[0, [0, 1, 2, 3, 4]]]` (all wilds)

5. **4+ symbol combinations:**
   - `[3, 4, 3, 3, 3, 3]` → `[[3, [2, 3, 4, 5]]]` (4 consecutive 3s)

#### Result Structure
Each result is an array of tuples `[symbol, positions]` where:
- `symbol`: The number of the symbol that forms the combination
- `positions`: Array with the positions (0-indexed) where the combination occurs

#### How to Run Tests

```bash
# Install dependencies
npm install

# Run all tests from any project
npm test

# Run only Winning Combinations tests
npm run test:winning

# Run tests in watch mode (auto-reload on changes)
npm run test:watch
```

#### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm test` | `vitest run` | Run all tests once |
| `npm run test:winning` | `vitest run 'Winning Combinations/**/*.test.ts'` | Run only Winning Combinations tests |
| `npm run test:watch` | `vitest` | Run tests in watch mode |

#### Test Configuration
- **Framework:** Vitest
- **Language:** TypeScript
- **Configuration:** `vitest.config.js` (project root)
- **Compilation:** Native TypeScript support

#### Current Status
⚠️ **Implementation Pending:** The `call` function currently returns a fixed value `[[6, [2, 3, 4]]]` and needs to be implemented to pass all test cases.

---

## 🎰 Cadence Implementation

### Cadence - Slot Machine Column Timing System

**Location:** `Cadence/SlotMachineCadence.ts`

#### Project Overview
The Cadence project implements a slot machine column timing system that controls when each column stops spinning. The system includes an "anticipation" feature where special symbols can modify the default stopping cadence.

#### Game Mechanics

**Slot Machine Configuration:**
- **Matrix Size:** 5 columns × 6 rows (configurable)
- **Default Cadence:** 0.25 (normal stopping interval)
- **Anticipate Cadence:** 2 (modified stopping interval when anticipation is active)
- **Min Symbols for Anticipation:** 2 special symbols required to start anticipation
- **Max Symbols for Anticipation:** 3 special symbols to end anticipation

#### How Cadence Works

1. **Normal Operation:** Columns stop sequentially with default cadence starting from column 0
2. **Anticipation Mode:** When special symbols meet criteria, cadence changes to anticipate value
3. **Column Timing:** Each column's stop time = previous column time + cadence interval

#### Example Scenario
With 6 columns, 1 min symbol, 2 max symbols, default cadence 1, anticipate cadence 2:
- Special symbols at: column 1 row 2, column 4 row 3
- Expected result: `[0, 1, 3, 5, 7, 8]`

#### Data Structures

```typescript
type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

type SlotCoordinate = {
  column: number;
  row: number;
};

type SpecialSymbol = { 
  specialSymbols: Array<SlotCoordinate> 
};
```

#### Test Data
The implementation includes three game rounds with different special symbol configurations:

1. **Round One:** 3 special symbols at different columns (triggers anticipation)
2. **Round Two:** 2 special symbols in same column (at minimum threshold)
3. **Round Three:** 2 special symbols in last column (edge case testing)

#### Functions to Implement

- `slotCadence(symbols: Array<SlotCoordinate>): SlotCadence`
  - Core function that calculates column stop timing based on special symbol positions
  - Currently returns empty array - needs implementation

- `handleCadences(rounds: RoundsSymbols): RoundsCadences`
  - Processes all game rounds and returns cadences for each
  - Already implemented - calls slotCadence for each round

#### How to Test

```bash
# Navigate to Cadence directory
cd Cadence

# Run the implementation
npx ts-node SlotMachineCadence.ts
```

#### Current Status
⚠️ **Implementation Pending:** The `slotCadence` function needs to be implemented to:
1. Count special symbols per column
2. Determine if anticipation should be active based on min/max thresholds
3. Calculate cumulative stop times using appropriate cadence values
4. Return array of stop times for all columns

---

## 🚀 How to Contribute

### Winning Combinations
1. Implement the logic in the `call` function in `Winning Combinations/winning-combinations.ts`
2. Run `npm run test:winning` from the project root to verify all tests pass
3. All 28 test cases must pass for the implementation to be considered complete

### Cadence
1. Implement the logic in the `slotCadence` function in `Cadence/SlotMachineCadence.ts`
2. Test with provided game rounds data using `npx ts-node SlotMachineCadence.ts`
3. Ensure anticipation logic works correctly with different symbol configurations
4. Verify edge cases (min/max thresholds, different column positions)

---

## ⚖️ License

This project is proprietary software owned by **Ino Games** and provided for technical assessment purposes only. 

**Important:** This code is restricted for evaluation use only. Commercial use, distribution, or sharing outside the assessment context is prohibited. See the [LICENSE](LICENSE) file for complete terms and conditions.

By accessing this repository, you acknowledge and agree to the licensing terms set forth by Ino Games.

---

© 2024 Ino Games - All Rights Reserved
