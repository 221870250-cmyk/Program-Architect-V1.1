export type Language = 'en' | 'zh';

export interface PRRecord {
  id: string;
  date: string;
  squat: number;
  bench: number;
  deadlift: number;
}

export interface UserProfile {
  id: string; // Unique ID for multi-user
  name: string;
  experience: number; // Years of training
  bodyweight: number;
  squatCurrent: number;
  benchCurrent: number;
  deadliftCurrent: number;
  squatGoal: number;
  benchGoal: number;
  deadliftGoal: number;
  weeks: number;
  history: PRRecord[];
  sessionNotes?: Record<string, string>; // Key: "week-dayIndex", Value: note content
}

export interface SetScheme {
  sets: number;
  reps: number;
  percentage: number;
  weight: number;
  rpe?: number;
}

export interface AccessoryExercise {
  name: string;
  sets: number;
  reps: string;
  description?: string;
}

export interface WeeklyLiftData {
  name: string;
  dayType: 'S' | 'B' | 'D' | 'U' | 'L';
  mainSets: SetScheme[];
  variation: string;
  accessories: AccessoryExercise[];
}

export interface TrainingWeek {
  weekNumber: number;
  phase: 'Accumulation' | 'Transmutation' | 'Realization' | 'Taper' | 'Deload'; // Added Taper
  taperPart?: 1 | 2 | 3; // Specific Taper Part
  lifts: WeeklyLiftData[];
  volumeLoad: number;
  intensityAvg: number;
}

export interface FeasibilityResult {
  status: 'missing' | 'optimal' | 'aggressive' | 'extreme' | 'impossible';
  color: string;
  extraData?: string;
}

export interface TaperRecommendation {
  category: 1 | 2 | 3;
  duration: number; // Weeks
  description: string;
  minCycleLength: number;
}

export enum LiftType {
  SQUAT = 'SQUAT',
  BENCH = 'BENCH',
  DEADLIFT = 'DEADLIFT',
}