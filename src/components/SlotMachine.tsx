import React, { useState } from 'react';
import type { GameState } from '../types/game';
import { generateSpin, calculateWinnings } from '../utils/gameLogic';
import { Reel } from './Reel';
import '../test/gameLogic.test'; // Import tests to run them

const INITIAL_GAME_STATE: GameState = {
  isFreeSpin: false,
  freeSpinsRemaining: 0,
  currentSpin: [],
  gameHistory: [],
  totalWins: 0,
};

export const SlotMachine: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [isSpinning, setIsSpinning] = useState(false);
  const [credits, setCredits] = useState(1000);

  const spin = async () => {
    if (isSpinning || (!gameState.isFreeSpin && credits < 10)) return;

    setIsSpinning(true);
    
    // Deduct credits for regular spins
    if (!gameState.isFreeSpin) {
      setCredits(prev => prev - 10);
    }

    // Simulate spinning animation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newSpin = generateSpin(5, gameState.isFreeSpin);
    const winnings = calculateWinnings(newSpin);

    setGameState(prev => {
      const newHistory = [...prev.gameHistory, newSpin];
      const newFreeSpinsRemaining = prev.isFreeSpin ? prev.freeSpinsRemaining - 1 : 0;
      const isStillInFreeSpin = prev.isFreeSpin && newFreeSpinsRemaining > 0;

      return {
        ...prev,
        currentSpin: newSpin,
        gameHistory: newHistory,
        totalWins: prev.totalWins + winnings,
        freeSpinsRemaining: newFreeSpinsRemaining,
        isFreeSpin: isStillInFreeSpin,
      };
    });

    setCredits(prev => prev + winnings);
    setIsSpinning(false);
  };

  const triggerFreeSpin = () => {
    setGameState(prev => ({
      ...prev,
      isFreeSpin: true,
      freeSpinsRemaining: 10,
    }));
  };

  const demonstrateIssue = () => {
    // Force a specific scenario: Caishen before Yuanbao during free spin
    const demonstrationSpin = [
      { symbol: 'caishen' as const, position: 0, showMultiplier: false, multiplier: 3 },
      { symbol: 'bell' as const, position: 1, showMultiplier: false, multiplier: 1 },
      { symbol: 'yuanbao' as const, position: 2, showMultiplier: false, multiplier: 2 },
      { symbol: 'cherry' as const, position: 3, showMultiplier: false, multiplier: 1 },
      { symbol: 'bar' as const, position: 4, showMultiplier: false, multiplier: 1 }
    ];

    // Apply the free spin logic
    import('../utils/gameLogic').then(({ applyFreeSpinMultiplierLogic }) => {
      applyFreeSpinMultiplierLogic(demonstrationSpin);
      
      setGameState(prev => ({
        ...prev,
        isFreeSpin: true,
        freeSpinsRemaining: 5,
        currentSpin: demonstrationSpin,
        gameHistory: [...prev.gameHistory, demonstrationSpin],
      }));

      const winnings = calculateWinnings(demonstrationSpin);
      setCredits(prev => prev + winnings);
    });
  };

  const resetGame = () => {
    setGameState(INITIAL_GAME_STATE);
    setCredits(1000);
  };

  const hasResults = gameState.currentSpin.length > 0;
  const canSpin = !isSpinning && (gameState.isFreeSpin || credits >= 10);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">
        Caishen Slot Machine
      </h1>
      
      {/* Game Info */}
      <div className="flex justify-between items-center mb-6 bg-black bg-opacity-30 rounded-lg p-4">
        <div className="text-white">
          <span className="text-lg font-semibold">Credits: </span>
          <span className="text-xl font-bold text-yellow-400">{credits}</span>
        </div>
        <div className="text-white">
          <span className="text-lg font-semibold">Total Wins: </span>
          <span className="text-xl font-bold text-green-400">{gameState.totalWins}</span>
        </div>
        {gameState.isFreeSpin && (
          <div className="text-white bg-red-600 px-4 py-2 rounded-lg">
            <span className="text-lg font-semibold">Free Spins: </span>
            <span className="text-xl font-bold">{gameState.freeSpinsRemaining}</span>
          </div>
        )}
      </div>

      {/* Reel */}
      {hasResults && (
        <div className="mb-6">
          <Reel spinResults={gameState.currentSpin} isSpinning={isSpinning} />
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={spin}
          disabled={!canSpin}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
            canSpin
              ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          {isSpinning ? 'Spinning...' : gameState.isFreeSpin ? 'Free Spin!' : 'Spin (10 credits)'}
        </button>
        
        <button
          onClick={triggerFreeSpin}
          disabled={gameState.isFreeSpin}
          className="px-6 py-3 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
        >
          Trigger Free Spins
        </button>
        
        <button
          onClick={demonstrateIssue}
          className="px-6 py-3 rounded-lg font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all"
        >
          Demo Issue Fix
        </button>
        
        <button
          onClick={resetGame}
          className="px-6 py-3 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-all"
        >
          Reset Game
        </button>
      </div>

      {/* Game Rules */}
      <div className="bg-black bg-opacity-30 rounded-lg p-4 text-white text-sm">
        <h3 className="font-bold mb-2">Game Rules:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Regular spins cost 10 credits</li>
          <li>During Free Spins: If Caishen appears earlier than Yuanbao, Caishen shows no multiplier</li>
          <li>Symbols: Caishen (3x), Yuanbao (2x), Seven (5x), Cherry/Bell/Bar (1x)</li>
        </ul>
      </div>
    </div>
  );
};