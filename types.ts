export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export enum SkillType {
  VOCABULARY = 'Vocabulary',
  GRAMMAR = 'Grammar',
  READING = 'Reading'
}

export interface UnitDefinition {
  id: number;
  title: string;
  topic: string;
  vocabularyFocus: string;
  grammarFocus: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string; // The correct string value
  explanation: string;
}

export interface QuizSession {
  unitId: number;
  skill: SkillType;
  difficulty: Difficulty;
  questions: Question[];
}