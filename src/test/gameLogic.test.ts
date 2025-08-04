import { applyFreeSpinMultiplierLogic } from '../utils/gameLogic';
import type { SpinResult } from '../types/game';

// Simple test runner for the browser
console.log('Running Free Spin Multiplier Logic Tests...');

// Test 1: Caishen before Yuanbao - should NOT show multiplier
const test1: SpinResult[] = [
  { symbol: 'caishen', position: 0, showMultiplier: false, multiplier: 3 },
  { symbol: 'bell', position: 1, showMultiplier: false, multiplier: 1 },
  { symbol: 'yuanbao', position: 2, showMultiplier: false, multiplier: 2 }
];
applyFreeSpinMultiplierLogic(test1);
console.log('✅ Test 1 - Caishen before Yuanbao:', {
  caishenShowsMultiplier: test1[0].showMultiplier,
  expected: false,
  passed: test1[0].showMultiplier === false ? '✅ PASSED' : '❌ FAILED'
});

// Test 2: Caishen after Yuanbao - should show multiplier
const test2: SpinResult[] = [
  { symbol: 'bell', position: 0, showMultiplier: false, multiplier: 1 },
  { symbol: 'yuanbao', position: 1, showMultiplier: false, multiplier: 2 },
  { symbol: 'caishen', position: 2, showMultiplier: false, multiplier: 3 }
];
applyFreeSpinMultiplierLogic(test2);
console.log('✅ Test 2 - Caishen after Yuanbao:', {
  caishenShowsMultiplier: test2[2].showMultiplier,
  expected: true,
  passed: test2[2].showMultiplier === true ? '✅ PASSED' : '❌ FAILED'
});

// Test 3: Multiple Caishen before Yuanbao - none should show multiplier
const test3: SpinResult[] = [
  { symbol: 'caishen', position: 0, showMultiplier: false, multiplier: 3 },
  { symbol: 'caishen', position: 1, showMultiplier: false, multiplier: 3 },
  { symbol: 'yuanbao', position: 2, showMultiplier: false, multiplier: 2 },
  { symbol: 'caishen', position: 3, showMultiplier: false, multiplier: 3 }
];
applyFreeSpinMultiplierLogic(test3);
console.log('✅ Test 3 - Multiple Caishen:', {
  firstCaishen: test3[0].showMultiplier,
  secondCaishen: test3[1].showMultiplier,
  thirdCaishen: test3[3].showMultiplier,
  allCaishenHidden: !test3[0].showMultiplier && !test3[1].showMultiplier && !test3[3].showMultiplier,
  passed: (!test3[0].showMultiplier && !test3[1].showMultiplier && !test3[3].showMultiplier) ? '✅ PASSED' : '❌ FAILED'
});

console.log('🎮 All tests completed!');