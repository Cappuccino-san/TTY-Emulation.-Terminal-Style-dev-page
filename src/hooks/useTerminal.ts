import { useState, useCallback, useEffect } from 'react';
import type {
  HistoryEntry,
  ThemeId,
  MailDraft,
  CommandContext,
} from '../types/terminal';
import { executeTerminalCommand } from '../commands/commandRegistry';
import { THEMES } from '../styles/themes';

const STORAGE_KEYS = {
  THEME: 'terminal_blog_theme',
  SOUND: 'terminal_blog_sound',
  SCANLINES: 'terminal_blog_scanlines',
  CURVATURE: 'terminal_blog_curvature',
};

const WELCOME_BANNER = `
 █████╗ ███╗   ██╗████████╗██╗ ██████╗ ██████╗  █████╗ ██╗   ██╗██╗████████╗██╗   ██╗
██╔══██╗████╗  ██║╚══██╔══╝██║██╔════╝ ██╔══██╗██╔══██╗██║   ██║██║╚══██╔══╝╚██╗ ██╔╝
███████║██╔██╗ ██║   ██║   ██║██║  ███╗██████╔╝███████║██║   ██║██║   ██║    ╚████╔╝ 
██╔══██║██║╚██╗██║   ██║   ██║██║   ██║██╔══██╗██╔══██║╚██╗ ██╔╝██║   ██║     ╚██╔╝  
██║  ██║██║ ╚████║   ██║   ██║╚██████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║   ██║      ██║   
╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝   ╚═╝      ╚═╝   
`;

export function useTerminal() {
  const [cwd, setCwd] = useState<string>('/');
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return (saved && THEMES[saved as ThemeId]) ? (saved as ThemeId) : 'green';
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
    return saved !== null ? saved === 'true' : true;
  });

  const [scanlinesEnabled, setScanlinesEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCANLINES);
    return saved !== null ? saved === 'true' : true;
  });

  const [crtCurvatureEnabled, setCrtCurvatureEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURVATURE);
    return saved !== null ? saved === 'true' : true;
  });

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [mailDraft, setMailDraft] = useState<MailDraft | null>(null);
  const [activeManPage, setActiveManPage] = useState<string | null>(null);
  const [matrixActive, setMatrixActive] = useState<boolean>(false);
  const [isPoweredOff, setIsPoweredOff] = useState<boolean>(false);
  const [isDegaussing, setIsDegaussing] = useState<boolean>(false);
  const [flashActive, setFlashActive] = useState<boolean>(false);

  // Power on / off handlers
  const powerOff = useCallback(() => {
    setIsPoweredOff(true);
  }, []);

  const triggerFlash = useCallback(() => {
    setFlashActive(true);
    setTimeout(() => {
      setFlashActive(false);
    }, 600);
  }, []);

  const triggerDegauss = useCallback(() => {
    setIsDegaussing(true);
    setTimeout(() => {
      setIsDegaussing(false);
    }, 450);
  }, []);

  const powerOn = useCallback(() => {
    setIsPoweredOff(false);
    triggerFlash();
  }, [triggerFlash]);

  // Initial power-on flash on boot
  useEffect(() => {
    triggerFlash();
  }, [triggerFlash]);


  // Set initial welcome state
  useEffect(() => {
    const initialItems: HistoryEntry[] = [
      {
        id: 'welcome-banner',
        timestamp: new Date().toISOString(),
        path: '/',
        type: 'text',
        content: WELCOME_BANNER,
      },
      {
        id: 'welcome-motd',
        timestamp: new Date().toISOString(),
        path: '/',
        type: 'text',
        content: `DevBox TTY v2.0 (x86_64-antigravity-linux-gnu)\nType 'help' for manual, 'ls' to list articles, 'whoami' for author bio, or 'neofetch' for system specs.\n`,
      },
      {
        id: 'welcome-ls',
        timestamp: new Date().toISOString(),
        command: 'ls -l posts',
        path: '/',
        type: 'table',
        content: {
          path: '/posts',
          isLong: true,
          items: [
            {
              name: 'building-a-toy-jit-in-rust.md',
              type: 'file',
              path: '/posts/building-a-toy-jit-in-rust.md',
              size: 4210,
              updatedAt: '2026-08-14',
              permissions: '-rw-r--r--',
              owner: 'nick',
              title: 'Writing a JIT Compiler from Scratch in 400 Lines of Rust',
              summary: 'Allocating executable memory with mmap, emitting raw x86_64 machine code, and executing dynamic functions.',
              tags: ['rust', 'compilers', 'systems'],
            },
            {
              name: 'why-i-left-the-cloud.md',
              type: 'file',
              path: '/posts/why-i-left-the-cloud.md',
              size: 5820,
              updatedAt: '2026-07-28',
              permissions: '-rw-r--r--',
              owner: 'nick',
              title: 'Why We Replaced Our 47 Microservices with a $40/mo Bare Metal Box and SQLite',
              summary: 'How collapsing our distributed infrastructure into a single Linux server with SQLite cut latency to 1.8ms.',
              tags: ['architecture', 'sqlite', 'devops'],
            },
            {
              name: 'the-lost-art-of-terminal-uis.md',
              type: 'file',
              path: '/posts/the-lost-art-of-terminal-uis.md',
              size: 3410,
              updatedAt: '2026-06-19',
              permissions: '-rw-r--r--',
              owner: 'nick',
              title: 'The Lost Art of Terminal UIs: ANSI Escapes, PTYs, and 1.06s Refresh Cycles',
              summary: 'Exploring why the 80x24 character grid remains the pinnacle of developer ergonomic productivity.',
              tags: ['retro', 'tui', 'unix'],
            },
          ],
        },
      },
    ];

    setHistoryEntries(initialItems);
  }, []);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEYS.THEME, t);
    triggerDegauss();
  }, [triggerDegauss]);

  const setSoundEnabled = useCallback((val: boolean | ((prev: boolean) => boolean)) => {
    setSoundEnabledState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem(STORAGE_KEYS.SOUND, String(next));
      return next;
    });
  }, []);

  const setScanlinesEnabled = useCallback((val: boolean | ((prev: boolean) => boolean)) => {
    setScanlinesEnabledState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem(STORAGE_KEYS.SCANLINES, String(next));
      return next;
    });
  }, []);

  const setCrtCurvatureEnabled = useCallback((val: boolean | ((prev: boolean) => boolean)) => {
    setCrtCurvatureEnabledState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem(STORAGE_KEYS.CURVATURE, String(next));
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistoryEntries([]);
  }, []);

  const executeCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed) {
        setHistoryEntries((prev) => [
          ...prev,
          {
            id: `entry-${Date.now()}-${Math.random()}`,
            timestamp: new Date().toISOString(),
            command: '',
            path: cwd,
            type: 'text',
            content: '',
          },
        ]);
        return;
      }

      // Add to command history
      setCommandHistory((prev) => [...prev, trimmed]);

      // Execution context
      const context: CommandContext = {
        cwd,
        theme,
        soundEnabled,
        scanlinesEnabled,
        crtCurvatureEnabled,
        history: [...commandHistory, trimmed],
        setCwd,
        setTheme,
        setSoundEnabled,
        setScanlinesEnabled,
        setCrtCurvatureEnabled,
        clearHistory,
        executeCommand,
        setMailMode: setMailDraft,
        setManPage: setActiveManPage,
        setMatrixMode: setMatrixActive,
        powerOff,
        triggerDegauss,
      };

      const result = executeTerminalCommand(trimmed, context);

      if (result.newCwd) {
        setCwd(result.newCwd);
      }

      // Append entry to scrollback (unless clear command)
      if (trimmed.toLowerCase() !== 'clear' && trimmed.toLowerCase() !== 'cls') {
        const newEntry: HistoryEntry = {
          id: `entry-${Date.now()}-${Math.random()}`,
          timestamp: new Date().toISOString(),
          command: trimmed,
          path: cwd,
          type: result.type,
          content: result.content,
        };

        setHistoryEntries((prev) => [...prev, newEntry]);
      }
    },
    [
      cwd,
      theme,
      soundEnabled,
      scanlinesEnabled,
      crtCurvatureEnabled,
      commandHistory,
      clearHistory,
      setTheme,
      setSoundEnabled,
      setScanlinesEnabled,
      setCrtCurvatureEnabled,
      powerOff,
      triggerDegauss,
    ]
  );

  return {
    cwd,
    theme,
    themeConfig: THEMES[theme],
    soundEnabled,
    scanlinesEnabled,
    crtCurvatureEnabled,
    commandHistory,
    historyEntries,
    mailDraft,
    activeManPage,
    matrixActive,
    isPoweredOff,
    isDegaussing,
    flashActive,
    setTheme,
    setSoundEnabled,
    setScanlinesEnabled,
    setCrtCurvatureEnabled,
    clearHistory,
    executeCommand,
    setMailDraft,
    setActiveManPage,
    setMatrixActive,
    powerOff,
    powerOn,
    triggerDegauss,
  };
}
