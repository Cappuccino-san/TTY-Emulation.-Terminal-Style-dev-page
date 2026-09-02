# 📟 TTY-Emulation // Terminal-Style Developer Page & Blog

> A high-fidelity, interactive terminal-style developer blog and portfolio inspired by vintage CRT phosphor displays (VT100 / VT220 / Apple II), built with React 19, TypeScript, Vite, and Tailwind CSS.

![TTY Emulation Preview](https://img.shields.io/badge/Phosphor-P1%20%7C%20P3%20%7C%20P4-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)
![Vite](https://img.shields.io/badge/Vite-8.2-purple)
![License](https://img.shields.io/badge/License-MIT-orange)

---

## ✨ Features

- 🖥️ **Hardware-Accurate CRT Simulation**:
  - **Monitor Chassis Enclosure**: Floating rounded screen with physical drop shadow, inset bezel, and dynamic glowing hardware **PWR LED**.
  - **Dynamic Multi-Layer Background**: 8-second continuous rolling electron sweep, irregular analog stepped flicker, and deep spherical vignette curvature.
  - **Physical Power & Degaussing Physics**: Real CRT power-off vertical line collapse (`poff`), electron flare power-on expansion (`pon`), and magnetic coil degauss wobble (`degauss`).
- 🎨 **Phosphor Themes with `color-mix()` Bloom**:
  - `amber` (P3 Warm Phosphor)
  - `green` (P1 Classic VT220 / Apple II)
  - `matrix` (Cyan-Green Digital Rain)
  - `dracula` (Modern Midnight Purples)
  - `synthwave` (Outrun Neon & Electric Violet)
  - `nord` (Arctic Frost Slate)
  - `cyberpunk` (High-Contrast Hazard Yellow & Obsidian)
- 🖮 **Vintage Mechanical Audio Synthesizer**:
  - Procedural Web Audio API sound generation for keypresses, backspaces, enter clicks, error beeps, power-down sweeps, and degauss hums.
- 🗂️ **Virtual File System (VFS)**:
  - Browse blog posts, projects, manuals, and author info via Unix commands (`ls`, `cat`, `cd`, `pwd`, `tree`, `grep`).
- ⚡ **Interactive Terminal Shell (`blogsh`)**:
  - Inline grey ghost text tab-completion preview.
  - Command history navigation (↑ / ↓).
  - 1.06-second crystal oscillator cursor duty cycle (pauses solid while typing).
  - Built-in mail composer (`mail`) and Matrix digital rain screensaver (`matrix`).
  - Floating `↓ new output` jump chip when reading long articles.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Cappuccino-san/TTY-Emulation.-Terminal-Style-dev-page.git
cd TTY-Emulation.-Terminal-Style-dev-page
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## ⌨️ Available Terminal Commands

| Command | Description |
| :--- | :--- |
| `ls [-l] [dir]` | List posts, projects, and directory contents (`-l` for long view) |
| `cat <file>` | Render and view markdown essays and README files |
| `cd <dir\|#tag>` | Change directory or filter articles by tag |
| `pwd` | Print current working directory |
| `whoami` | View author biography and system profile |
| `mail [addr]` | Interactive terminal mail composer |
| `grep <pattern>` | Search across all blog posts and projects |
| `theme <name>` | Switch phosphor theme (`amber`, `green`, `matrix`, `dracula`, `synthwave`, `nord`, `cyberpunk`) |
| `degauss` | Trigger magnetic coil degaussing screen wobble and sound |
| `crt on\|off` | Toggle CRT scanlines, 8s rolling raster beam, and stepped flicker |
| `audio on\|off` | Toggle procedural mechanical keyboard audio sound effects |
| `tree` | Display full filesystem tree hierarchy |
| `neofetch` | Display system specs, uptime, resolution, and theme info |
| `matrix` | Launch Matrix digital rain screensaver |
| `weather [city]` | Fetch ASCII weather forecast |
| `fortune` | Print programming quotes and aphorisms |
| `clear` | Wipe terminal scrollback (`Ctrl+L` works too) |
| `exit` | Power down cathode ray tube (press any key to power back on) |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CRT Keyframe Physics
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: IBM Plex Mono, JetBrains Mono, Fira Code, VT323

---

## 📜 License

MIT License. Feel free to use this template for your own developer blog or portfolio.

