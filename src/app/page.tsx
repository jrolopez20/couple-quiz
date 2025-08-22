"use client";

import { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';

// --- Type Definitions ---
interface Question {
  question: string;
}

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
  // Tracks who has answered the current question: { p1: boolean, p2: boolean }
  const [answers, setAnswers] = useState<{ p1: boolean | null; p2: boolean | null }>({ p1: null, p2: null });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- Effects ---

  // Fetch questions from the JSON file on initial component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/questions.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Could not load questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // --- Game Logic Functions ---

  const handleStartGame = (player1Name: string, player2Name: string) => {
    setPlayers({
      player1: { name: player1Name, score: 0 },
      player2: { name: player2Name, score: 0 },
    });
    setGameState('game');
  };

  /**
   * Handles a player's answer.
   * @param playerNumber - 1 or 2, indicating which player answered.
   * @param wasCorrect - true if they clicked '👍', false for '👎'.
   */
  const handleAnswer = (playerNumber: 1 | 2, wasCorrect: boolean) => {
    if (isTransitioning) return; // Prevent clicks during transitions

    const newAnswers = { ...answers };
    let bothAnswered = false;

    if (playerNumber === 1 && newAnswers.p1 === null) {
      if (wasCorrect) {
        setPlayers(p => ({ ...p, player1: { ...p.player1, score: p.player1.score + 1 } }));
      }
      newAnswers.p1 = true;
      bothAnswered = newAnswers.p2 !== null;
    } else if (playerNumber === 2 && newAnswers.p2 === null) {
      if (wasCorrect) {
        setPlayers(p => ({ ...p, player2: { ...p.player2, score: p.player2.score + 1 } }));
      }
      newAnswers.p2 = true;
      bothAnswered = newAnswers.p1 !== null;
    }
    
    setAnswers(newAnswers);

    if (bothAnswered) {
      setIsTransitioning(true);
      setTimeout(() => {
        // Move to the next question or end the game
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(i => i + 1);
          setAnswers({ p1: null, p2: null }); // Reset answers for next question
        } else {
          setGameState('results');
        }
        setIsTransitioning(false);
      }, 1500); // Wait a moment before moving on
    }
  };

  const handlePlayAgain = () => {
    setGameState('setup');
    setCurrentQuestionIndex(0);
    setPlayers({ player1: { name: '', score: 0 }, player2: { name: '', score: 0 } });
    setAnswers({ p1: null, p2: null });
    setIsTransitioning(false);
  };

  // --- Render Logic ---
  const renderScreen = () => {
    switch (gameState) {
      case 'game':
        return (
          <GameScreen
            question={questions[currentQuestionIndex]?.question}
            players={players}
            onAnswer={handleAnswer}
            answers={answers}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        );
      case 'results':
        return <ResultsScreen players={players} onPlayAgain={handlePlayAgain} />;
      case 'setup':
      default:
        return <SetupScreen onStartGame={handleStartGame} />;
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
