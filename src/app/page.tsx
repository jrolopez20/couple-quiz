"use client";

import { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';

// Define the structure of a question
interface Question {
  question: string;
}

// Define the structure for player data
export interface Player {
  name: string;
  score: number;
}

export default function Home() {
  // --- State Management ---
  const [gameState, setGameState] = useState<'setup' | 'game' | 'results'>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [players, setPlayers] = useState<{ player1: Player; player2: Player }>({
    player1: { name: '', score: 0 },
    player2: { name: '', score: 0 },
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answers as an array of objects, e.g., [{ p1: 'John', p2: 'Jane' }]
  const [answers, setAnswers] = useState<{ p1: string | null; p2: string | null }[]>([]);

  // --- Effects ---

  // Fetch questions from the JSON file on initial component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/questions.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
        // Initialize the answers array based on the number of questions
        setAnswers(Array(data.length).fill({ p1: null, p2: null }));
      } catch (error) {
        console.error("Could not load questions:", error);
        // You could add state here to show an error message to the user
      }
    };

    fetchQuestions();
  }, []);

  // --- Game Logic Functions ---

  /**
   * Starts the game with the provided player names.
   * @param player1Name - The name of the first player.
   * @param player2Name - The name of the second player.
   */
  const handleStartGame = (player1Name: string, player2Name: string) => {
    setPlayers({
      player1: { name: player1Name, score: 0 },
      player2: { name: player2Name, score: 0 },
    });
    setGameState('game');
  };

  /**
   * Handles a player's answer, updates scores, and moves to the next question.
   * @param playerNumber - 1 or 2, indicating which player answered.
   * @param choice - The name chosen as the answer.
   */
  const handleAnswer = (playerNumber: 1 | 2, choice: string) => {
    const newAnswers = [...answers];
    const currentAnswer = { ...newAnswers[currentQuestionIndex] };

    if (playerNumber === 1) {
      currentAnswer.p1 = choice;
    } else {
      currentAnswer.p2 = choice;
    }
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);

    // Check if both players have answered the current question
    if (currentAnswer.p1 && currentAnswer.p2) {
      // If answers match, both players get a point
      if (currentAnswer.p1 === currentAnswer.p2) {
        setPlayers(prev => ({
          player1: { ...prev.player1, score: prev.player1.score + 1 },
          player2: { ...prev.player2, score: prev.player2.score + 1 },
        }));
      }

      // Move to the next question or end the game
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
          setGameState('results');
        }
      }, 1500); // Wait a moment to show feedback
    }
  };

  /**
   * Resets the game to its initial state to play again.
   */
  const handlePlayAgain = () => {
    setGameState('setup');
    setCurrentQuestionIndex(0);
    setPlayers({
      player1: { name: '', score: 0 },
      player2: { name: '', score: 0 },
    });
    setAnswers(Array(questions.length).fill({ p1: null, p2: null }));
  };

  // --- Render Logic ---

  /**
   * Renders the current screen based on the game state.
   */
  const renderScreen = () => {
    switch (gameState) {
      case 'game':
        return (
          <GameScreen
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            players={players}
            answers={answers[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            players={players}
            onPlayAgain={handlePlayAgain}
          />
        );
      case 'setup':
      default:
        return (
          <SetupScreen onStartGame={handleStartGame} />
        );
    }
  };

  return (
    <main className="bg-rose-50 text-gray-800 flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto p-4">
        {renderScreen()}
      </div>
    </main>
  );
}
