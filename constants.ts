import { ChartBarIcon, ClipboardDocumentListIcon, BookOpenIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export const NAV_ITEMS = [
  { nameKey: 'plan', icon: ClipboardDocumentListIcon, id: 'plan' },
  { nameKey: 'profile', icon: AdjustmentsHorizontalIcon, id: 'profile' },
  { nameKey: 'analytics', icon: ChartBarIcon, id: 'analytics' },
  { nameKey: 'learn', icon: BookOpenIcon, id: 'learn' },
];

export const TRANSLATIONS = {
  en: {
    nav: { plan: 'Plan', profile: 'Profile', analytics: 'Analytics', learn: 'Learn' },
    profile: {
      title: 'PROFILE & GOALS',
      subtitle: 'Manage users and configure cycle.',
      manageUsers: 'USER MANAGEMENT',
      dataManagement: 'DATA MANAGEMENT',
      switchUser: 'Switch User',
      addUser: 'New User',
      deleteHistory: 'Delete',
      clearNotes: 'Clear All Session Notes',
      clearNotesConfirm: 'Are you sure you want to delete all session notes? This cannot be undone.',
      notesCleared: 'All notes cleared.',
      identity: 'LIFTER STATS',
      name: 'Name',
      experience: 'Training Experience (Years)',
      history: 'PR HISTORY',
      logBtn: 'Log Current Maxes',
      noHistory: 'No records yet.',
      date: 'Date',
      total: 'Total',
      config: 'CYCLE CONFIGURATION',
      bw: 'Bodyweight (kg)',
      bwDesc: 'Required for Taper calculation.',
      current: 'Current 1RM',
      goal: 'Goal 1RM',
      duration: 'Duration (Weeks)',
      cycleRange: ['8 Weeks', '24 Weeks'],
      feasibility: 'Feasibility Analysis',
      taperAnalysis: 'Taper Design Recommendation',
      taperWarning: '⚠ Cycle too short for effective taper. Recommended minimum: {min} weeks.',
      taperOk: '✓ Cycle length allows for a full Category {cat} Taper ({weeks} weeks).',
      disclaimer: "Reference for intermediate/advanced lifters. Beginners may not need complex tapering.",
      status: {
        missing: 'Enter Bodyweight for analysis',
        optimal: 'Sustainable Goal. Good for long term progress(If you believe you have great potential, feel free to boldly pursue ambitious—even seemingly unrealistic—plans).',
        aggressive: 'Aggressive Goal. Eat well and sleep well(If you believe you have great potential, feel free to boldly pursue ambitious—even seemingly unrealistic—plans).',
        extreme: 'Extremely Aggressive. >5kg/week on Total is unsustainable(If you believe you have great potential, feel free to boldly pursue ambitious—even seemingly unrealistic—plans).',
        impossible: 'Unrealistic. Aiming to add {val}% of bodyweight is too aggressive(If you believe you have great potential, feel free to boldly pursue ambitious—even seemingly unrealistic—plans).',
      },
      switchLang: 'Switch Language / 切换语言',
      author: "Author: Shi Enze"
    },
    plan: {
      week: 'WEEK',
      phase: 'Phase',
      sessions: 'Sessions',
      main: 'Main Work',
      acc: 'Accessories',
      var: 'Primary Variation',
      note: "Note: If RPE < 6, increase by 2.5kg. If RPE > 9, decrease by 2.5kg.",
      sets: 'Sets',
      reps: 'Reps',
      of1rm: 'of Projected 1RM',
      kg: 'kg',
      taperNote: 'TAPER: Volume reduced. Intensity maintained or reduced based on schedule.'
    },
    phases: {
      Accumulation: 'Accumulation',
      Transmutation: 'Transmutation',
      Realization: 'Realization',
      Deload: 'Deload',
      Taper: 'Taper'
    },
    lifts: {
      'Squat': 'Squat',
      'Bench Press': 'Bench Press',
      'Deadlift': 'Deadlift',
      'Bench Variation': 'Bench Variation',
      'Bench Hypertrophy': 'Bench Hypertrophy',
      'Squat Variation': 'Squat Variation',
    },
    analytics: {
      title: 'MACROCYCLE ANALYSIS',
      volInt: 'Volume vs Intensity Wave',
      desc: 'Notice the Taper (End of Graph): Volume drops significantly while Intensity stays high before cutting at the very end.',
      weeks: 'Weeks',
      phases: 'Phases',
      vol: 'Vol',
      int: 'Int'
    },
    learn: {
      title: 'KNOWLEDGE BASE',
      glossary: 'Exercise Glossary',
      references: 'References',
      methodology: 'Methodology',
      clickToExpand: 'Click to expand',
      methodologySections: [
        {
            title: "1. The Big Picture: Phase Potentiation",
            content: "You cannot train all qualities (Hypertrophy, Strength, Power) simultaneously with maximal efficiency. This program uses 'Block Periodization' to sequence these qualities. We start with high volume to build muscle mass (Accumulation), convert that mass into force production (Transmutation), and finally sharpen the nervous system to display maximal strength (Realization/Taper). This is 'Phase Potentiation'—each phase makes the next one more effective."
        },
        {
            title: "2. Fatigue Management & SRA Curve",
            content: "Growth happens during rest, not training. The 'Stimulus-Recovery-Adaptation' (SRA) curve dictates that hard training digs a hole (fatigue). To get out of the hole and reach a higher peak (supercompensation), we must manage fatigue. This is why we use a 'Wave Loading' pattern. Typically 3 weeks of increasing difficulty followed by 1 Deload week. This prevents burnout and overuse injuries."
        },
        {
            title: "3. The Juggernaut Structure (Sets & Reps)",
            content: "We cycle through specific rep ranges to match the phase goal:\n• Accumulation (10s/8s): High reps build work capacity and tissue. Low specificity to 1RM.\n• Transmutation (5s): The bridge between size and strength. Heavier weights, moderate volume.\n• Realization (3s/1s): High specificity. Teaching the nervous system to handle maximal loads."
        },
        {
            title: "4. The Art of Tapering",
            content: "The Taper is not just 'resting'. It is a calculated reduction in Fatigue to unmask Fitness. Fitness - Fatigue = Performance. In the final weeks, we dramatically cut Volume (sets/reps) while keeping Intensity (weight) high initially. This maintains your strength adaptations while allowing your muscles and nervous system to fully recover. The exact length depends on your size and experience (heavier/stronger lifters need longer tapers)."
        },
        {
            title: "5. Auto-Regulation (Your Role)",
            content: "No spreadsheet knows how you slept last night. This program provides the structure, but you must provide the feedback. If a weight feels like RPE 10 (Max effort) on a week meant for RPE 7, lower the weight. Conversely, if you feel explosive, small increases are permitted. Consistency beats intensity."
        }
      ]
    }
  },
  zh: {
    nav: { plan: '计划', profile: '档案', analytics: '分析', learn: '学习' },
    profile: {
      title: '档案与目标',
      subtitle: '管理用户并配置训练周期。',
      manageUsers: '用户管理',
      dataManagement: '数据管理',
      switchUser: '切换用户',
      addUser: '新建用户',
      deleteHistory: '删除',
      clearNotes: '清除所有训练笔记',
      clearNotesConfirm: '确定要删除当前用户的所有训练笔记吗？此操作不可撤销。',
      notesCleared: '笔记已清除。',
      identity: '训练者数据',
      name: '姓名',
      experience: '训练年限 (年)',
      history: '历史 PR 记录',
      logBtn: '保存当前成绩',
      noHistory: '暂无记录',
      date: '日期',
      total: '总和',
      config: '周期配置',
      bw: '体重 (kg)',
      bwDesc: '用于计算收尾(Taper)策略。',
      current: '当前 1RM',
      goal: '目标 1RM',
      duration: '周期时长 (周)',
      cycleRange: ['8 周', '24 周'],
      feasibility: '可行性分析',
      taperAnalysis: '收尾阶段 (Taper) 建议',
      taperWarning: '⚠ 周期过短，无法执行完整的收尾策略。建议最少 {min} 周。',
      taperOk: '✓ 周期长度充足，包含 {weeks} 周的第 {cat} 类收尾阶段。',
      disclaimer: "仅供中高阶训练者参考。如果你是新手，不需要复杂的收尾策略。",
      status: {
        missing: '请输入体重以进行分析',
        optimal: '目标可持续。利于长期发展（如果你自觉潜力很大，可以大胆尝试激进甚至不切实际的计划）。',
        aggressive: '目标激进。请确保饮食和睡眠充足（如果你自觉潜力很大，可以大胆尝试激进甚至不切实际的计划）。',
        extreme: '极度激进。每周总成绩增加超过 5kg 是不可持续的（如果你自觉潜力很大，可以大胆尝试激进甚至不切实际的计划）。',
        impossible: '不切实际。目标在一个周期内增加体重 {val}% 的重量过于激进（如果你自觉潜力很大，可以大胆尝试激进甚至不切实际的计划）。',
      },
      switchLang: '切换语言 / Switch Language',
      author: "作者：石恩泽"
    },
    plan: {
      week: '第 X 周',
      phase: '期',
      sessions: '本周训练日',
      main: '主项训练',
      acc: '辅助训练',
      var: '主项变式',
      note: "备注：如果 RPE < 6，加 2.5kg。如果 RPE > 9，减 2.5kg。",
      sets: '组',
      reps: '次',
      of1rm: '的预计 1RM',
      kg: '公斤',
      taperNote: '收尾阶段：容量大幅降低。强度根据具体日程维持或降低。'
    },
    phases: {
      Accumulation: '积累',
      Transmutation: '转化',
      Realization: '实现',
      Deload: '减载',
      Taper: '收尾'
    },
    lifts: {
      'Squat': '深蹲',
      'Bench Press': '卧推',
      'Deadlift': '硬拉',
      'Bench Variation': '卧推变式',
      'Bench Hypertrophy': '卧推肌肥大',
      'Squat Variation': '深蹲变式',
    },
    analytics: {
      title: '宏观周期分析',
      volInt: '容量 vs 强度 波动',
      desc: '注意收尾阶段（图表末尾）：容量显著下降，而强度在最后一次削减前保持高位，以消除疲劳并表现力量。',
      weeks: '周数',
      phases: '阶段',
      vol: '容量',
      int: '强度'
    },
    learn: {
      title: '知识库',
      glossary: '动作词典',
      references: '参考文献',
      methodology: '训练方法论',
      clickToExpand: '点击展开详情',
      methodologySections: [
        {
            title: "1. 宏观逻辑：阶段增强作用 (Phase Potentiation)",
            content: "你无法同时以最高效率训练所有素质（肌肥大、绝对力量、爆发力）。本系统采用“板块周期化”逻辑：我们先通过高容量建立肌肉量（积累期 Accumulation），然后将肌肉量转化为力量输出（转化期 Transmutation），最后通过神经适应展示最大力量（实现期 Realization）。每一个阶段都在为下一个阶段做铺垫，这就叫“阶段增强”。"
        },
        {
            title: "2. 疲劳管理与 SRA 曲线",
            content: "肌肉是在休息时生长的，而不是训练时。“刺激-恢复-适应” (SRA) 曲线表明，艰苦的训练会制造疲劳坑。为了爬出坑并达到更高的峰值（超量恢复），我们必须管理疲劳。这就是为什么我们采用“波浪式负荷”：通常是3周的递增负荷，紧接着1周的减载（Deload）。不要跳过减载周，它是为了防止过度训练和长期损伤。"
        },
        {
            title: "3. Juggernaut 结构 (组次安排)",
            content: "我们循环使用特定的次数范围来匹配阶段目标：\n• 积累期 (10次/8次)：高次数建立做组能力和肌肉组织。此阶段对 1RM 的针对性较低。\n• 转化期 (5次)：连接肌肉量与力量的桥梁。重量增加，容量中等。\n• 实现期 (3次/1次)：高度专项化。教导神经系统处理极限重量。"
        },
        {
            title: "4. 收尾策略 (Tapering) 的艺术",
            content: "收尾 (Taper) 不仅仅是休息，它是计算好的疲劳消除过程，旨在揭示你的真实体能。公式：表现 = 体能 - 疲劳。在最后几周，我们会大幅削减容量（组数x次数），但在初期保持高强度（重量）。这能维持你的力量适应，同时让肌肉和神经系统完全恢复。收尾的具体时长取决于你的体重和经验（大体重/高水平者需要更长的收尾期）。"
        },
        {
            title: "5. 自我调节 (你的角色)",
            content: "表格不知道你昨晚睡得怎么样。本程序提供结构，但你需要提供反馈。如果在计划 RPE 7 的日子里，重量感觉像 RPE 10（极限），请果断降低重量。反之，如果你状态极佳，可以适当增加 2.5kg。一致性优于偶尔的爆发。"
        }
      ]
    }
  }
};

export const REFERENCES = [
  { title: "Scientific Principles of Strength Training", author: "Dr. Mike Israetel", desc: "Fatigue management & directed adaptation." },
  { title: "The Muscle & Strength Pyramid", author: "Eric Helms", desc: "Prioritizing Volume, Intensity, and Frequency." },
  { title: "The Juggernaut Method 2.0", author: "Chad Wesley Smith", desc: "Wave periodization structures." }
];

interface ExerciseDetail {
  en: { name: string, desc: string };
  zh: { name: string, desc: string };
}

export const EXERCISE_GLOSSARY: Record<string, ExerciseDetail> = {
    "Competition Squat": {
        en: { name: "Competition Squat", desc: "Standard specific competition form squat." },
        zh: { name: "比赛式深蹲", desc: "标准的比赛形式深蹲。" }
    },
    "Competition Bench Press": {
        en: { name: "Competition Bench Press", desc: "Standard specific competition form bench press." },
        zh: { name: "比赛式卧推", desc: "标准的比赛形式卧推。" }
    },
    "Competition Deadlift": {
        en: { name: "Competition Deadlift", desc: "Standard specific competition form deadlift." },
        zh: { name: "比赛式硬拉", desc: "标准的比赛形式硬拉。" }
    },
    "Pause Squat": {
        en: { name: "Pause Squat", desc: "Stop completely at the bottom for 1-2s. Eliminates stretch reflex.  Boost bottom strength." },
        zh: { name: "暂停深蹲", desc: "在底部完全静止 1-2 秒。消除牵张反射，强化底端力量。" }
    },
    "Leg Press": {
        en: { name: "Leg Press", desc: "Machine based. Adds quad volume without spinal fatigue." },
        zh: { name: "腿举", desc: "固定器械。在不增加脊柱疲劳的情况下增加股四头肌容量。" }
    },
    "RDL": {
        en: { name: "RDL", desc: "Knees slightly bent, hinge at hips. Targets hamstrings/glutes." },
        zh: { name: "罗马尼亚硬拉", desc: "膝盖微屈，髋部铰链。针对腘绳肌和臀部。" }
    },
    "Leg Curl": {
        en: { name: "Leg Curl", desc: "Isolates hamstring knee flexion. Crucial for knee health." },
        zh: { name: "腿弯举", desc: "孤立腘绳肌膝屈功能。对膝盖健康至关重要。" }
    },
    "Back Extension": {
        en: { name: "Back Extension", desc: "Strengthens erectors and lower back endurance." },
        zh: { name: "背屈伸 (山羊挺身)", desc: "强化竖脊肌和下背部耐受能力。" }
    },
    "DB Overhead Press": {
        en: { name: "DB Overhead Press", desc: "Shoulder mass and stability with extended ROM." },
        zh: { name: "哑铃肩推", desc: "用更大的活动范围增加肩部维度以及肩膀稳定性。" }
    },
    "Chest Support Row": {
        en: { name: "Chest Support Row", desc: "Isolates back without lower back fatigue." },
        zh: { name: "胸部支撑划船", desc: "孤立背部，避免下背部疲劳。" }
    },
    "Tricep Pushdown": {
        en: { name: "Tricep Pushdown", desc: "Isolates triceps for lockout strength." },
        zh: { name: "三头肌下压", desc: "孤立三头肌，强化锁定力量。" }
    },
    "Close-Grip Bench": {
        en: { name: "Close-Grip Bench", desc: "Hands shoulder-width. Biases triceps/lockout." },
        zh: { name: "窄距卧推", desc: "双手与肩同宽。侧重三头肌和锁定。" }
    },
    "Spoto Press": {
        en: { name: "Spoto Press", desc: "Pause 2-3cm above chest. Builds pure muscle control and reversal strength." },
        zh: { name: "凌空暂停卧推 (Spoto)", desc: "在胸口上方 2-3cm 处暂停。强化底端纯肌肉控制力和启动力量。" }
    },
    "Pull-ups": {
        en: { name: "Pull-ups", desc: "Vertical pull for lat width and shoulder stability." },
        zh: { name: "引体向上", desc: "垂直拉力，增加背阔肌宽度和肩部稳定性。" }
    },
    "Dips": {
        en: { name: "Dips", desc: "Compound push for lower chest and triceps." },
        zh: { name: "双杠臂屈伸", desc: "针对下胸和三头肌的复合推类动作。" }
    },
    "Face Pulls": {
        en: { name: "Face Pulls", desc: "Rear delts/rotator cuff health. Counteracts pressing posture." },
        zh: { name: "面拉", desc: "后束/肩袖健康。对抗推类动作带来的体态问题。" }
    },
    "Split Squat": {
        en: { name: "Split Squat", desc: "Unilateral leg work to fix imbalances." },
        zh: { name: "分腿蹲", desc: "单侧腿部训练，修正不平衡。" }
    },
    "Skullcrushers": {
        en: { name: "Skullcrushers", desc: "Direct tricep mass builder." },
        zh: { name: "仰卧臂屈伸", desc: "三头肌维度的构建者。" }
    },
    "Lateral Raise": {
        en: { name: "Lateral Raise", desc: "Medial delt isolation for shoulder width." },
        zh: { name: "侧平举", desc: "中束孤立，增加肩部宽度。" }
    },
    "Mobility Work": {
        en: { name: "Mobility Work", desc: "Foam rolling and stretching." },
        zh: { name: "灵活性训练", desc: "泡沫轴放松和拉伸。" }
    },
    // Variation Mappings (Logic generates these keys)
    "Pin Squat": { en: {name: "Pin Squat", desc: ""}, zh: {name: "深蹲架深蹲", desc: ""} },
    "Tempo Squat (3-0-3)": { en: {name: "Tempo Squat (3-0-3)", desc: ""}, zh: {name: "节奏深蹲 (3-0-3)", desc: ""} },
    "Front Squat": { en: {name: "Front Squat", desc: ""}, zh: {name: "颈前深蹲", desc: ""} },
    "Larsen Press": { en: {name: "Larsen Press", desc: ""}, zh: {name: "拉森卧推 (直腿)", desc: ""} },
    "Incline Bench": { en: {name: "Incline Bench", desc: ""}, zh: {name: "上斜卧推", desc: ""} },
    "Deficit Deadlift": { en: {name: "Deficit Deadlift", desc: ""}, zh: {name: "垫高硬拉", desc: ""} },
    "Block Pull": { en: {name: "Block Pull", desc: ""}, zh: {name: "架上硬拉", desc: ""} },
    "Pausing Deadlift": { en: {name: "Pausing Deadlift", desc: ""}, zh: {name: "暂停硬拉", desc: ""} },
};

export const ACCESSORY_POOLS = {
  SQUAT_ACC: ["Leg Press", "Split Squat", "Leg Curl", "Back Extension"],
  BENCH_ACC: ["DB Overhead Press", "Tricep Pushdown", "Chest Support Row", "Dips", "Face Pulls", "Pull-ups", "Skullcrushers", "Lateral Raise"],
  DEADLIFT_ACC: ["RDL", "Back Extension", "Chest Support Row", "Pull-ups", "Leg Curl"]
};

export const VARIATIONS = {
  SQUAT: ['Pause Squat', 'Pin Squat', 'Tempo Squat (3-0-3)', 'Front Squat'],
  BENCH: ['Close-Grip Bench', 'Spoto Press', 'Larsen Press', 'Incline Bench'],
  DEADLIFT: ['Deficit Deadlift', 'Block Pull', 'Pausing Deadlift', 'RDL'],
};

// Colors for charts
export const COLORS = {
  primary: '#3b82f6', // blue-500
  secondary: '#10b981', // emerald-500
  accent: '#f59e0b', // amber-500
  background: '#1f2937', // gray-800
};