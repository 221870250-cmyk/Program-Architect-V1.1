import { TrainingWeek, UserProfile, WeeklyLiftData, LiftType, SetScheme, AccessoryExercise, FeasibilityResult, TaperRecommendation } from '../types';
import { VARIATIONS, ACCESSORY_POOLS } from '../constants';

// Utility: Round to nearest 2.5kg
const roundToPlates = (weight: number): number => {
  return Math.round(weight / 2.5) * 2.5;
};

// Utility: Get specific accessories based on lift type and count
const getAccessories = (type: LiftType, count: number): AccessoryExercise[] => {
  let pool: string[] = [];
  if (type === LiftType.SQUAT) pool = ACCESSORY_POOLS.SQUAT_ACC;
  if (type === LiftType.BENCH) pool = ACCESSORY_POOLS.BENCH_ACC;
  if (type === LiftType.DEADLIFT) pool = ACCESSORY_POOLS.DEADLIFT_ACC;

  const selected = pool.slice(0, count); 
  
  return selected.map(name => ({
    name,
    sets: 3,
    reps: "10-15"
  }));
};

// --- FEASIBILITY CHECK ---
export const checkFeasibility = (profile: UserProfile): FeasibilityResult => {
  const { bodyweight, squatCurrent, squatGoal, benchCurrent, benchGoal, deadliftCurrent, deadliftGoal, weeks } = profile;

  if (!bodyweight || bodyweight <= 0) {
    return { status: 'missing', color: 'text-gray-500' };
  }

  const totalCurrent = squatCurrent + benchCurrent + deadliftCurrent;
  const totalGoal = squatGoal + benchGoal + deadliftGoal;
  const totalGain = totalGoal - totalCurrent;
  
  if (totalGain <= 0) {
      return { status: 'optimal', color: 'text-blue-500' };
  }

  const weeklyGain = totalGain / Math.max(1, weeks);
  const gainPercentOfBW = (totalGain / bodyweight) * 100;

  if (gainPercentOfBW > 30) {
      return { status: 'impossible', color: 'text-red-600', extraData: gainPercentOfBW.toFixed(0) };
  }

  if (weeklyGain > 5) {
      return { status: 'extreme', color: 'text-red-500' };
  }

  if (weeklyGain > 1.25) {
      return { status: 'aggressive', color: 'text-amber-500' };
  }

  return { status: 'optimal', color: 'text-emerald-500' };
};

// --- TAPER LOGIC ENGINE ---

export const calculateTaperCategory = (profile: UserProfile): TaperRecommendation => {
    const { bodyweight, experience, squatCurrent, benchCurrent, deadliftCurrent } = profile;
    const total = squatCurrent + benchCurrent + deadliftCurrent;

    let score = 0;

    // 1. Bodyweight Score
    const bwLbs = bodyweight * 2.20462;
    if (bwLbs < 165) score += 1;
    else if (bwLbs <= 220) score += 2;
    else score += 3;

    // 2. Total Strength Score (Approximation of Class 2 / Class 1 / Elite without full tables)
    const ratio = total / (bodyweight || 80);
    if (ratio < 5.5) score += 1;
    else if (ratio < 7.0) score += 2;
    else score += 3;

    // 3. Experience Score
    if (experience < 3) score += 1;
    else if (experience <= 6) score += 2;
    else score += 3;

    let category: 1 | 2 | 3 = 1;
    if (score >= 5 && score <= 6) category = 2;
    if (score >= 7) category = 3;

    return {
        category,
        duration: category,
        minCycleLength: category + 6,
        description: `Category ${category}`
    };
};


// Core Logic: Generate the entire program
export const generateProgram = (profile: UserProfile): TrainingWeek[] => {
  const { squatCurrent, benchCurrent, deadliftCurrent, squatGoal, benchGoal, deadliftGoal, weeks } = profile;
  const program: TrainingWeek[] = [];
  
  const taperRec = calculateTaperCategory(profile);
  const taperWeeks = taperRec.duration;
  const trainingWeeks = Math.max(0, weeks - taperWeeks);

  for (let w = 1; w <= weeks; w++) {
    // 1. Determine Phase
    let phase: TrainingWeek['phase'] = 'Accumulation';
    let taperPart: 1 | 2 | 3 | undefined = undefined;

    const weeksRemaining = weeks - w + 1;
    
    if (weeksRemaining <= taperWeeks) {
        phase = 'Taper';
        if (taperWeeks === 1) {
             taperPart = 3; 
        } else if (taperWeeks === 2) {
             taperPart = weeksRemaining === 2 ? 2 : 3;
        } else {
             if (weeksRemaining === 3) taperPart = 1;
             if (weeksRemaining === 2) taperPart = 2;
             if (weeksRemaining === 1) taperPart = 3;
        }
    } else {
        const progress = w / trainingWeeks;
        if (progress > 0.40) phase = 'Transmutation';
        if (progress > 0.85) phase = 'Realization'; 
        if (w % 4 === 0) phase = 'Deload';
    }

    // 2. Interpolate Theoretical 1RM
    const linearProgress = w / weeks;
    const sMax = squatCurrent + (squatGoal - squatCurrent) * linearProgress;
    const bMax = benchCurrent + (benchGoal - benchCurrent) * linearProgress;
    const dMax = deadliftCurrent + (deadliftGoal - deadliftCurrent) * linearProgress;

    // 3. Generate Lifts
    const lifts: WeeklyLiftData[] = [];
    const waveIndex = (w % 4);

    if (phase === 'Taper') {
        lifts.push(generateTaperLift(LiftType.SQUAT, sMax, taperPart!, 'S'));
        lifts.push(generateTaperLift(LiftType.BENCH, bMax, taperPart!, 'B'));
        lifts.push(generateTaperLift(LiftType.DEADLIFT, dMax, taperPart!, 'D'));
        
    } else if (phase === 'Deload') {
        lifts.push(generateLiftConfig(LiftType.SQUAT, sMax, phase, waveIndex, 'S', false));
        lifts.push(generateLiftConfig(LiftType.BENCH, bMax, phase, waveIndex, 'B', false));
        lifts.push(generateLiftConfig(LiftType.DEADLIFT, dMax, phase, waveIndex, 'D', false));
    } else {
        // --- Standard Training Weeks ---
        
        // Day 1: Squat Focus (Primary)
        lifts.push(generateLiftConfig(LiftType.SQUAT, sMax, phase, waveIndex, 'S', false));
        
        // Day 2: Bench Focus (Primary)
        lifts.push(generateLiftConfig(LiftType.BENCH, bMax, phase, waveIndex, 'B', false));
        
        // Day 3: Deadlift Focus (Primary)
        lifts.push(generateLiftConfig(LiftType.DEADLIFT, dMax, phase, waveIndex, 'D', false));

        // Day 4: Bench Variation (Secondary/Hypertrophy)
        // If Realization, we might skip or go very light, but for structure we keep it as technique work
        if (phase !== 'Realization') {
            const b2 = generateLiftConfig(LiftType.BENCH, bMax, phase, waveIndex, 'B', true);
            b2.name = "Bench Variation"; // Title of the day
            // Accessories specific to secondary bench day
            b2.accessories = [
                { name: "Dips", sets: 3, reps: "AMRAP" },
                { name: "Face Pulls", sets: 4, reps: "15" }
            ];
            lifts.push(b2);
        }

        // Day 5: Squat Variation (Secondary)
        if (phase !== 'Realization') {
            const s2 = generateLiftConfig(LiftType.SQUAT, sMax, phase, waveIndex, 'S', true);
            s2.name = "Squat Variation"; // Title of the day
            s2.accessories = [
                { name: "Leg Press", sets: 4, reps: "12" },
                { name: "Leg Curl", sets: 4, reps: "12" }
            ];
            lifts.push(s2);
        }
    }

    // Calculate Volume Load
    let volumeLoad = 0;
    let intensitySum = 0;
    let count = 0;
    lifts.forEach(l => {
        l.mainSets.forEach(s => {
            volumeLoad += s.sets * s.reps * s.weight;
            intensitySum += s.percentage;
            count++;
        });
    });

    program.push({
      weekNumber: w,
      phase,
      taperPart,
      lifts,
      volumeLoad,
      intensityAvg: count > 0 ? intensitySum / count : 0,
    });
  }

  return program;
};

const generateTaperLift = (
    type: LiftType,
    max: number,
    part: 1 | 2 | 3,
    dayType: 'S'|'B'|'D'
): WeeklyLiftData => {
    let sets = 3;
    let reps = 3;
    let percentage = 0.80;
    let accessories: AccessoryExercise[] = [];
    
    // Taper lifts are always the main competition lifts
    const variationName = type === LiftType.SQUAT ? "Competition Squat" 
                        : type === LiftType.BENCH ? "Competition Bench Press" 
                        : "Competition Deadlift";

    if (part === 1) {
        sets = 4; reps = 3; percentage = 0.85; 
        accessories = getAccessories(type, 1);
    } else if (part === 2) {
        sets = 3; reps = 1; percentage = 0.90; 
        accessories = []; 
    } else {
        sets = 2; reps = 2; percentage = 0.50; 
        accessories = [];
    }

    const weight = roundToPlates(max * percentage);

    return {
        name: type === LiftType.SQUAT ? 'Squat' : type === LiftType.BENCH ? 'Bench Press' : 'Deadlift',
        dayType,
        mainSets: [{ sets, reps, percentage: percentage * 100, weight }],
        variation: variationName, // Explicit exercise name
        accessories
    };
};

const generateLiftConfig = (
  type: LiftType, 
  theoreticalMax: number, 
  phase: string, 
  waveIndex: number, 
  dayType: 'S'|'B'|'D',
  isSecondary: boolean
): WeeklyLiftData => {
  let sets = 0;
  let reps = 0;
  let percentage = 0;
  let variation = '';
  let accessories: AccessoryExercise[] = [];

  const waveMod = waveIndex === 1 ? 0 : waveIndex === 2 ? 0.025 : 0.05;

  if (phase === 'Deload') {
      sets = 2; reps = 5; percentage = 0.50; 
      variation = getCompLiftName(type);
      accessories = [{ name: "Mobility Work", sets: 1, reps: "15 min" }];
  } else if (!isSecondary) {
      // --- PRIMARY DAY: COMPETITION LIFT ---
      variation = getCompLiftName(type);
      
      if (phase === 'Accumulation') {
          sets = 5 - (waveIndex === 3 ? 1 : 0); 
          reps = 8; 
          percentage = 0.65 + waveMod; 
          accessories = getAccessories(type, 3);
      } else if (phase === 'Transmutation') {
          sets = 4;
          reps = 5; 
          percentage = 0.75 + waveMod;
          accessories = getAccessories(type, 2);
      } else { // Realization
          sets = 3;
          reps = 3; 
          percentage = 0.85 + waveMod;
          accessories = getAccessories(type, 1); 
      }
  } else {
      // --- SECONDARY DAY: VARIATION ---
      
      // Determine variation based on phase logic
      if (phase === 'Accumulation') {
          // Hypertrophy / ROM / Time Under Tension
          if (type === LiftType.BENCH) variation = "Close-Grip Bench";
          else if (type === LiftType.SQUAT) variation = "Pause Squat";
          else variation = "Deficit Deadlift";
          
          sets = 3; reps = 10; percentage = 0.55 + waveMod;
      } else if (phase === 'Transmutation') {
          // Strength / Sticking Point
          if (type === LiftType.BENCH) variation = "Spoto Press";
          else if (type === LiftType.SQUAT) variation = "Pin Squat";
          else variation = "Block Pull";

          sets = 4; reps = 5; percentage = 0.70 + waveMod;
      } else {
          // Realization - shouldn't happen much due to loop logic, but fallback
          variation = getCompLiftName(type);
          sets = 2; reps = 3; percentage = 0.60;
      }
      // Accessories handled in main loop for secondary days
  }

  const weight = roundToPlates(theoreticalMax * percentage);

  return {
    name: type === LiftType.SQUAT ? 'Squat' : type === LiftType.BENCH ? 'Bench Press' : 'Deadlift',
    dayType,
    mainSets: [{ sets, reps, percentage: percentage * 100, weight }],
    variation, // This is now the specific Exercise Name
    accessories
  };
};

const getCompLiftName = (type: LiftType): string => {
    if (type === LiftType.SQUAT) return "Competition Squat";
    if (type === LiftType.BENCH) return "Competition Bench Press";
    return "Competition Deadlift";
};