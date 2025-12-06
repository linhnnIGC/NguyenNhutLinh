import React, { useState, useEffect } from 'react';
import { Difficulty, Question, SkillType, UnitDefinition } from '../types';
import { generateQuiz } from '../services/geminiService';
import { Loader2, CheckCircle2, XCircle, RefreshCcw, Home } from 'lucide-react';

interface QuizRunnerProps {
  unit: UnitDefinition;
  skill: SkillType;
  difficulty: Difficulty;
  onExit: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ unit, skill, difficulty, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const generated = await generateQuiz(unit, skill, difficulty);
        setQuestions(generated);
      } catch (err) {
        setError("Failed to generate quiz. Please check your connection or try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [unit, skill, difficulty]);

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    setIsAnswered(true);
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-teal-800">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-medium animate-pulse">Designing your {skill.toLowerCase()} exercises...</p>
        <p className="text-sm text-teal-600 mt-2">Consulting Global Success Unit {unit.id}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button onClick={onExit} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Return Home
        </button>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-teal-600 p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="opacity-90">{unit.title} - {difficulty}</p>
        </div>
        <div className="p-8 text-center">
          <div className="mb-8">
            <span className="text-6xl font-bold text-teal-600">{score}</span>
            <span className="text-3xl text-slate-400">/{questions.length}</span>
          </div>
          
          <div className="space-y-2 mb-8">
            <p className="text-xl font-medium text-slate-800">
              {percentage >= 80 ? "Excellent Work! 🌟" : percentage >= 50 ? "Good Job! 👍" : "Keep Practicing! 💪"}
            </p>
            <p className="text-slate-500">
              You've completed 10 questions on {skill.toLowerCase()}.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={onExit}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium transition-colors"
            >
              <Home size={18} /> Home
            </button>
            <button 
              onClick={() => window.location.reload()} // Quickest way to reset without complex state passing for demo
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
            >
              <RefreshCcw size={18} /> New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 flex items-center justify-between text-sm font-medium text-slate-500">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-teal-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
          {currentQ.questionText}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let itemClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
            
            if (isAnswered) {
              if (option === currentQ.correctAnswer) {
                itemClass += "border-green-500 bg-green-50 text-green-800";
              } else if (option === selectedAnswer) {
                itemClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                itemClass += "border-slate-100 opacity-50";
              }
            } else {
              if (selectedAnswer === option) {
                itemClass += "border-teal-500 bg-teal-50 text-teal-800 shadow-sm";
              } else {
                itemClass += "border-slate-100 hover:border-teal-200 hover:bg-slate-50 text-slate-700";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
                className={itemClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && option === currentQ.correctAnswer && <CheckCircle2 className="text-green-600 w-5 h-5"/>}
                  {isAnswered && option === selectedAnswer && option !== currentQ.correctAnswer && <XCircle className="text-red-500 w-5 h-5"/>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100 animate-in fade-in slide-in-from-top-2">
            <span className="font-bold">Explanation:</span> {currentQ.explanation}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={checkAnswer}
            disabled={!selectedAnswer}
            className="px-8 py-3 bg-teal-600 text-white rounded-xl font-semibold shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-8 py-3 bg-slate-800 text-white rounded-xl font-semibold shadow-md hover:bg-slate-900 transition-colors flex items-center gap-2"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"} <div className="w-2 h-2 border-r-2 border-t-2 border-white rotate-45" />
          </button>
        )}
      </div>
    </div>
  );
};