import React from 'react';
import { TrainingWeek, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Props {
  program: TrainingWeek[];
  lang: Language;
}

const Analytics: React.FC<Props> = ({ program, lang }) => {
  const t = TRANSLATIONS[lang];

  if (program.length === 0) return <div className="p-8 text-center text-gray-500">Generate a program first.</div>;

  return (
    <div className="p-4 pb-24 h-full overflow-y-auto">
      <h2 className="text-2xl font-black italic text-white mb-6">{t.analytics.title}</h2>

      <div className="mb-8 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-sm font-bold text-gray-300 uppercase mb-4">{t.analytics.volInt}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={program}>
              <defs>
                <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="weekNumber" stroke="#9ca3af" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#3b82f6" fontSize={10} tickLine={false} label={{ value: t.analytics.vol, angle: -90, position: 'insideLeft', fill: '#3b82f6' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={10} tickLine={false} domain={[0.5, 1]} label={{ value: t.analytics.int, angle: 90, position: 'insideRight', fill: '#10b981' }}/>
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area yAxisId="left" type="monotone" dataKey="volumeLoad" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVol)" name="Volume" />
              <Area yAxisId="right" type="monotone" dataKey="intensityAvg" stroke="#10b981" fillOpacity={1} fill="url(#colorInt)" name="Intensity" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
            {t.analytics.desc}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <div className="text-gray-400 text-xs uppercase">{t.analytics.weeks}</div>
              <div className="text-2xl font-bold text-white">{program.length}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <div className="text-gray-400 text-xs uppercase">{t.analytics.phases}</div>
              <div className="text-2xl font-bold text-white">3</div>
          </div>
      </div>
    </div>
  );
};

export default Analytics;