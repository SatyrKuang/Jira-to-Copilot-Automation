import React from 'react';
import type { GameSymbol } from '../types/game';

interface SymbolProps {
  symbol: GameSymbol;
  showMultiplier: boolean;
  multiplier?: number;
  className?: string;
}

const SYMBOL_DISPLAY = {
  caishen: { emoji: '🎎', name: 'Caishen', color: 'text-yellow-600' },
  yuanbao: { emoji: '🪙', name: 'Yuanbao', color: 'text-amber-600' },
  cherry: { emoji: '🍒', name: 'Cherry', color: 'text-red-500' },
  bell: { emoji: '🔔', name: 'Bell', color: 'text-yellow-500' },
  bar: { emoji: '📊', name: 'Bar', color: 'text-blue-500' },
  seven: { emoji: '7️⃣', name: 'Seven', color: 'text-green-600' }
} as const;

export const Symbol: React.FC<SymbolProps> = ({ 
  symbol, 
  showMultiplier, 
  multiplier, 
  className = '' 
}) => {
  const symbolConfig = SYMBOL_DISPLAY[symbol];
  
  return (
    <div className={`relative flex flex-col items-center p-4 bg-white rounded-lg shadow-md border-2 border-gray-200 ${className}`}>
      <div className={`text-4xl mb-2 ${symbolConfig.color}`}>
        {symbolConfig.emoji}
      </div>
      <div className="text-sm font-semibold text-gray-700 mb-1">
        {symbolConfig.name}
      </div>
      {showMultiplier && multiplier && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          {multiplier}x
        </div>
      )}
      {!showMultiplier && symbol === 'caishen' && (
        <div className="text-xs text-gray-500 mt-1">
          No multiplier
        </div>
      )}
    </div>
  );
};