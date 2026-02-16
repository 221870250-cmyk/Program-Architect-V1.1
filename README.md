# Program Architect V1.1 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38b2ac)](https://tailwindcss.com/)

**Program Architect** is a specialized digital coaching tool designed for **intermediate to advanced powerlifters**. Unlike generic linear progression apps, this system implements sophisticated **Non-Linear Periodization** and **Wave Loading** logic to optimize strength gains, manage fatigue, and peak for competition.

It functions as a mobile-first web application that looks and feels like a native app.

---

## 🌟 Key Features

### 1. 🧠 Intelligent Periodization Engine
*   **Wave Loading:** Cycles through accumulation, transmutation, and realization phases using undulating intensity and volume.
*   **Auto-Regulation:** Calculates daily training loads based on your 1RM inputs and target goals.
*   **Tapering Algorithm:** Automatically generates a peaking/tapering strategy tailored to your **Bodyweight**, **Strength Level**, and **Experience**.

### 2. 📊 Feasibility Analysis
*   **Goal Validation:** Enter your current stats and goal numbers. The app analyzes the feasibility of your goal based on the timeframe.
*   **Reality Check:** Provides feedback ranging from "Optimal" to "Impossible/Dangerous" to keep your expectations realistic.

### 3. 📱 User-Centric Design
*   **Interactive Planning:** A slider-based timeline allows you to navigate through weeks seamlessly.
*   **Intensity Visualization:** Visual bars indicate the relative intensity of each set (RPE proxy).
*   **Session Notes:** Built-in digital notebook for every workout to log RPE, cues, or feelings. Includes one-tap clearing for new cycles.
*   **Mobile Optimized:** Input fields designed for mobile keypads, swipe-friendly navigation, and a dark "Performance" aesthetic.

### 4. 📈 Analytics & Education
*   **Macrocycle Visualization:** View the relationship between Volume and Intensity over the entire program duration.
*   **Knowledge Base:** Integrated glossary of exercises and explanation of the underlying scientific methodologies (SRA Curve, Phase Potentiation).

---

## 🧪 Scientific Methodology

This software integrates logic from three pillars of modern strength training:

1.  **Scientific Principles of Strength Training (Dr. Mike Israetel):** Focuses on fatigue management and directed adaptation.
2.  **The Muscle & Strength Pyramid (Eric Helms):** Prioritizes volume, intensity, and frequency hierarchies.
3.  **The Juggernaut Method 2.0 (Chad Wesley Smith):** Provides the framework for the non-linear wave structure.

---

## 🛠 Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS (Dark Mode optimized)
*   **Visualization:** Recharts
*   **Icons:** Heroicons
*   **Build:** Vite (Assumed based on structure)

---

## 📲 How to install as an App (APK)

Since this is a Progressive Web App (PWA), you can convert it to an Android APK easily without coding:

1.  **Deploy the site:** Host this code on Vercel or Netlify (Free).
2.  **Go to PWABuilder:** Visit [pwabuilder.com](https://www.pwabuilder.com).
3.  **Enter URL:** Paste your deployed Vercel/Netlify URL.
4.  **Download:** Click "Build for Store" -> "Android". It will generate an APK file for you.
5.  **Install:** Send the APK to your phone and install it.

---

## 🏁 Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Run locally: `npm run dev`

---

---

# Program Architect V1.1 (中文介绍) 🇨🇳

**Program Architect** 是一款专为**中高级力量举（Powerlifting）训练者**设计的数字化教练工具。

本系统拒绝死板的线性增长计划，而是集成了全球力量训练领域的核心著作逻辑，通过非线性波浪周期设计，帮助训练者科学备赛，突破瓶颈。

## 🌟 核心功能

### 1. 🧠 智能周期化引擎
*   **非线性波浪负荷 (Wave Loading)：** 通过周次间的强度波动，在“积累-转化-实现”三个阶段中循环递进，有效避免训练撞墙期。
*   **自动化标逆推：** 用户设定周期终点目标后，系统自动计算每周的理论负载。
*   **智能收尾 (Tapering)：** 根据用户的**体重**、**力量水平**和**训练年限**，自动生成最适合的赛前减量/冲刺策略。

### 2. 📊 目标可行性评估
*   **实时反馈：** 输入当前 1RM 和目标 1RM，系统会实时计算目标增长率。
*   **风险预警：** 针对过于激进的目标（如“极度激进”或“不切实际”），系统会发出警告，帮助你调整预期，避免受伤。

### 3. 📱 极致的用户体验
*   **动态周次导航：** 通过交互式滑块或按钮，实时解锁每一周的详细训练方案。
*   **强度可视化：** 每个训练组配有强度进度条，直观展示当前重量相对于极限的百分比。
*   **训练笔记系统：** 每个训练日下方都有独立的笔记区域，可记录当天的 RPE、动作感受或技术要点。支持一键清除所有笔记以开启新周期。
*   **移动端优化：** 针对手机操作优化的数字输入键盘、防误触设计以及深色护眼模式。

### 4. 📈 数据分析与知识库
*   **宏观周期分析：** 图表展示整个周期的“容量 vs 强度”波动关系，让你看懂训练背后的逻辑。
*   **内置百科：** 包含动作词典（解释每个变式动作的意义）和训练方法论科普。

## 🧪 科学原理

本软件的算法逻辑基于三大力量训练圣经：

1.  **《力量训练原理》(Scientific Principles of Strength Training):** 核心架构与疲劳管理。
2.  **《肌肉与力量训练金字塔》(The Muscle & Strength Pyramid):** 容量、强度与频率的科学配比。
3.  **《主宰方法 2.0》(The Juggernaut Method 2.0):** 非线性波浪周期的结构基础。

## 📲 如何制作成安卓 APP (APK)

本项目是一个 **PWA (渐进式网络应用)**，你可以通过以下“傻瓜式”步骤将其转化为 APK 安装包：

1.  **部署网站**：将代码上传到 Vercel 或 Netlify（免费且简单），获取一个网站链接（例如 `myapp.vercel.app`）。
2.  **使用转换工具**：打开微软官方工具 [PWABuilder.com](https://www.pwabuilder.com)。
3.  **生成 APK**：在输入框粘贴你的网站链接，点击 Start。
4.  **下载**：点击 "Package for Stores"，选择 Android，下载生成的 APK 文件。
5.  **安装**：将 APK 发送到手机上安装即可。

## 👤 作者
**Shi Enze**

---
*Designed for Strength. Built with Code.*
