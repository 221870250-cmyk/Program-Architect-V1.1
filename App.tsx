import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, TRANSLATIONS } from './constants';
import WeeklyPlan from './components/WeeklyPlan';
import ProfileInput from './components/ProfileInput';
import Analytics from './components/Analytics';
import Learn from './components/Learn';
import { UserProfile, TrainingWeek, Language } from './types';
import { generateProgram } from './utils/logic';

const STORAGE_KEY = 'program_architect_v1_users'; // Changed key to store array
const ACTIVE_USER_KEY = 'program_architect_v1_active_user_id';
const LANG_KEY = 'program_architect_v1_lang';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('plan');
  
  // Initialize Language State
  const [lang, setLang] = useState<Language>(() => {
      const saved = localStorage.getItem(LANG_KEY);
      return (saved === 'en' || saved === 'zh') ? saved : 'zh';
  });

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  // --- Multi-User Management ---

  // 1. Load All Users
  const [users, setUsers] = useState<UserProfile[]>(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
          try {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed) && parsed.length > 0) return parsed;
              // Fallback for migration if saved data was a single object
              if (parsed && !Array.isArray(parsed)) return [{ ...parsed, id: 'default', experience: parsed.experience || 1 }];
          } catch (e) {
              console.error("Failed to parse users", e);
          }
      }
      // Default initial user
      return [{
        id: 'default',
        name: 'Default User',
        experience: 1,
        history: [],
        bodyweight: 80,
        squatCurrent: 140, benchCurrent: 100, deadliftCurrent: 180,
        squatGoal: 150, benchGoal: 107.5, deadliftGoal: 195,
        weeks: 16,
        sessionNotes: {}
      }];
  });

  // 2. Active Profile State (synced with users array on save)
  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
      return localStorage.getItem(ACTIVE_USER_KEY) || 'default';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
      return users.find(u => u.id === activeProfileId) || users[0];
  });

  const [program, setProgram] = useState<TrainingWeek[]>([]);

  // Sync Users to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // Sync Active ID
  useEffect(() => {
    localStorage.setItem(ACTIVE_USER_KEY, profile.id);
  }, [profile.id]);

  // Update Users Array when current profile changes (Debounced effect via manual update in ProfileInput usually, but here we ensure consistency)
  useEffect(() => {
     setUsers(prev => prev.map(u => u.id === profile.id ? profile : u));
  }, [profile]); // Warning: This might cause cycles if not careful, but setUsers uses functional update which is safe.
  
  // Recalculate program whenever profile changes
  useEffect(() => {
    const newProgram = generateProgram(profile);
    setProgram(newProgram);
  }, [profile.squatCurrent, profile.benchCurrent, profile.deadliftCurrent, profile.squatGoal, profile.benchGoal, profile.deadliftGoal, profile.weeks, profile.bodyweight, profile.experience]);

  const renderContent = () => {
    switch (activeTab) {
      case 'plan': return <WeeklyPlan program={program} lang={lang} profile={profile} setProfile={setProfile} />;
      case 'profile': return <ProfileInput profile={profile} setProfile={setProfile} lang={lang} setLang={setLang} users={users} setUsers={setUsers} />;
      case 'analytics': return <Analytics program={program} lang={lang} />;
      case 'learn': return <Learn lang={lang} />;
      default: return <WeeklyPlan program={program} lang={lang} profile={profile} setProfile={setProfile} />;
    }
  };

  // @ts-ignore
  const t = TRANSLATIONS[lang].nav; // Use constants properly if exported

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 border-x border-gray-800 shadow-2xl overflow-hidden font-sans">
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
         {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-20 bg-black/40 backdrop-blur-md border-t border-gray-800 flex justify-around items-center px-2 pb-2 z-50 absolute bottom-0 w-full">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          // @ts-ignore
          const label = t[item.nameKey];

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
                isActive ? 'text-blue-500 scale-105' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-1'}`} />
              <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default App;