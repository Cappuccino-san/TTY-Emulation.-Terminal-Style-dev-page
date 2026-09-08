import React, { useRef, useEffect, useState } from 'react';
import type { ThemeConfig } from '../types/terminal';
import { getCompletions, findLongestCommonPrefix } from '../hooks/useAutocomplete';
import {
  playKeypressSound,
  playReturnSound,
  playBackspaceSound,
  playTerminalBell,
} from '../audio/soundEffects';

interface TerminalPromptProps {
  cwd: string;
  themeConfig: ThemeConfig;
  soundEnabled: boolean;
  history: string[];
  onSubmit: (command: string) => void;
  onClear: () => void;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  cwd,
  themeConfig,
  soundEnabled,
  history,
  onSubmit,
  onClear,
}) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [tabOptions, setTabOptions] = useState<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input automatically on mount and when clicking anywhere on screen
  useEffect(() => {
    inputRef.current?.focus();

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      ) {
        return;
      }
      inputRef.current?.focus();
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Compute ghost text preview
  const { ghostText, matchedOptions } = getCompletions(input, cwd);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 1. Tab Key Completion
    if (e.key === 'Tab') {
      e.preventDefault();
      if (soundEnabled) playKeypressSound();

      if (matchedOptions.length === 1) {
        // Exact single match: complete the word with trailing space if command or dir slash
        const match = matchedOptions[0];
        const parts = input.split(/\s+/);
        if (parts.length <= 1) {
          setInput(match + ' ');
        } else {
          parts[parts.length - 1] = match;
          setInput(parts.join(' ') + (match.endsWith('/') ? '' : ' '));
        }
        setTabOptions(null);
      } else if (matchedOptions.length > 1) {
        // Multi match: compute common prefix
        const lcp = findLongestCommonPrefix(matchedOptions);
        const parts = input.split(/\s+/);
        const currentWord = parts[parts.length - 1];

        if (lcp.length > currentWord.length) {
          parts[parts.length - 1] = lcp;
          setInput(parts.join(' '));
        } else {
          // Show options matrix
          setTabOptions(matchedOptions);
          if (soundEnabled) playTerminalBell();
        }
      }
      return;
    }

    // Clear tab options on any non-tab key
    if (tabOptions) {
      setTabOptions(null);
    }

    // 2. Enter Key Submission
    if (e.key === 'Enter') {
      e.preventDefault();
      if (soundEnabled) playReturnSound();

      const cmdToRun = input;
      setInput('');
      setHistoryIndex(null);
      setTabOptions(null);
      onSubmit(cmdToRun);
      return;
    }

    // 3. Arrow Up: Previous history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (soundEnabled) playKeypressSound();
      if (history.length === 0) return;

      if (historyIndex === null) {
        const newIdx = history.length - 1;
        setHistoryIndex(newIdx);
        setInput(history[newIdx]);
      } else if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInput(history[newIdx]);
      }
      return;
    }

    // 4. Arrow Down: Next history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (soundEnabled) playKeypressSound();
      if (historyIndex === null) return;

      if (historyIndex < history.length - 1) {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIndex(null);
        setInput('');
      }
      return;
    }

    // 5. Ctrl+C: Cancel current line
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      if (soundEnabled) playBackspaceSound();
      setInput('');
      setHistoryIndex(null);
      setTabOptions(null);
      return;
    }

    // 6. Ctrl+L: Clear screen
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      onClear();
      return;
    }

    // 7. Backspace sound
    if (e.key === 'Backspace' && soundEnabled) {
      playBackspaceSound();
      return;
    }

    // 8. Regular character sound
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && soundEnabled) {
      playKeypressSound();
    }
  };

  const formattedPath = cwd === '/' ? '~' : `~${cwd}`;

  return (
    <div className="sticky bottom-0 z-20 pt-2 pb-3 font-mono text-xs md:text-sm bg-gradient-to-t from-black via-black/95 to-transparent">
      {/* Multi-match Tab Completion Grid */}
      {tabOptions && (
        <div
          className="mb-2 p-2 border rounded-xs max-h-32 overflow-y-auto"
          style={{
            borderColor: themeConfig.border,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
          }}
        >
          <div className="text-[11px] mb-1 font-semibold opacity-70" style={{ color: themeConfig.dimText }}>
            Possible completions:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
            {tabOptions.map((opt, idx) => (
              <span
                key={idx}
                onClick={() => {
                  const parts = input.split(/\s+/);
                  parts[parts.length - 1] = opt;
                  setInput(parts.join(' ') + ' ');
                  setTabOptions(null);
                  inputRef.current?.focus();
                }}
                className="cursor-pointer hover:underline truncate"
                style={{ color: themeConfig.brightText }}
              >
                {opt}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Persistent Prompt Line */}
      <div
        className="flex items-center gap-2 p-2.5 rounded-sm border shadow-lg relative group transition-colors"
        style={{
          borderColor: themeConfig.border,
          backgroundColor: 'rgba(5, 10, 7, 0.85)',
        }}
      >
        {/* Prompt Identifier: visitor@devbox:~/posts$ */}
        <div className="flex items-center gap-1.5 select-none shrink-0 font-bold">
          <span style={{ color: themeConfig.promptUser }}>visitor</span>
          <span style={{ color: themeConfig.dimText }}>@</span>
          <span style={{ color: themeConfig.promptHost }}>devbox</span>
          <span style={{ color: themeConfig.dimText }}>:</span>
          <span style={{ color: themeConfig.promptPath }}>{formattedPath}</span>
          <span style={{ color: themeConfig.promptSymbol }}>$</span>
        </div>

        {/* Input Wrapper with Ghost Text & 1.06s CRT Cursor */}
        <div className="relative flex-1 flex items-center overflow-hidden">
          {/* Real Input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none font-mono text-xs md:text-sm z-10"
            style={{
              color: themeConfig.brightText,
              caretColor: themeConfig.cursor,
            }}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />

          {/* Inline Grey Ghost Text Flicker */}
          {ghostText && (
            <div
              className="absolute left-0 pointer-events-none text-xs md:text-sm font-mono flex items-center whitespace-pre z-0"
              style={{ color: themeConfig.dimText }}
            >
              {/* Spacer matching exact user typed text width */}
              <span className="invisible">{input}</span>
              {/* Flickering ghost suggestion */}
              <span className="ghost-text ghost-text-active opacity-40 font-mono">
                {ghostText}
              </span>
              <span className="ml-2 text-[10px] px-1 py-0.2 border rounded-xs hidden sm:inline" style={{ borderColor: themeConfig.border }}>
                [Tab]
              </span>
            </div>
          )}
        </div>

        {/* Quick Dino Arcade Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSubmit('dino');
          }}
          className="px-1.5 py-0.5 border rounded-xs text-[10px] font-mono opacity-65 hover:opacity-100 transition-all cursor-pointer hidden sm:flex items-center gap-1 select-none shrink-0"
          style={{
            borderColor: themeConfig.accent,
            color: themeConfig.brightText,
            backgroundColor: `${themeConfig.accent}18`,
          }}
          title="Play retro CRT Dinosaur Runner mini-game (type 'dino')"
        >
          <span>[🎮 dino]</span>
        </button>

        {/* Quick Clear Shortcut Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
            if (soundEnabled) playBackspaceSound();
          }}
          className="px-1.5 py-0.5 border rounded-xs text-[10px] font-mono opacity-50 hover:opacity-100 hover:text-white transition-all cursor-pointer hidden sm:flex items-center gap-1 select-none shrink-0"
          style={{
            borderColor: themeConfig.border,
            color: themeConfig.dimText,
          }}
          title="Clear terminal screen (Ctrl+L or type 'clear')"
        >
          <span>[clear]</span>
        </button>

        {/* CRT Accurate 1.06s Pulsing Indicator */}
        <div
          className="w-2.5 h-4 crt-cursor shrink-0 ml-1 rounded-xs"
          style={{ backgroundColor: themeConfig.cursor }}
          title="CRT 1.06s Blinking Electron Raster Cursor"
        />
      </div>
    </div>
  );
};
