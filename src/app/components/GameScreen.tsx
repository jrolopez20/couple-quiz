"use client";

import { Player } from '../page'; // Import the Player type

interface GameScreenProps {
  questions: { question: string }[];
  currentQuestionIndex: number;
  players: { player1: Player; player2: Player };
  answers: { p1: string | null; p2: string | null };
  onAnswer: (playerNumber: 1 | 2, choice: string) => void;
}

export default function GameScreen({ questions, currentQuestionIndex, players, answers, onAnswer }: GameScreenProps) {
  const currentQuestion = questions[currentQuestionIndex];
  const bothAnswered = answers.p1 && answers.p2;

  const getFeedbackMessage = () => {
    if (bothAnswered) {
      return answers.p1 === answers.p2 
        ? "You agree! Point for both!" 
        : "You disagree! No points this round.";
    }
    if (answers.p1) {
      return `Waiting for ${players.player2.name}...`;
    }
    if (answers.p2) {
      return `Waiting for ${players.player1.name}...`;
    }
    return '';
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <div className="flex justify-between items-center mt-2 text-lg">
          <div className="font-bold text-rose-500">{players.player1.name}: {players.player1.score}</div>
          <div className="font-bold text-indigo-500">{players.player2.name}: {players.player2.score}</div>
        </div>
      </div>

      <div className="quiz-container bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
        <div
          className="slider flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentQuestionIndex * 100}%)` }}
        >
          {questions.map((q, index) => (
            <div key={index} className="card flex-shrink-0 w-full text-center">
              <p className="text-2xl font-medium mb-8 min-h-[6rem] flex items-center justify-center">
                {q.question}
              </p>
              {index === currentQuestionIndex && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => onAnswer(1, players.player1.name)}
                    disabled={!!answers.p1}
                    className="answer-btn w-full bg-rose-200 text-rose-800 font-bold py-4 px-4 rounded-lg hover:bg-rose-300 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {players.player1.name}
                  </button>
                   <button
                    onClick={() => onAnswer(1, players.player2.name)}
                    disabled={!!answers.p1}
                    className="answer-btn w-full bg-rose-200 text-rose-800 font-bold py-4 px-4 rounded-lg hover:bg-rose-300 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {players.player2.name}
                  </button>
                  <button
                    onClick={() => onAnswer(2, players.player1.name)}
                    disabled={!!answers.p2}
                    className="answer-btn w-full bg-indigo-200 text-indigo-800 font-bold py-4 px-4 rounded-lg hover:bg-indigo-300 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {players.player1.name}
                  </button>
                  <button
                    onClick={() => onAnswer(2, players.player2.name)}
                    disabled={!!answers.p2}
                    className="answer-btn w-full bg-indigo-200 text-indigo-800 font-bold py-4 px-4 rounded-lg hover:bg-indigo-300 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {players.player2.name}
                  </button>
                </div>
              )}
              <div className="mt-4 text-sm text-gray-500 min-h-[1.25rem]">
                {index === currentQuestionIndex && getFeedbackMessage()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
