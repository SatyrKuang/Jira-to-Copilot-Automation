import React from 'react';
import type { SpinResult } from '../types/game';
import { Symbol } from './Symbol';

interface ReelProps {
  spinResults: SpinResult[];
  isSpinning: boolean;
}

export const Reel: React.FC<ReelProps> = ({ spinResults, isSpinning }) => {
  return (
    <div className="flex justify-center space-x-4 p-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg">
      {spinResults.map((result, index) => (
        <div
          key={index}
          className={`transition-transform duration-300 ${
            isSpinning ? 'animate-bounce' : ''
          }`}
        >
          <Symbol
            symbol={result.symbol}
            showMultiplier={result.showMultiplier}
            multiplier={result.multiplier}
            className="transform hover:scale-105 transition-transform"
          />
        </div>
      ))}
    </div>
  );
};