import type { GameSymbol, SpinResult } from '../types/game';

// Symbol probabilities and multipliers
const SYMBOL_CONFIG = {
  caishen: { probability: 0.15, baseMultiplier: 3 },
  yuanbao: { probability: 0.15, baseMultiplier: 2 },
  cherry: { probability: 0.2, baseMultiplier: 1 },
  bell: { probability: 0.2, baseMultiplier: 1 },
  bar: { probability: 0.2, baseMultiplier: 1 },
  seven: { probability: 0.1, baseMultiplier: 5 }
} as const;

export function generateRandomSymbol(): GameSymbol {
  const random = Math.random();
  let cumulative = 0;
  
  for (const [symbol, config] of Object.entries(SYMBOL_CONFIG)) {
    cumulative += config.probability;
    if (random <= cumulative) {
      return symbol as GameSymbol;
    }
  }
  
  return 'cherry'; // fallback
}

export function generateSpin(
  reelCount: number, 
  isFreeSpin: boolean
): SpinResult[] {
  const spinResults: SpinResult[] = [];
  
  for (let position = 0; position < reelCount; position++) {
    const symbol = generateRandomSymbol();
    const baseMultiplier = SYMBOL_CONFIG[symbol].baseMultiplier;
    
    const result: SpinResult = {
      symbol,
      position,
      showMultiplier: false,
      multiplier: baseMultiplier
    };
    
    spinResults.push(result);
  }
  
  // Apply free spin multiplier logic
  if (isFreeSpin) {
    applyFreeSpinMultiplierLogic(spinResults);
  } else {
    // In regular spins, all symbols show their multipliers
    spinResults.forEach(result => {
      result.showMultiplier = true;
    });
  }
  
  return spinResults;
}

/**
 * Core logic: During Free Spin, if Caishen appear earlier than Yuanbao, 
 * Caishen no need to show multiplier.
 */
export function applyFreeSpinMultiplierLogic(
  currentSpin: SpinResult[]
): void {
  // Find all appearances of Caishen and Yuanbao in current spin
  const caishenAppearances = currentSpin
    .map((result, index) => ({ ...result, position: index }))
    .filter(result => result.symbol === 'caishen');
    
  const yuanbaoAppearances = currentSpin
    .map((result, index) => ({ ...result, position: index }))
    .filter(result => result.symbol === 'yuanbao');
  
  // If no Caishen or no Yuanbao, show all multipliers
  if (caishenAppearances.length === 0 || yuanbaoAppearances.length === 0) {
    currentSpin.forEach(result => {
      result.showMultiplier = true;
    });
    return;
  }
  
  // Find the earliest position of each symbol type
  const earliestCaishenPosition = Math.min(...caishenAppearances.map(a => a.position));
  const earliestYuanbaoPosition = Math.min(...yuanbaoAppearances.map(a => a.position));
  
  // Apply the rule: if Caishen appears earlier than Yuanbao, Caishen doesn't show multiplier
  currentSpin.forEach(result => {
    if (result.symbol === 'caishen' && earliestCaishenPosition < earliestYuanbaoPosition) {
      result.showMultiplier = false;
    } else {
      result.showMultiplier = true;
    }
  });
}

export function calculateWinnings(spinResults: SpinResult[]): number {
  return spinResults.reduce((total, result) => {
    if (result.showMultiplier && result.multiplier) {
      return total + result.multiplier * 10; // Base bet of 10
    }
    return total;
  }, 0);
}