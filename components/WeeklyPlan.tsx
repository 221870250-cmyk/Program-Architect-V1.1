import React, { useState, useEffect } from 'react';
import { TrainingWeek, Language, UserProfile } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { TRANSLATIONS, EXERCISE_GLOSSARY } from '../constants';

interface Props {
  program: TrainingWeek[];
  lang: Language;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const WeeklyPlan: React.FC<Props> = ({ program, lang, profile, setProfile }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const t = TRANSLATIONS[lang];

  // If program length changes, reset or clamp index
  useEffect(() => {
    if (currentWeekIndex >= program.length) {
        setCurrentWeekIndex(Math.max(0, program.length - 1));
    }
  }, [program.length, currentWeekIndex]);

  if (program.length === 0) return <div className="p-8 text-center text-gray-500">Initialize Profile first.</div>;

  const currentWeek = program[currentWeekIndex];

  const nextWeek = () => {
    if (currentWeekIndex < program.length - 1) setCurrentWeekIndex(prev => prev + 1);
  };
  const prevWeek = () => {
    if (currentWeekIndex > 0) setCurrentWeekIndex(prev => prev - 1);
  };

  const handleNoteChange = (dayIndex: number, text: string) => {
      const noteKey = `w${currentWeek.weekNumber}-d${dayIndex}`;
      setProfile(prev => ({
          ...prev,
          sessionNotes: {
              ...prev.sessionNotes,
              [noteKey]: text
          }
      }));
  };

  const getNote = (dayIndex: number) => {
      const noteKey = `w${currentWeek.weekNumber}-d${dayIndex}`;
      return profile.sessionNotes?.[noteKey] || '';
  };

  const getPhaseName = (phase: string) => {
      // @ts-ignore
      return t.phases[phase] || phase;
  };
  
  const getLiftName = (name: string) => {
      // @ts-ignore
      return t.lifts[name] || name;
  };

  const getExerciseName = (name: string) => {
      const entry = EXERCISE_GLOSSARY[name];
      return entry ? entry[lang].name : name;
  };
  
  const getExerciseDesc = (name: string) => {
      const entry = EXERCISE_GLOSSARY[name];
      return entry ? entry[lang].desc : "";
  };

  const PhaseBadge = ({ week }: { week: TrainingWeek }) => {
      let colorClass = 'text-gray-400 bg-gray-900 border-gray-700';
      
      if (week.phase === 'Accumulation') colorClass = 'text-blue-400 bg-blue-900/20 border-blue-900';
      if (week.phase === 'Transmutation') colorClass = 'text-purple-400 bg-purple-900/20 border-purple-900';
      if (week.phase === 'Realization') colorClass = 'text-amber-400 bg-amber-900/20 border-amber-900';
      if (week.phase === 'Deload') colorClass = 'text-emerald-400 bg-emerald-900/20 border-emerald-900';
      if (week.phase === 'Taper') colorClass = 'text-red-400 bg-red-900/20 border-red-900';

      const label = week.phase === 'Taper' 
        ? `${getPhaseName(week.phase)} (Part ${week.taperPart})`
        : getPhaseName(week.phase);

      return (
          <div className={`px-3 py-1 rounded-full border ${colorClass} text-xs font-bold uppercase tracking-widest inline-block mb-1`}>
              {label}
          </div>
      );
  };

  // Intensity Visualizer Component
  const IntensityBar = ({ percentage }: { percentage: number }) => {
      let color = 'bg-blue-500';
      if (percentage > 80) color = 'bg-amber-500';
      if (percentage > 90) color = 'bg-red-500';
      if (percentage < 60) color = 'bg-emerald-500';

      return (
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div 
                className={`${color} h-1.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.2)]`} 
                style={{ width: `${Math.min(100, percentage)}%` }}
              ></div>
          </div>
      );
  };

  const weekTitle = lang === 'en' ? `${t.plan.week} ${currentWeek.weekNumber}` : t.plan.week.replace('X', currentWeek.weekNumber.toString());

  return (
    <div className="flex flex-col h-full relative bg-gray-900">
      {/* Sleek Header */}
      <div className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 p-4 pb-2">
         <div className="flex justify-between items-center mb-4 px-2">
             <button onClick={prevWeek} disabled={currentWeekIndex === 0} className="p-3 rounded-full bg-gray-800 border border-gray-700 hover:border-gray-600 disabled:opacity-30 disabled:hover:border-gray-800 transition-all">
                 <ChevronLeftIcon className="w-5 h-5 text-gray-300" />
             </button>
             <div className="text-center flex flex-col items-center">
                 <PhaseBadge week={currentWeek} />
                 <h2 className="text-2xl font-black text-white italic tracking-tighter shadow-white drop-shadow-sm">{weekTitle}</h2>
             </div>
             <button onClick={nextWeek} disabled={currentWeekIndex === program.length - 1} className="p-3 rounded-full bg-gray-800 border border-gray-700 hover:border-gray-600 disabled:opacity-30 disabled:hover:border-gray-800 transition-all">
                 <ChevronRightIcon className="w-5 h-5 text-gray-300" />
             </button>
         </div>
         
         {/* Custom Range Slider */}
         <div className="px-2 relative">
             <input
                type="range"
                min="0"
                max={program.length - 1}
                value={currentWeekIndex}
                onChange={(e) => setCurrentWeekIndex(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-white"
             />
             <div className="flex justify-between mt-1">
                 <span className="text-[10px] text-gray-500 font-mono">START</span>
                 <span className="text-[10px] text-gray-500 font-mono">FINISH</span>
             </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
          
          {currentWeek.phase === 'Taper' && (
             <div className="bg-red-900/10 border border-red-500/30 p-4 rounded-2xl text-center">
                 <p className="text-xs text-red-400 font-bold uppercase tracking-wider">{t.plan.taperNote}</p>
             </div>
          )}

          {currentWeek.lifts.map((lift, idx) => (
              <div key={idx} className="group relative bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors duration-300 shadow-xl">
                  
                  {/* Card Header: Gradient & Title */}
                  <div className={`p-4 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-700 flex justify-between items-center`}>
                      <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner ${
                              lift.dayType === 'S' ? 'bg-blue-600 text-white' : lift.dayType === 'B' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                          }`}>
                              {idx + 1}
                          </div>
                          <div>
                              <span className="block font-black text-xl text-white tracking-tight">{getLiftName(lift.name)}</span>
                              {lift.variation && (
                                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                                      {getExerciseName(lift.variation)}
                                  </span>
                              )}
                          </div>
                      </div>
                  </div>
                  
                  <div className="p-5 space-y-6">
                      {/* Main Work Block */}
                      <div>
                        {lift.mainSets.map((set, sIdx) => (
                             <div key={sIdx} className="relative">
                                 <div className="flex justify-between items-center mb-1">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 font-mono mb-0.5">TARGET LOAD</span>
                                        <div className="flex items-baseline">
                                            <span className="text-5xl font-black text-white tracking-tighter">{set.weight}</span>
                                            <span className="text-lg text-gray-500 font-medium ml-1">{t.plan.kg}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                         <div className="bg-gray-900 px-4 py-2 rounded-xl border border-gray-700">
                                            <div className="text-2xl font-bold text-white">{set.sets} x {set.reps}</div>
                                            <div className="text-[10px] text-gray-500 font-mono text-center mt-1">SETS x REPS</div>
                                         </div>
                                    </div>
                                 </div>
                                 
                                 {/* Intensity Visualization */}
                                 <div className="flex items-center justify-between mt-3">
                                     <span className="text-[10px] text-gray-500 font-mono">INTENSITY: {set.percentage.toFixed(0)}%</span>
                                 </div>
                                 <IntensityBar percentage={set.percentage} />
                             </div>
                        ))}
                      </div>

                      {/* Accessories Block */}
                      {lift.accessories.length > 0 && (
                          <div className="pt-4 border-t border-gray-700">
                              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">{t.plan.acc}</div>
                              <div className="grid gap-3">
                                  {lift.accessories.map((acc, accIdx) => (
                                      <div key={accIdx} className="bg-gray-900/50 p-3 rounded-xl border border-gray-700 flex justify-between items-center">
                                          <div>
                                              <div className="font-bold text-gray-300 text-sm">{getExerciseName(acc.name)}</div>
                                              <div className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[150px]">{getExerciseDesc(acc.name)}</div>
                                          </div>
                                          <div className="text-right">
                                              <div className="text-emerald-400 font-mono font-bold text-sm">{acc.sets} x {acc.reps}</div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}

                      {/* Useful Note Section */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-2 text-gray-500">
                            <PencilSquareIcon className="w-3 h-3" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">SESSION NOTES</span>
                        </div>
                        <textarea
                            value={getNote(idx)}
                            onChange={(e) => handleNoteChange(idx, e.target.value)}
                            placeholder={lang === 'en' ? "Log RPE, setup cues, or feelings..." : "记录 RPE, 动作感受..."}
                            className="w-full bg-gray-900/80 border border-gray-700 rounded-xl p-3 text-sm text-gray-300 placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none h-20"
                        />
                      </div>
                  </div>
              </div>
          ))}
          
          <div className="h-8"></div> {/* Spacer */}
      </div>
    </div>
  );
};

export default WeeklyPlan;