import React, { useState } from 'react';
import { REFERENCES, EXERCISE_GLOSSARY, TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface Props {
    lang: Language;
}

const Learn: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
      glossary: false,
      references: false,
      methodology: true // Default open
  });

  const toggleSection = (key: string) => {
      setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SectionHeader = ({ title, isOpen, onClick }: { title: string, isOpen: boolean, onClick: () => void }) => (
      <button 
        onClick={onClick}
        className="w-full flex justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700 mb-2 focus:outline-none hover:bg-gray-750 transition-colors"
      >
          <span className="text-lg font-bold text-white border-l-4 border-blue-500 pl-3">{title}</span>
          {isOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-400" /> : <ChevronDownIcon className="w-5 h-5 text-gray-400" />}
      </button>
  );

  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
       <h2 className="text-2xl font-black italic text-white mb-6">{t.learn.title}</h2>
       
       {/* METHODOLOGY */}
       <div className="mb-4">
           <SectionHeader 
                title={t.learn.methodology} 
                isOpen={openSections.methodology} 
                onClick={() => toggleSection('methodology')} 
           />

           {openSections.methodology && (
               <div className="space-y-4 mt-2">
                   {t.learn.methodologySections.map((section, idx) => (
                       <div key={idx} className="bg-gray-800 p-4 rounded-xl border border-gray-700/50">
                           <h3 className="text-blue-400 font-bold text-base mb-2">{section.title}</h3>
                           <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                               {section.content}
                           </p>
                       </div>
                   ))}
               </div>
           )}
       </div>

       {/* EXERCISE GLOSSARY */}
       <div className="mb-4">
           <SectionHeader 
                title={t.learn.glossary} 
                isOpen={openSections.glossary} 
                onClick={() => toggleSection('glossary')} 
           />
           
           {openSections.glossary && (
               <div className="space-y-3 mt-2 pl-2">
                   {Object.entries(EXERCISE_GLOSSARY).map(([key, entry], idx) => {
                       if (!entry[lang].desc) return null;
                       return (
                        <div key={idx} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                            <h4 className="font-bold text-gray-200 text-sm mb-1">{entry[lang].name}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{entry[lang].desc}</p>
                        </div>
                       );
                   })}
               </div>
           )}
       </div>

       {/* REFERENCES */}
       <div className="mb-4">
           <SectionHeader 
                title={t.learn.references} 
                isOpen={openSections.references} 
                onClick={() => toggleSection('references')} 
           />

           {openSections.references && (
               <div className="space-y-4 mt-2 pl-2">
                   {REFERENCES.map((ref, idx) => (
                       <div key={idx} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 shadow-sm">
                           <h3 className="font-bold text-blue-400 text-base">{ref.title}</h3>
                           <div className="text-xs text-gray-400 mb-2">by {ref.author}</div>
                           <p className="text-gray-300 text-xs leading-relaxed">{ref.desc}</p>
                       </div>
                   ))}
               </div>
           )}
       </div>

       <div className="text-center text-xs text-gray-600 mt-8 mb-4 font-mono select-none">
          {t.profile.author}
      </div>
    </div>
  );
};

export default Learn;