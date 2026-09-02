import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  HistoryEntry,
  ThemeId,
  MailDraft,
  CommandContext,
} from '../types/terminal';
import { executeTerminalCommand } from '../commands/commandRegistry';
import { THEMES } from '../styles/themes';
import { PROJECTS } from '../vfs/projectsData';

const STORAGE_KEYS = {
  THEME: 'terminal_blog_theme',
  SOUND: 'terminal_blog_sound',
  SCANLINES: 'terminal_blog_scanlines',
  CURVATURE: 'terminal_blog_curvature',
};

const WELCOME_BANNER = `
 ███╗   ██╗██╗ ██████╗██╗  ██╗ ██████╗ ██╗      █████╗ ███████╗
 ████╗  ██║██║██╔════╝██║ ██╔╝██╔═══██╗██║     ██╔══██╗██╔════╝
 ██╔██╗ ██║██║██║     █████═╝ ██║   ██║██║     ███████║███████╗
 ██║╚██╗██║██║██║     ██╔═██╗ ██║   ██║██║     ██╔══██║╚════██║
 ██║ ╚████║██║╚██████╗██║ ╚██╗╚██████╔╝███████╗██║  ██║███████║
 ╚═╝  ╚═══╝╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`;

const INITIAL_ENTRIES: HistoryEntry[] = [
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
    content: `Nicholas Napoli // AI/ML Workflow Engineer & Systems Architect (Winthrop, MA)
AWS Certified AI Practitioner (AIF-C01) | M.S. Security Studies (GPA 3.90) | B.S. Cum Laude

⚡ Quick Commands:
  • 'resume'   - View complete Curriculum Vitae
  • 'skills'   - View technical skills & framework matrix
  • 'projects' - Explore AI/ML pipelines, PySpark ETL & vision systems
  • 'posts'    - Read technical engineering write-ups
  • 'mail'     - Send a direct message or job inquiry
  • 'whoami'   - Summary bio, coordinates & background
  • 'help'     - Interactive command manual
`,
  },
  {
    id: 'welcome-projects',
    timestamp: new Date().toISOString(),
    command: 'ls -l projects',
    path: '/',
    type: 'table',
    content: {
      path: '/projects',
      isLong: true,
      items: PROJECTS.map((proj) => ({
        name: proj.filename,
        type: 'file',
        path: `/projects/${proj.filename}`,
        size: proj.description.length,
        updatedAt: '2026-08-01',
        permissions: '-rwxr-xr-x',
        owner: 'nicholas',
        title: proj.name,
        summary: proj.summary,
        tags: proj.tags,
      })),
    },
  },
];

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
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>(INITIAL_ENTRIES);
  const [mailDraft, setMailDraft] = useState<MailDraft | null>(null);
  const [activeManPage, setActiveManPage] = useState<string | null>(null);
  const [matrixActive, setMatrixActive] = useState<boolean>(false);
  const [isPoweredOff, setIsPoweredOff] = useState<boolean>(false);
  const [isDegaussing, setIsDegaussing] = useState<boolean>(false);
  const [flashActive, setFlashActive] = useState<boolean>(true);

  // Initial power-on flash on boot
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashActive(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

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

  const executeCommandRef = useRef<(rawInput: string) => void>(() => {});

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
        executeCommand: (cmd: string) => executeCommandRef.current(cmd),
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

  useEffect(() => {
    executeCommandRef.current = executeCommand;
  }, [executeCommand]);

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
