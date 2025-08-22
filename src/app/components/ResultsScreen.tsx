"use client";

import { Player } from '../page'; // Import the Player type

interface ResultsScreenProps {
  players: { player1: Player; player2: Player };
  onPlayAgain: () => void;
}

export default function ResultsScreen({ players, onPlayAgain }: ResultsScreenProps) {
  const { player1, player2 } = players;
  let winnerMessage = "It's a tie! You both know each other so well!";

  if (player1.score > player2.score) {
    winnerMessage = `🎉 ${player1.name} is the winner! 🎉`;
  } else if (player2.score > player1.score) {
    winnerMessage = `🎉 ${player2.name} is the winner! 🎉`;
  }

  return (
    <div className="text-center bg-white p-8 rounded-2xl shadow-lg animate-fadeIn">
      <h2 className="text-3xl font-bold text-rose-500 mb-4">Quiz Complete!</h2>
      <div className="text-2xl font-semibold mb-2">{winnerMessage}</div>
      <p className="text-gray-600 mb-6">Final Scores:</p>
      <div className="space-y-2 text-lg">
        <p>{player1.name}: {player1.score} points</p>
        <p>{player2.name}: {player2.score} points</p>
      </div>
      <button
        onClick={onPlayAgain}
        className="w-full mt-8 bg-rose-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-600 transition-transform transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
}
