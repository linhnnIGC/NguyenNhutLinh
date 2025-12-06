import React from 'react';
import { Difficulty, SkillType, UnitDefinition } from '../types';
import { BookType, BrainCircuit, BookOpenText, Gauge, ChevronLeft } from 'lucide-react';

interface QuizSetupProps {
  unit: UnitDefinition;
  onStart: (skill: SkillType, difficulty: Difficulty) => void;
  onBack: () => void;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({ unit, onStart, onBack }) => {
  const [selectedSkill, setSelectedSkill] = React.useState<SkillType>(SkillType.VOCABULARY);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>(Difficulty.MEDIUM);

  return (
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center text-teal-600 hover:text-teal-800 mb-6 font-medium transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Units
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-teal-500">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{unit.title}</h2>
        <p className="text-slate-500 mb-8">{unit.topic}</p>

        {/* Skill Selection */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
            Select Activity Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[SkillType.VOCABULARY, SkillType.GRAMMAR, SkillType.READING].map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selectedSkill === skill
                    ? 'border-teal-500 bg-teal-50 text-teal-800'
                    : 'border-slate-100 bg-white text-slate-500 hover:border-teal-200'
                }`}
              >
                {skill === SkillType.VOCABULARY && <BookType className="w-6 h-6 mb-2" />}
                {skill === SkillType.GRAMMAR && <BrainCircuit className="w-6 h-6 mb-2" />}
                {skill === SkillType.READING && <BookOpenText className="w-6 h-6 mb-2" />}
                <span className="font-semibold text-sm">{skill}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
            <span className="font-semibold text-teal-700">Focus: </span>
            {selectedSkill === SkillType.VOCABULARY && unit.vocabularyFocus}
            {selectedSkill === SkillType.GRAMMAR && unit.grammarFocus}
            {selectedSkill === SkillType.READING && "Reading comprehension skills"}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-10">
          <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
            Select Difficulty
          </label>
          <div className="flex gap-4">
            {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedDifficulty === diff
                    ? diff === Difficulty.EASY ? 'bg-green-100 text-green-800 ring-2 ring-green-500' :
                      diff === Difficulty.MEDIUM ? 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-500' :
                      'bg-red-100 text-red-800 ring-2 ring-red-500'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <Gauge className="w-4 h-4" />
                {diff}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStart(selectedSkill, selectedDifficulty)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Start Practice
        </button>
      </div>
    </div>
  );
};