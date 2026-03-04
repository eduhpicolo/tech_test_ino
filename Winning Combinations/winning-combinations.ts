type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const results: WinningCombinationsResult = [];
  const payingSymbols = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const wild = 0;

  const targets = new Set<number>();
  let hasWildOnly = true;

  for (const s of lines) {
    if (payingSymbols.has(s)) {
      targets.add(s);
      hasWildOnly = false;
    }
  }

  if (hasWildOnly && lines.length >= 3 && lines.every(s => s === wild)) {
    return [[wild, lines.map((_, i) => i)]];
  }

  for (const target of targets) {
    let i = 0;
    while (i <= lines.length - 3) {
      if (lines[i] !== target && lines[i] !== wild) {
        i++;
        continue;
      }

      const combo: number[] = [i];
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j] === target || lines[j] === wild) {
          combo.push(j);
        } else {
          break;
        }
      }

      if (combo.length >= 3) {
        results.push([target, combo]);
        i += combo.length;
      } else {
        i++;
      }
    }
  }

  return results;
}

export const WinningCombinations = {call};