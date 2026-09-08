import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { StatusBar } from './StatusBar';
import { OutputEntry } from './OutputEntry';
import { TerminalPrompt } from './TerminalPrompt';
import { CrtOverlay } from './CrtOverlay';
import { MatrixRain } from './MatrixRain';
import { DinoGame } from './DinoGame';
import { QuickToolbar } from './QuickToolbar';
import {
  playPowerOffSound,
  playPowerOnSound,
  playDegaussSound,
} from '../audio/soundEffects';

export const Terminal: React.FC = () => {
  const {
    cwd,
    theme,
    themeConfig,
    soundEnabled,
    scanlinesEnabled,
    crtCurvatureEnabled,
    commandHistory,
    historyEntries,
    matrixActive,
    dinoActive,
    isPoweredOff,
    isDegaussing,
    flashActive,
    setTheme,
    setSoundEnabled,
    setScanlinesEnabled,
    clearHistory,
    executeCommand,
    setMatrixActive,
    setDinoActive,
    powerOn,
  } = useTerminal();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [showJumpChip, setShowJumpChip] = useState(false);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historyEntries]);

  // Track scroll offset to toggle jump-to-bottom chip
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowJumpChip(distanceToBottom > 140);
  }, []);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowJumpChip(false);
  }, []);

  // Handle physical sounds for power and degauss
  useEffect(() => {
    if (isPoweredOff && soundEnabled) {
      playPowerOffSound();
    }
  }, [isPoweredOff, soundEnabled]);

  useEffect(() => {
    if (isDegaussing && soundEnabled) {
      playDegaussSound();
    }
  }, [isDegaussing, soundEnabled]);

  // Set CSS variables for active theme glow and colors
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', themeConfig.bg);
    root.style.setProperty('--theme-text', themeConfig.text);
    root.style.setProperty('--theme-dim', themeConfig.dimText);
    root.style.setProperty('--theme-bright', themeConfig.brightText);
    root.style.setProperty('--theme-accent', themeConfig.accent);
    root.style.setProperty('--theme-border', themeConfig.border);
    root.style.setProperty('--theme-glow', themeConfig.glow);
  }, [themeConfig]);

  // Global wakeup handler when powered off
  useEffect(() => {
    if (!isPoweredOff) return;

    const handleWakeup = (e: Event) => {
      e.preventDefault();
      powerOn();
      if (soundEnabled) playPowerOnSound();
    };

    window.addEventListener('keydown', handleWakeup);
    window.addEventListener('click', handleWakeup);
    return () => {
      window.removeEventListener('keydown', handleWakeup);
      window.removeEventListener('click', handleWakeup);
    };
  }, [isPoweredOff, powerOn, soundEnabled]);

  return (
    <>
      {/* 1. Outer Floating CRT Monitor Chassis Enclosure */}
      <div
        className="terminal-screen-enclosure font-mono select-text transition-colors duration-300"
        style={{
          backgroundColor: themeConfig.bg,
          color: themeConfig.text,
        }}
      >
        {/* Cathode Ray Tube Inner Wrapper (Receives collapse / degauss transform animations) */}
        <div
          className={`terminal-tube ${isPoweredOff ? 'off-anim' : ''} ${
            isDegaussing ? 'degauss' : ''
          }`}
          style={{ visibility: isPoweredOff ? 'hidden' : 'visible' }}
        >
          {/* Top Status Bar */}
          <StatusBar
            cwd={cwd}
            theme={theme}
            themeConfig={themeConfig}
            soundEnabled={soundEnabled}
            scanlinesEnabled={scanlinesEnabled}
            onSetTheme={setTheme}
            onToggleSound={() => setSoundEnabled((prev) => !prev)}
            onToggleScanlines={() => setScanlinesEnabled((prev) => !prev)}
            onCommandClick={executeCommand}
          />

          {/* Main Terminal TTY Scrollback Stream */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className={`flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 flex flex-col justify-start overflow-y-auto ${
              scanlinesEnabled ? 'crt-bloom-text' : ''
            }`}
          >
            {/* Output Entries */}
            <div className="space-y-3 pb-4">
              {historyEntries.map((entry) => (
                <OutputEntry
                  key={entry.id}
                  entry={entry}
                  themeConfig={themeConfig}
                  onCommandClick={executeCommand}
                />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Retro CRT Dinosaur Runner Arcade Module */}
            {dinoActive && (
              <DinoGame
                theme={theme}
                themeConfig={themeConfig}
                soundEnabled={soundEnabled}
                onExit={(finalScore, highScore) => {
                  setDinoActive(false);
                  executeCommand(
                    `echo "[TTY-DINO] Game session exited. Final Score: ${finalScore} | High Score: ${highScore}. Run 'dino' to play again."`
                  );
                }}
                onSetTheme={setTheme}
                onToggleSound={() => setSoundEnabled((prev) => !prev)}
              />
            )}

            {/* Persistent Bottom Prompt */}
            {!dinoActive && (
              <TerminalPrompt
                cwd={cwd}
                themeConfig={themeConfig}
                soundEnabled={soundEnabled}
                history={commandHistory}
                onSubmit={executeCommand}
                onClear={clearHistory}
              />
            )}
          </div>

          {/* Quick Access Toolbar for Touch / Mobile */}
          <QuickToolbar
            themeConfig={themeConfig}
            onCommandClick={executeCommand}
          />
        </div>

        {/* CRT Visual Overlays (Vignette, 8s Rolling Beam, Stepped Flicker, Flash) */}
        <CrtOverlay
          theme={theme}
          scanlinesEnabled={scanlinesEnabled}
          curvatureEnabled={crtCurvatureEnabled}
          flashActive={flashActive}
        />

        {/* Matrix Screensaver Overlay */}
        {matrixActive && (
          <MatrixRain theme={theme} onExit={() => setMatrixActive(false)} />
        )}

        {/* Floating Jump-to-Bottom Chip */}
        {showJumpChip && !isPoweredOff && (
          <button
            onClick={scrollToBottom}
            className="crt-jump-chip flex items-center gap-1 cursor-pointer"
            aria-label="Jump to new output"
          >
            <span>↓ new output</span>
          </button>
        )}

        {/* Powered-off Sleeping Tube Overlay */}
        {isPoweredOff && (
          <div className="crt-off-message">
            · · · press any key to power on · · ·
          </div>
        )}
      </div>

      {/* 2. Physical Hardware Bezel Power LED */}
      <div className="bezel-led-wrap" title={isPoweredOff ? 'CRT Tube Powered Down' : 'CRT Cathode Ray Beam Active'}>
        <span
          className={`bezel-led ${isPoweredOff ? 'offled' : ''}`}
          style={{
            backgroundColor: isPoweredOff ? undefined : themeConfig.brightText,
            boxShadow: isPoweredOff
              ? undefined
              : `0 0 8px ${themeConfig.brightText}`,
          }}
        />
        <span className="bezel-led-label">PWR</span>
      </div>
    </>
  );
};

