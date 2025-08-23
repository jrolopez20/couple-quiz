"use client";

import { useState } from 'react';

interface SetupScreenProps {
  onStartGame: (player1Name: string, player2Name: string) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (player1Name.trim() && player2Name.trim()) {
      onStartGame(player1Name.trim(), player2Name.trim());
      setError('');
    } else {
      setError('Please enter names for both partners.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center animate-fadeIn">
      <h1 className="text-3xl font-bold text-rose-500 mb-2">Couple Quiz</h1>
      <p className="text-gray-500 mb-6">Let&apos;s see how well we know each other!</p>
      <div className="space-y-4">
        {/* Player 1 Input with Female Icon (Venus Symbol) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v6.75m-3.375-3.375h6.75" />
            </svg>
          </div>
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Partner 1 Name"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
          />
        </div>
        {/* Player 2 Input with Male Icon (Mars Symbol) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 6.75L18 2.25m0 0H15m3 0v3" />
            </svg>
          </div>
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Partner 2 Name"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
      </div>
      <button
        onClick={handleStart}
        className="w-full mt-6 bg-rose-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-600 transition-transform transform hover:scale-105"
      >
        Start Game
      </button>
      {error && <div className="text-red-500 mt-4 text-sm font-medium">{error}</div>}
    </div>
  );
}
