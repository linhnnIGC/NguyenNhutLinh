import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { UnitSelection } from './components/UnitSelection';
import { QuizSetup } from './components/QuizSetup';
import { QuizRunner } from './components/QuizRunner';
import { Difficulty, SkillType, UnitDefinition } from './types';

enum ViewState {
  UNIT_SELECT,
  QUIZ_CONFIG,
  QUIZ_ACTIVE
}

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.UNIT_SELECT);
  const [selectedUnit, setSelectedUnit] = useState<UnitDefinition | null>(null);
  const [quizConfig, setQuizConfig] = useState<{skill: SkillType, difficulty: Difficulty} | null>(null);

  const handleUnitSelect = (unit: UnitDefinition) => {
    setSelectedUnit(unit);
    setViewState(ViewState.QUIZ_CONFIG);
  };

  const handleQuizStart = (skill: SkillType, difficulty: Difficulty) => {
    setQuizConfig({ skill, difficulty });
    setViewState(ViewState.QUIZ_ACTIVE);
  };

  const goHome = () => {
    setViewState(ViewState.UNIT_SELECT);
    setSelectedUnit(null);
    setQuizConfig(null);
  };

  const goBackToUnits = () => {
    setViewState(ViewState.UNIT_SELECT);
    setSelectedUnit(null);
  };

  return (
    <Layout onHome={goHome}>
      {viewState === ViewState.UNIT_SELECT && (
        <UnitSelection onSelectUnit={handleUnitSelect} />
      )}

      {viewState === ViewState.QUIZ_CONFIG && selectedUnit && (
        <QuizSetup 
          unit={selectedUnit} 
          onStart={handleQuizStart} 
          onBack={goBackToUnits}
        />
      )}

      {viewState === ViewState.QUIZ_ACTIVE && selectedUnit && quizConfig && (
        <QuizRunner
          unit={selectedUnit}
          skill={quizConfig.skill}
          difficulty={quizConfig.difficulty}
          onExit={goHome}
        />
      )}
    </Layout>
  );
};

export default App;