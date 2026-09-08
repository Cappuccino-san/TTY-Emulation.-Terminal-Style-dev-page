import React, { useState, useEffect } from 'react';
import type { ThemeConfig, ThemeId } from '../types/terminal';
import { THEMES } from '../styles/themes';
import { playThemeSound } from '../audio/soundEffects';

interface StatusBarProps {
  cwd: string;
  theme: ThemeId;
  themeConfig: ThemeConfig;
  soundEnabled: boolean;
  scanlinesEnabled: boolean;
  onSetTheme: (theme: ThemeId) => void;
  onToggleSound: () => void;
  onToggleScanlines: () => void;
  onCommandClick: (cmd: string) => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  cwd,
  theme,
  themeConfig,
  soundEnabled,
  scanlinesEnabled,
  onSetTheme,
  onToggleSound,
  onToggleScanlines,
  onCommandClick,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const cycleNextTheme = () => {
    const themeKeys = Object.keys(THEMES) as ThemeId[];
    const nextIdx = (themeKeys.indexOf(theme) + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIdx];
    onSetTheme(nextTheme);
    if (soundEnabled) playThemeSound();
  };

  return (
    <div
      className="w-full px-3 py-1.5 border-b flex flex-wrap items-center justify-between text-xs font-mono select-none z-30 transition-colors"
      style={{
        borderColor: 'color-mix(in srgb, var(--theme-text) 22%, transparent)',
        backgroundColor: 'color-mix(in srgb, var(--theme-text) 8%, var(--theme-bg))',
        color: themeConfig.text,
      }}
    >
      {/* Left: TTY session & breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: themeConfig.brightText }}>
          <span className="text-sm leading-none" style={{ color: themeConfig.brightText }}>▍</span>
          <span>NAPOLI-TTY</span>
          <span className="opacity-60 text-[11px] font-normal hidden sm:inline">— AI/ML ·</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold" style={{ color: themeConfig.promptPath }}>
            {cwd === '/' ? '~' : `~${cwd}`}
          </span>
        </div>
      </div>

      {/* Center: Quick navigation links */}
      <div className="hidden md:flex items-center gap-2.5 text-xs">
        <button
          onClick={() => onCommandClick('resume')}
          className="hover:underline cursor-pointer opacity-85 hover:opacity-100 font-semibold transition-opacity"
          style={{ color: themeConfig.brightText }}
        >
          [resume]
        </button>
        <button
          onClick={() => onCommandClick('skills')}
          className="hover:underline cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
          style={{ color: themeConfig.text }}
        >
          [skills]
        </button>
        <button
          onClick={() => onCommandClick('projects')}
          className="hover:underline cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
          style={{ color: themeConfig.text }}
        >
          [projects]
        </button>
        <button
          onClick={() => onCommandClick('posts')}
          className="hover:underline cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
          style={{ color: themeConfig.text }}
        >
          [articles]
        </button>
        <button
          onClick={() => onCommandClick('whoami')}
          className="hover:underline cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
          style={{ color: themeConfig.text }}
        >
          [whoami]
        </button>
        <button
          onClick={() => onCommandClick('mail')}
          className="hover:underline cursor-pointer opacity-90 hover:opacity-100 font-semibold transition-opacity"
          style={{ color: themeConfig.accent }}
        >
          [contact]
        </button>
      </div>

      {/* Right: Controls & Clocks */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className="px-1.5 py-0.5 rounded-xs cursor-pointer hover:opacity-100 transition-all text-[11px]"
          style={{
            color: soundEnabled ? themeConfig.brightText : themeConfig.dimText,
          }}
          title={soundEnabled ? 'Mechanical Keypress Sound: ENABLED (Click to mute)' : 'Sound: MUTED (Click to enable)'}
        >
          [{soundEnabled ? 'snd on' : 'snd off'}]
        </button>

        {/* Scanlines Toggle */}
        <button
          onClick={onToggleScanlines}
          className="px-1.5 py-0.5 rounded-xs cursor-pointer hover:opacity-100 transition-all text-[11px]"
          style={{
            color: scanlinesEnabled ? themeConfig.brightText : themeConfig.dimText,
          }}
          title="Toggle CRT Scanlines & Bloom"
        >
          [{scanlinesEnabled ? 'crt on' : 'crt off'}]
        </button>

        {/* Theme Cycler */}
        <button
          onClick={cycleNextTheme}
          className="px-1.5 py-0.5 rounded-xs cursor-pointer hover:opacity-100 transition-all text-[11px]"
          style={{
            color: themeConfig.brightText,
          }}
          title={`Active Phosphor: ${themeConfig.name} (Click to switch)`}
        >
          [{theme}]
        </button>

        {/* Help Button */}
        <button
          onClick={() => onCommandClick('help')}
          className="px-1.5 py-0.5 rounded-xs cursor-pointer hover:opacity-100 transition-all text-[11px] hidden sm:inline"
          style={{
            color: themeConfig.dimText,
          }}
          title="Open manual / help (help)"
        >
          [help]
        </button>

        {/* Clock */}
        <span
          className="font-mono text-xs opacity-75 ml-1"
          style={{ color: themeConfig.dimText }}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
};
