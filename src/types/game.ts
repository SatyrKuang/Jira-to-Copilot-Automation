export type GameSymbol = 'caishen' | 'yuanbao' | 'cherry' | 'bell' | 'bar' | 'seven';

export interface SpinResult {
  symbol: GameSymbol;
  position: number;
  showMultiplier: boolean;
  multiplier?: number;
}

export interface GameState {
  isFreeSpin: boolean;
  freeSpinsRemaining: number;
  currentSpin: SpinResult[];
  gameHistory: SpinResult[][];
  totalWins: number;
}

export interface SymbolAppearance {
  symbol: GameSymbol;
  position: number;
  spinIndex: number;
}