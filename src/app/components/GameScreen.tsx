"use client";

import { Player } from '../page';

// --- Type Definitions ---
interface GameScreenProps {
    question: string;
    players: { player1: Player; player2: Player };
    onAnswer: (playerNumber: 1 | 2, wasCorrect: boolean) => void;
    answers: { p1: boolean | null; p2: boolean | null };
    questionNumber: number;
    totalQuestions: number;
}

export default function GameScreen({
    question,
    players,
    onAnswer,
    answers,
    questionNumber,
    totalQuestions
}: GameScreenProps) {

    const getFeedbackMessage = () => {
        if (answers.p1 && answers.p2) {
            return 'Great! Moving to the next question...';
        }
        if (answers.p1) {
            return `Waiting for ${players.player2.name}...`;
        }
        if (answers.p2) {
            return `Waiting for ${players.player1.name}...`;
        }
        return 'Both players, please answer!';
    };

    // Calculate progress percentage, ensuring totalQuestions is not zero to avoid division by zero
    const player1Progress = totalQuestions > 0 ? (players.player1.score / totalQuestions) * 100 : 0;
    const player2Progress = totalQuestions > 0 ? (players.player2.score / totalQuestions) * 100 : 0;

    return (
        <div className="animate-fadeIn">
            {/* --- Score and Progress Header --- */}
            <div className="text-center mb-4">
                <p className="text-xl font-semibold">
                    Question {questionNumber} of {totalQuestions}
                </p>
                <div className="grid grid-cols-2 gap-x-4 items-center mt-4">
                    {/* Player 1 Progress Bar */}
                    <div className="text-left">
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-rose-700">{players.player1.name}</span>
                            {/* <span className="text-sm font-medium text-rose-700">{players.player1.score}</span> */}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-rose-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${player1Progress}%` }}
                            ></div>
                        </div>
                    </div>
                    {/* Player 2 Progress Bar */}
                    <div className="text-left">
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-indigo-700">{players.player2.name}</span>
                            {/* <span className="text-sm font-medium text-indigo-700">{players.player2.score}</span> */}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${player2Progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Main Game Card --- */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <p className="text-2xl font-medium min-h-[6rem] flex items-center justify-center mb-8">
                    {question}
                </p>

                {/* --- Player 1 Answer Area --- */}
                <div className="mb-6">
                    <p className="font-semibold text-lg text-rose-600 mb-2">{players.player1.name}&apos;s Answer</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => onAnswer(1, true)}
                            disabled={answers.p1 !== null}
                            className="text-4xl p-3 rounded-full bg-green-100 hover:bg-green-200 transition transform hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            title="Correct Answer"
                            aria-label="Correct Answer"
                        >
                            👍
                        </button>
                        <button
                            onClick={() => onAnswer(1, false)}
                            disabled={answers.p1 !== null}
                            className="text-4xl p-3 rounded-full bg-red-100 hover:bg-red-200 transition transform hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            title="Incorrect Answer"
                            aria-label="Incorrect Answer"
                        >
                            👎
                        </button>
                    </div>
                </div>

                {/* --- Player 2 Answer Area --- */}
                <div>
                    <p className="font-semibold text-lg text-indigo-600 mb-2">{players.player2.name}&apos;s Answer</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => onAnswer(2, true)}
                            disabled={answers.p2 !== null}
                            className="text-4xl p-3 rounded-full bg-green-100 hover:bg-green-200 transition transform hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            title="Correct Answer"
                            aria-label="Correct Answer"
                        >
                            👍
                        </button>
                        <button
                            onClick={() => onAnswer(2, false)}
                            disabled={answers.p2 !== null}
                            className="text-4xl p-3 rounded-full bg-red-100 hover:bg-red-200 transition transform hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            title="Incorrect Answer"
                            aria-label="Incorrect Answer"
                        >
                            👎
                        </button>
                    </div>
                </div>

                {/* --- Feedback Message --- */}
                <div className="mt-8 text-sm text-gray-500 min-h-[1.25rem]">
                    {getFeedbackMessage()}
                </div>
            </div>
        </div>
    );
}
