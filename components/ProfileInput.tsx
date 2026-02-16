import React, { useState } from 'react';
import { UserProfile, Language, PRRecord } from '../types';
import { checkFeasibility, calculateTaperCategory } from '../utils/logic';
import { TRANSLATIONS } from '../constants';
import { PlusIcon, TrashIcon, UserCircleIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  lang: Language;
  setLang: (l: Language) => void;
  users: UserProfile[];
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
}

// Extracted InputGroup component to prevent re-rendering focus loss
// Added inputmode="decimal" for mobile keypad
const InputGroup = ({ label, nameCurrent, nameGoal, currentVal, goalVal, handleChange, t }: any) => (
  <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
    <h3 className="text-lg font-bold text-blue-400 mb-3">{label}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-xs text-gray-400 mb-1">{t.profile.current}</label>
        <input
          type="number"
          inputMode="decimal"
          name={nameCurrent}
          value={currentVal}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">{t.profile.goal}</label>
        <input
          type="number"
          inputMode="decimal"
          name={nameGoal}
          value={goalVal}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />
      </div>
    </div>
  </div>
);

const ProfileInput: React.FC<Props> = ({ profile, setProfile, lang, setLang, users, setUsers }) => {
  const t = TRANSLATIONS[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Keep 'value' as string for 'name' field, otherwise parsing float
    const val = (name === 'name') ? value : (value === '' ? '' : parseFloat(value));

    setProfile(prev => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSaveHistory = () => {
      const newRecord: PRRecord = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US'),
          squat: profile.squatCurrent,
          bench: profile.benchCurrent,
          deadlift: profile.deadliftCurrent
      };
      setProfile(prev => ({
          ...prev,
          history: [newRecord, ...prev.history]
      }));
  };

  const handleDeleteHistory = (id: string) => {
      setProfile(prev => ({
          ...prev,
          history: prev.history.filter(h => h.id !== id)
      }));
  };

  const handleClearNotes = () => {
    if (window.confirm(t.profile.clearNotesConfirm)) {
      setProfile(prev => ({
        ...prev,
        sessionNotes: {}
      }));
      alert(t.profile.notesCleared);
    }
  };

  const handleSwitchUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = e.target.value;
      // Save current state to users array first
      setUsers(prev => prev.map(u => u.id === profile.id ? profile : u));
      
      const targetUser = users.find(u => u.id === selectedId);
      if (targetUser) setProfile(targetUser);
  };

  const handleAddUser = () => {
      // Save current
      setUsers(prev => {
          const updated = prev.map(u => u.id === profile.id ? profile : u);
          const newUser: UserProfile = {
              id: Date.now().toString(),
              name: `New User ${updated.length + 1}`,
              experience: 1,
              bodyweight: 80,
              squatCurrent: 100, benchCurrent: 80, deadliftCurrent: 120,
              squatGoal: 110, benchGoal: 85, deadliftGoal: 130,
              weeks: 16,
              history: []
          };
          setProfile(newUser);
          return [...updated, newUser];
      });
  };

  const feasibility = checkFeasibility(profile);
  const taperRec = calculateTaperCategory(profile);
  
  const getFeasibilityMessage = () => {
      const msg = t.profile.status[feasibility.status];
      if (typeof msg === 'function') return "Error"; 
      if (feasibility.status === 'impossible' && feasibility.extraData) {
          return t.profile.status.impossible.replace('{val}', feasibility.extraData);
      }
      return msg;
  };

  return (
    <div className="p-4 pb-32 overflow-y-auto h-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-black italic tracking-tighter text-white">{t.profile.title}</h2>
        <p className="text-gray-400 text-sm mt-1">{t.profile.subtitle}</p>
        
        <button 
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="mt-4 text-xs bg-gray-800 border border-gray-600 px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
        >
            {t.profile.switchLang}
        </button>
      </div>

      {/* --- USER MANAGEMENT --- */}
      <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
              <UserCircleIcon className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-gray-200 uppercase">{t.profile.manageUsers}</h3>
          </div>
          <div className="flex gap-2 mb-4">
              <select 
                value={profile.id} 
                onChange={handleSwitchUser}
                className="flex-1 bg-gray-900 border border-gray-600 rounded-lg p-2 text-sm text-white focus:outline-none"
              >
                  {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name || 'Unnamed'}</option>
                  ))}
              </select>
              <button onClick={handleAddUser} className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-500">
                  <PlusIcon className="w-5 h-5" />
              </button>
          </div>

          <div className="flex items-center gap-2 mb-2 pt-2 border-t border-gray-700">
             <h3 className="text-xs font-bold text-gray-400 uppercase">{t.profile.dataManagement}</h3>
          </div>
          <button 
            onClick={handleClearNotes}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 border border-gray-600 hover:bg-red-900/30 hover:border-red-700 text-gray-300 hover:text-red-300 py-2 rounded-lg transition-all text-sm"
          >
              <ArchiveBoxXMarkIcon className="w-4 h-4" />
              {t.profile.clearNotes}
          </button>
      </div>

      {/* --- LIFTER IDENTITY & HISTORY --- */}
      <div className="mb-8 border-b border-gray-700 pb-8">
          <div className="flex items-center gap-4 mb-4">
             <div className="h-10 w-1 bg-blue-500 rounded-full"></div>
             <h3 className="text-lg font-bold text-white uppercase tracking-widest">{t.profile.identity}</h3>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-4 space-y-4">
            <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">{t.profile.name}</label>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            
            <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">{t.profile.experience}</label>
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        name="experience"
                        min="0"
                        max="20"
                        step="0.5"
                        value={profile.experience}
                        onChange={handleChange}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <span className="text-white font-mono w-10 text-right">{profile.experience}y</span>
                </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-200">{t.profile.history}</h4>
                  <button 
                    onClick={handleSaveHistory}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                      {t.profile.logBtn}
                  </button>
              </div>
              
              <div className="max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {profile.history && profile.history.length > 0 ? (
                      <table className="w-full text-xs text-left text-gray-400">
                          <thead className="text-gray-200 border-b border-gray-600 sticky top-0 bg-gray-800">
                              <tr>
                                  <th className="py-2">{t.profile.date}</th>
                                  <th className="py-2">S</th>
                                  <th className="py-2">B</th>
                                  <th className="py-2">D</th>
                                  <th className="py-2 text-right">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {profile.history.map((rec) => (
                                  <tr key={rec.id} className="border-b border-gray-700/50">
                                      <td className="py-2">{rec.date}</td>
                                      <td className="py-2">{rec.squat}</td>
                                      <td className="py-2">{rec.bench}</td>
                                      <td className="py-2">{rec.deadlift}</td>
                                      <td className="py-2 text-right">
                                          <button onClick={() => handleDeleteHistory(rec.id)} className="text-red-500 hover:text-red-400">
                                              <TrashIcon className="w-4 h-4 inline" />
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  ) : (
                      <p className="text-sm text-gray-500 text-center py-4">{t.profile.noHistory}</p>
                  )}
              </div>
          </div>
      </div>

      {/* --- CYCLE CONFIG --- */}
      <div>
        <div className="flex items-center gap-4 mb-4">
             <div className="h-10 w-1 bg-emerald-500 rounded-full"></div>
             <h3 className="text-lg font-bold text-white uppercase tracking-widest">{t.profile.config}</h3>
        </div>

        <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
            <label className="block text-sm font-bold text-gray-300 mb-2">{t.profile.bw}</label>
            <input
                type="number"
                inputMode="decimal"
                name="bodyweight"
                value={profile.bodyweight}
                onChange={handleChange}
                placeholder="e.g. 80"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">{t.profile.bwDesc}</p>
        </div>

        <InputGroup 
            label={t.lifts['Squat']} 
            nameCurrent="squatCurrent" 
            nameGoal="squatGoal" 
            currentVal={profile.squatCurrent} 
            goalVal={profile.squatGoal} 
            handleChange={handleChange}
            t={t}
        />
        <InputGroup 
            label={t.lifts['Bench Press']} 
            nameCurrent="benchCurrent" 
            nameGoal="benchGoal" 
            currentVal={profile.benchCurrent} 
            goalVal={profile.benchGoal}
            handleChange={handleChange}
            t={t} 
        />
        <InputGroup 
            label={t.lifts['Deadlift']} 
            nameCurrent="deadliftCurrent" 
            nameGoal="deadliftGoal" 
            currentVal={profile.deadliftCurrent} 
            goalVal={profile.deadliftGoal}
            handleChange={handleChange}
            t={t} 
        />

        <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-gray-300 mb-3">{t.profile.duration}</h3>
            <label className="block text-xs text-gray-400 mb-1">{t.profile.duration}: {profile.weeks}</label>
            <input
            type="range"
            name="weeks"
            min="8"
            max="24"
            step="1"
            value={profile.weeks}
            onChange={handleChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{t.profile.cycleRange[0]}</span>
                <span>{t.profile.cycleRange[1]}</span>
            </div>
        </div>
        
        {/* Taper Analysis Warning */}
        <div className={`p-4 rounded-lg bg-gray-900 border mb-4 ${profile.weeks < taperRec.minCycleLength ? 'border-amber-600' : 'border-blue-800'}`}>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{t.profile.taperAnalysis}</p>
            <p className={`font-medium ${profile.weeks < taperRec.minCycleLength ? 'text-amber-500' : 'text-blue-400'}`}>
                {profile.weeks < taperRec.minCycleLength 
                    ? t.profile.taperWarning.replace('{min}', taperRec.minCycleLength.toString())
                    : t.profile.taperOk.replace('{weeks}', taperRec.duration.toString()).replace('{cat}', taperRec.category.toString())
                }
            </p>
        </div>

        <div className={`p-4 rounded-lg bg-gray-900 border ${feasibility.status === 'optimal' ? 'border-green-800' : 'border-red-800'}`}>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{t.profile.feasibility}</p>
            <p className={`font-medium ${feasibility.color} mb-2`}>{getFeasibilityMessage()}</p>
            <p className="text-[10px] text-gray-500 italic border-t border-gray-700 pt-2">
                {t.profile.disclaimer}
            </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-8 mb-4 font-mono select-none">
          {t.profile.author}
      </div>
    </div>
  );
};

export default ProfileInput;