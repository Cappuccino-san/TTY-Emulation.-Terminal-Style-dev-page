import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { THEMES } from '../styles/themes';
import type { ThemeConfig, ThemeId } from '../types/terminal';
import {
  playDinoJumpSound,
  playDinoScoreSound,
  playDinoHitSound,
} from '../audio/soundEffects';
import { Volume2, VolumeX, X, RotateCcw, ArrowUp, ArrowDown, Gauge } from 'lucide-react';

interface DinoGameProps {
  theme: ThemeId;
  themeConfig: ThemeConfig;
  soundEnabled: boolean;
  onExit: (finalScore: number, highScore: number) => void;
  onSetTheme: (theme: ThemeId) => void;
  onToggleSound: () => void;
}

// ----------------------------------------------------------------------
// Pixel Art Matrices
// ----------------------------------------------------------------------
const DINO_RUN_1 = [
  '            ########',
  '           #########',
  '           # #######',
  '           #########',
  '           #########',
  '           ######   ',
  '           #########',
  '          ##########',
  '#        ########## ',
  '##      ########### ',
  '###    ############ ',
  '################### ',
  ' #################  ',
  '  ################  ',
  '   ##############   ',
  '     ##########     ',
  '      #########     ',
  '      ##     ##     ',
  '      ##     #      ',
  '      ##            ',
  '      ##            ',
  '       ##           ',
  '       ###          ',
];

const DINO_RUN_2 = [
  '            ########',
  '           #########',
  '           # #######',
  '           #########',
  '           #########',
  '           ######   ',
  '           #########',
  '          ##########',
  '#        ########## ',
  '##      ########### ',
  '###    ############ ',
  '################### ',
  ' #################  ',
  '  ################  ',
  '   ##############   ',
  '     ##########     ',
  '      #########     ',
  '      ##     ##     ',
  '       #     ##     ',
  '             ##     ',
  '             ##     ',
  '             ##     ',
  '            ###     ',
];

const DINO_JUMP = [
  '            ########',
  '           #########',
  '           # #######',
  '           #########',
  '           #########',
  '           ######   ',
  '           #########',
  '          ##########',
  '#        ########## ',
  '##      ########### ',
  '###    ############ ',
  '################### ',
  ' #################  ',
  '  ################  ',
  '   ##############   ',
  '     ##########     ',
  '      #########     ',
  '      ##     ##     ',
  '      ##     ##     ',
  '      #       #     ',
  '                    ',
  '                    ',
  '                    ',
];

const DINO_DEAD = [
  '            ########',
  '           #########',
  '           #X#######',
  '           #########',
  '           #########',
  '           ######   ',
  '           #########',
  '          ##########',
  '#        ########## ',
  '##      ########### ',
  '###    ############ ',
  '################### ',
  ' #################  ',
  '  ################  ',
  '   ##############   ',
  '     ##########     ',
  '      #########     ',
  '      ##     ##     ',
  '      ##     ##     ',
  '      ##     ##     ',
  '      ##     ##     ',
  '      ##     ##     ',
  '     ###    ###     ',
];

const DINO_DUCK_1 = [
  '                    ##################',
  '                   ###################',
  '                   # #################',
  '                   ###################',
  '                   ################   ',
  '################  ####################',
  '######################################',
  ' #####################################',
  '  ####################################',
  '   ################################   ',
  '     #############################    ',
  '      ##     ##                       ',
  '      ##     #                        ',
  '      ##                              ',
  '      ###                             ',
];

const DINO_DUCK_2 = [
  '                    ##################',
  '                   ###################',
  '                   # #################',
  '                   ###################',
  '                   ################   ',
  '################  ####################',
  '######################################',
  ' #####################################',
  '  ####################################',
  '   ################################   ',
  '     #############################    ',
  '      ##     ##                       ',
  '       #     ##                       ',
  '             ##                       ',
  '            ###                       ',
];

const CACTUS_SMALL = [
  '    ##    ',
  '    ##    ',
  '    ##    ',
  '##  ##    ',
  '##  ##  ##',
  '##  ##  ##',
  '######  ##',
  ' #####  ##',
  '    ######',
  '    ##### ',
  '    ##    ',
  '    ##    ',
  '    ##    ',
  '    ##    ',
  '    ##    ',
  '    ##    ',
  '    ##    ',
  '    ##    ',
];

const CACTUS_TALL = [
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '  ##  ##      ',
  '  ##  ##  ##  ',
  '  ##  ##  ##  ',
  '  ##  ##  ##  ',
  '  ######  ##  ',
  '   #####  ##  ',
  '      ######  ',
  '      #####   ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
  '      ##      ',
];

const CACTUS_DOUBLE = [
  '    ##        ##    ',
  '    ##        ##    ',
  '##  ##    ##  ##    ',
  '##  ##    ##  ##  ##',
  '######    ######  ##',
  ' #####     #####  ##',
  '    ##        ######',
  '    ##        ##### ',
  '    ##        ##    ',
  '    ##        ##    ',
  '    ##        ##    ',
  '    ##        ##    ',
  '    ##        ##    ',
  '    ##        ##    ',
  '    ##        ##    ',
  '    ##        ##    ',
];

const BIRD_WING_UP = [
  '        ###             ',
  '       #####            ',
  '      #######           ',
  '     #########          ',
  '    ###########         ',
  '###################     ',
  ' ###################### ',
  '  ######################',
  '    ####################',
  '       ##########  # #  ',
  '         ######    ###  ',
  '           ##           ',
];

const BIRD_WING_DOWN = [
  '###################     ',
  ' ###################### ',
  '  ######################',
  '    ####################',
  '       ##########  # #  ',
  '         ######    ###  ',
  '    ###########         ',
  '     #########          ',
  '      #######           ',
  '       #####            ',
  '        ###             ',
  '           ##           ',
];

const CLOUD_MATRIX = [
  '      ######      ',
  '    ##########    ',
  '  ##############  ',
  '##################',
  '##################',
  ' ################ ',
];

// Helper to draw a pixel matrix onto 2D canvas
function drawMatrix(
  ctx: CanvasRenderingContext2D,
  matrix: string[],
  startX: number,
  startY: number,
  pixelSize: number,
  color: string,
  glowColor?: string
) {
  ctx.save();
  ctx.fillStyle = color;
  if (glowColor) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 4;
  }
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c] !== ' ') {
        ctx.fillRect(startX + c * pixelSize, startY + r * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  ctx.restore();
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'small' | 'tall' | 'double' | 'bird';
  altitude?: 'low' | 'high';
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
}

export type SpeedMode = 'chill' | 'normal' | 'fast';

const SPEED_CONFIG: Record<SpeedMode, { baseSpeed: number; maxSpeed: number; label: string }> = {
  chill: { baseSpeed: 2.8, maxSpeed: 6.2, label: 'Chill' },
  normal: { baseSpeed: 3.8, maxSpeed: 8.5, label: 'Normal' },
  fast: { baseSpeed: 5.2, maxSpeed: 12.0, label: 'Fast' },
};

const STORAGE_KEY = 'terminal_dino_highscore';

export const DinoGame: React.FC<DinoGameProps> = ({
  theme,
  themeConfig,
  soundEnabled,
  onExit,
  onSetTheme,
  onToggleSound,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [speedMode, setSpeedMode] = useState<SpeedMode>('normal');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Game internal state references (to avoid closure lags in requestAnimationFrame loop)
  const gameStateRef = useRef({
    dinoY: 0,
    dinoVY: 0,
    isJumping: false,
    isDucking: false,
    groundY: 175,
    speed: SPEED_CONFIG.normal.baseSpeed,
    speedMode: 'normal' as SpeedMode,
    score: 0,
    highScore: 0,
    isGameOver: false,
    isPaused: false,
    hasStarted: false,
    frameCounter: 0,
    obstacles: [] as Obstacle[],
    clouds: [
      { x: 180, y: 35, speed: 0.8 },
      { x: 460, y: 25, speed: 0.6 },
      { x: 720, y: 45, speed: 0.9 },
    ] as Cloud[],
    groundOffset: 0,
    scoreMilestoneFlash: 0,
    themeConfig,
    soundEnabled,
  });

  // Keep references synced with props
  useEffect(() => {
    gameStateRef.current.themeConfig = themeConfig;
  }, [themeConfig]);

  useEffect(() => {
    gameStateRef.current.soundEnabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    gameStateRef.current.highScore = highScore;
  }, [highScore]);

  useEffect(() => {
    gameStateRef.current.speedMode = speedMode;
    if (!gameStateRef.current.hasStarted || gameStateRef.current.isGameOver) {
      gameStateRef.current.speed = SPEED_CONFIG[speedMode].baseSpeed;
    }
  }, [speedMode]);

  // Restart game
  const restartGame = useCallback(() => {
    const s = gameStateRef.current;
    s.dinoY = 0;
    s.dinoVY = 0;
    s.isJumping = false;
    s.isDucking = false;
    s.speed = SPEED_CONFIG[speedMode].baseSpeed;
    s.score = 0;
    s.isGameOver = false;
    s.isPaused = false;
    s.hasStarted = true;
    s.frameCounter = 0;
    s.obstacles = [];
    s.scoreMilestoneFlash = 0;
    setIsGameOver(false);
    setIsPaused(false);
    setHasStarted(true);
    setScore(0);
  }, [speedMode]);

  // Jump action
  const triggerJump = useCallback(() => {
    const s = gameStateRef.current;
    if (!s.hasStarted) {
      s.hasStarted = true;
      setHasStarted(true);
    }
    if (s.isGameOver) {
      // Restart
      restartGame();
      return;
    }
    if (s.isPaused) return;

    if (!s.isJumping) {
      s.isJumping = true;
      s.isDucking = false;
      s.dinoVY = -10.0;
      if (s.soundEnabled) {
        playDinoJumpSound();
      }
    }
  }, [restartGame]);

  // Duck action
  const setDuck = useCallback((ducking: boolean) => {
    const s = gameStateRef.current;
    if (s.isGameOver || s.isPaused) return;
    if (!s.isJumping) {
      s.isDucking = ducking;
    }
  }, []);

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastTime = performance.now();

    const VIRTUAL_WIDTH = 800;
    const VIRTUAL_HEIGHT = 220;
    const PIXEL_SIZE = 2;
    const GRAVITY = 0.5;

    canvas.width = VIRTUAL_WIDTH;
    canvas.height = VIRTUAL_HEIGHT;

    const checkCollision = (
      dinoBox: { x: number; y: number; w: number; h: number },
      obsBox: { x: number; y: number; w: number; h: number }
    ) => {
      // Small inset margin for forgiving, fair collision detection
      const margin = 5;
      return (
        dinoBox.x + margin < obsBox.x + obsBox.w - margin &&
        dinoBox.x + dinoBox.w - margin > obsBox.x + margin &&
        dinoBox.y + margin < obsBox.y + obsBox.h - margin &&
        dinoBox.y + dinoBox.h - margin > obsBox.y + margin
      );
    };

    const loop = (currentTime: number) => {
      const elapsed = currentTime ? currentTime - lastTime : 16.6;
      lastTime = currentTime || performance.now();

      // Bound delta: prevents huge skips on tab-switch while stabilizing 120Hz/144Hz monitors
      const dt = Math.max(8, Math.min(36, elapsed));
      const delta = dt / (1000 / 60);

      const s = gameStateRef.current;
      const currentTheme = s.themeConfig;

      // 1. Update Game State
      if (s.hasStarted && !s.isGameOver && !s.isPaused) {
        s.frameCounter += delta;

        // Controlled speed curve scaled by speed mode (Chill / Normal / Fast)
        const cfg = SPEED_CONFIG[s.speedMode || 'normal'];
        s.speed = Math.min(cfg.maxSpeed, cfg.baseSpeed + s.score * 0.0015);
        const frameSpeed = s.speed * delta;

        // Ground scroll
        s.groundOffset = (s.groundOffset + frameSpeed) % 24;

        // Clouds scroll
        s.clouds.forEach((c) => {
          c.x -= c.speed * delta;
          if (c.x < -60) {
            c.x = VIRTUAL_WIDTH + Math.random() * 80;
            c.y = 20 + Math.random() * 45;
          }
        });

        // Physics: Dino jumping & gravity
        if (s.isJumping) {
          s.dinoY += s.dinoVY * delta;
          s.dinoVY += GRAVITY * delta;

          if (s.dinoY >= 0) {
            s.dinoY = 0;
            s.dinoVY = 0;
            s.isJumping = false;
          }
        }

        // Score progression
        s.score += 0.08 * delta;
        const currentIntScore = Math.floor(s.score);
        if (currentIntScore > 0 && currentIntScore % 100 === 0 && s.scoreMilestoneFlash <= 0) {
          s.scoreMilestoneFlash = 40;
          if (s.soundEnabled) {
            playDinoScoreSound();
          }
        }
        if (s.scoreMilestoneFlash > 0) {
          s.scoreMilestoneFlash -= delta;
        }

        // High Score
        if (currentIntScore > s.highScore) {
          s.highScore = currentIntScore;
          localStorage.setItem(STORAGE_KEY, String(currentIntScore));
          setHighScore(currentIntScore);
        }

        // Spawn Obstacles
        const lastObs = s.obstacles[s.obstacles.length - 1];
        const minGap = Math.max(220, 380 - s.speed * 12);
        const canSpawn = !lastObs || VIRTUAL_WIDTH - (lastObs.x + lastObs.width) > minGap;

        if (canSpawn && Math.random() < 0.03 * delta) {
          const rand = Math.random();
          let newObs: Obstacle;

          if (s.score > 280 && rand < 0.28) {
            // Pterodactyl Bird
            const altitude = Math.random() > 0.5 ? 'low' : 'high';
            // low requires jump, high requires duck or stay low
            const birdY = altitude === 'high' ? s.groundY - 58 : s.groundY - 32;
            newObs = {
              x: VIRTUAL_WIDTH + 20,
              y: birdY,
              width: 24 * PIXEL_SIZE,
              height: 12 * PIXEL_SIZE,
              type: 'bird',
              altitude,
            };
          } else if (rand < 0.55) {
            // Small Cactus
            newObs = {
              x: VIRTUAL_WIDTH + 20,
              y: s.groundY - 18 * PIXEL_SIZE,
              width: 10 * PIXEL_SIZE,
              height: 18 * PIXEL_SIZE,
              type: 'small',
            };
          } else if (rand < 0.8) {
            // Double Cactus
            newObs = {
              x: VIRTUAL_WIDTH + 20,
              y: s.groundY - 16 * PIXEL_SIZE,
              width: 20 * PIXEL_SIZE,
              height: 16 * PIXEL_SIZE,
              type: 'double',
            };
          } else {
            // Tall Cactus
            newObs = {
              x: VIRTUAL_WIDTH + 20,
              y: s.groundY - 22 * PIXEL_SIZE,
              width: 14 * PIXEL_SIZE,
              height: 22 * PIXEL_SIZE,
              type: 'tall',
            };
          }

          s.obstacles.push(newObs);
        }

        // Move & Cull Obstacles
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= frameSpeed;
          if (obs.x + obs.width < -30) {
            s.obstacles.splice(i, 1);
          }
        }

        // Collision Detection
        const dinoW = s.isDucking ? 38 * PIXEL_SIZE : 23 * PIXEL_SIZE;
        const dinoH = s.isDucking ? 15 * PIXEL_SIZE : 23 * PIXEL_SIZE;
        const dinoX = 60;
        const dinoY = s.groundY - dinoH + s.dinoY;

        const dinoBox = { x: dinoX, y: dinoY, w: dinoW, h: dinoH };

        for (const obs of s.obstacles) {
          const obsBox = { x: obs.x, y: obs.y, w: obs.width, h: obs.height };
          if (checkCollision(dinoBox, obsBox)) {
            // Crash!
            s.isGameOver = true;
            setIsGameOver(true);
            if (s.soundEnabled) {
              playDinoHitSound();
            }

            // Confetti if broke all-time high score
            if (currentIntScore >= s.highScore && currentIntScore > 50) {
              try {
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.6 },
                  colors: [
                    currentTheme.brightText,
                    currentTheme.accent,
                    currentTheme.accentAlt,
                  ],
                });
              } catch {
                // Ignore confetti error
              }
            }
            break;
          }
        }

        setScore(Math.floor(s.score));
      }

      // 2. Render Frame (Full Theme Reactivity)
      ctx.clearRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

      // Background Fill
      ctx.fillStyle = currentTheme.bg;
      ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

      // Subtle CRT grid pattern
      ctx.strokeStyle = currentTheme.border;
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, VIRTUAL_WIDTH - 1, VIRTUAL_HEIGHT - 1);

      // Clouds
      s.clouds.forEach((cloud) => {
        drawMatrix(
          ctx,
          CLOUD_MATRIX,
          cloud.x,
          cloud.y,
          PIXEL_SIZE,
          currentTheme.dimText
        );
      });

      // Ground Line & Dotted Texture
      const gy = s.groundY;
      ctx.strokeStyle = currentTheme.text;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(VIRTUAL_WIDTH, gy);
      ctx.stroke();

      // Scrolling Ground Bumps & Cracks
      ctx.fillStyle = currentTheme.dimText;
      for (let x = -s.groundOffset; x < VIRTUAL_WIDTH + 24; x += 24) {
        if ((x + s.groundOffset) % 48 === 0) {
          ctx.fillRect(x + 4, gy + 5, 4, 2);
          ctx.fillRect(x + 14, gy + 9, 3, 2);
        } else if ((x + s.groundOffset) % 72 === 0) {
          ctx.fillRect(x + 2, gy + 8, 2, 2);
          ctx.fillRect(x + 18, gy + 4, 5, 2);
        } else {
          ctx.fillRect(x + 10, gy + 6, 2, 2);
        }
      }

      // Obstacles
      s.obstacles.forEach((obs) => {
        if (obs.type === 'small') {
          drawMatrix(
            ctx,
            CACTUS_SMALL,
            obs.x,
            obs.y,
            PIXEL_SIZE,
            currentTheme.accent,
            currentTheme.accent
          );
        } else if (obs.type === 'tall') {
          drawMatrix(
            ctx,
            CACTUS_TALL,
            obs.x,
            obs.y,
            PIXEL_SIZE,
            currentTheme.accent,
            currentTheme.accent
          );
        } else if (obs.type === 'double') {
          drawMatrix(
            ctx,
            CACTUS_DOUBLE,
            obs.x,
            obs.y,
            PIXEL_SIZE,
            currentTheme.accent,
            currentTheme.accent
          );
        } else if (obs.type === 'bird') {
          // 2-frame flapping wing animation
          const wingFrame = Math.floor(s.frameCounter / 10) % 2 === 0;
          drawMatrix(
            ctx,
            wingFrame ? BIRD_WING_UP : BIRD_WING_DOWN,
            obs.x,
            obs.y,
            PIXEL_SIZE,
            currentTheme.accentAlt,
            currentTheme.accentAlt
          );
        }
      });

      // Dinosaur Sprite
      const dinoColor = currentTheme.brightText;
      const dinoGlow = currentTheme.glow;
      const dinoX = 60;

      if (s.isGameOver) {
        drawMatrix(
          ctx,
          DINO_DEAD,
          dinoX,
          s.groundY - 23 * PIXEL_SIZE + s.dinoY,
          PIXEL_SIZE,
          dinoColor,
          dinoGlow
        );
      } else if (s.isJumping) {
        drawMatrix(
          ctx,
          DINO_JUMP,
          dinoX,
          s.groundY - 23 * PIXEL_SIZE + s.dinoY,
          PIXEL_SIZE,
          dinoColor,
          dinoGlow
        );
      } else if (s.isDucking) {
        const duckFrame = Math.floor(s.frameCounter / 6) % 2 === 0;
        drawMatrix(
          ctx,
          duckFrame ? DINO_DUCK_1 : DINO_DUCK_2,
          dinoX,
          s.groundY - 15 * PIXEL_SIZE + s.dinoY,
          PIXEL_SIZE,
          dinoColor,
          dinoGlow
        );
      } else if (!s.hasStarted) {
        drawMatrix(
          ctx,
          DINO_RUN_1,
          dinoX,
          s.groundY - 23 * PIXEL_SIZE,
          PIXEL_SIZE,
          dinoColor,
          dinoGlow
        );
      } else {
        const runFrame = Math.floor(s.frameCounter / 6) % 2 === 0;
        drawMatrix(
          ctx,
          runFrame ? DINO_RUN_1 : DINO_RUN_2,
          dinoX,
          s.groundY - 23 * PIXEL_SIZE,
          PIXEL_SIZE,
          dinoColor,
          dinoGlow
        );
      }

      // HUD Score on Canvas (Top Right)
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';

      const padScore = (num: number) => String(Math.floor(num)).padStart(5, '0');
      const hiText = `HI ${padScore(s.highScore)}`;
      const currentScoreText = padScore(s.score);

      // High Score label (dimmed)
      ctx.fillStyle = currentTheme.dimText;
      ctx.fillText(hiText, VIRTUAL_WIDTH - 90, 30);

      // Current Score label (bright, flashes on milestones)
      const isFlashing = s.scoreMilestoneFlash > 0 && Math.floor(s.scoreMilestoneFlash / 4) % 2 === 0;
      ctx.fillStyle = isFlashing ? currentTheme.accentAlt : currentTheme.brightText;
      ctx.fillText(currentScoreText, VIRTUAL_WIDTH - 25, 30);

      // Start / Pause / Game Over Overlays
      if (!s.hasStarted) {
        ctx.textAlign = 'center';
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillStyle = currentTheme.brightText;
        ctx.fillText('PRESS [SPACE] / [▲] OR TAP TO RUN', VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2 - 15);

        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillStyle = currentTheme.dimText;
        ctx.fillText('[↑] JUMP   •   [↓] DUCK   •   [P] PAUSE   •   [ESC] EXIT', VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2 + 10);
      } else if (s.isGameOver) {
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px "JetBrains Mono", monospace';
        ctx.fillStyle = currentTheme.brightText;
        ctx.shadowColor = currentTheme.accent;
        ctx.shadowBlur = 8;
        ctx.fillText('G A M E   O V E R', VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2 - 20);
        ctx.shadowBlur = 0;

        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillStyle = currentTheme.text;
        ctx.fillText('PRESS [SPACE] OR TAP TO RETRY', VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2 + 8);

        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillStyle = currentTheme.dimText;
        ctx.fillText(`SCORE: ${padScore(s.score)}   |   BEST: ${padScore(s.highScore)}`, VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2 + 30);
      } else if (s.isPaused) {
        ctx.textAlign = 'center';
        ctx.font = 'bold 16px "JetBrains Mono", monospace';
        ctx.fillStyle = currentTheme.brightText;
        ctx.fillText('[ PAUSED - PRESS P TO RESUME ]', VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2);
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser scroll on space / arrows when game is active
      if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        triggerJump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        setDuck(true);
      } else if (e.code === 'KeyP') {
        const s = gameStateRef.current;
        if (!s.isGameOver && s.hasStarted) {
          s.isPaused = !s.isPaused;
          setIsPaused(s.isPaused);
        }
      } else if (e.code === 'KeyT') {
        // Cycle theme
        const themesList = Object.keys(THEMES) as ThemeId[];
        const nextIdx = (themesList.indexOf(theme) + 1) % themesList.length;
        onSetTheme(themesList[nextIdx]);
      } else if (e.code === 'KeyM') {
        onToggleSound();
      } else if (e.code === 'Escape' || e.code === 'KeyQ') {
        const s = gameStateRef.current;
        onExit(Math.floor(s.score), s.highScore);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        setDuck(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerJump, setDuck, onExit, onSetTheme, onToggleSound, theme]);

  const handleExitClick = () => {
    const s = gameStateRef.current;
    onExit(Math.floor(s.score), s.highScore);
  };

  const themeKeys = Object.keys(THEMES) as ThemeId[];

  return (
    <div
      ref={containerRef}
      className="dino-game-container my-3 p-3 border rounded-xs font-mono select-none flex flex-col gap-2.5 transition-colors duration-200"
      style={{
        borderColor: themeConfig.border,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        boxShadow: `0 0 16px ${themeConfig.border}40`,
      }}
    >
      {/* 1. Arcade Marquee Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b text-xs"
        style={{ borderColor: themeConfig.border }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-bold uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: themeConfig.brightText }}
          >
            <span>🎮</span>
            <span>TTY-DINO v1.0</span>
            <span className="opacity-60 text-[10px] hidden sm:inline">// PHOSPHOR CHROMIUM RUNNER</span>
          </span>
          {isGameOver && (
            <span
              className="px-1.5 py-0.2 border text-[10px] uppercase font-bold"
              style={{
                borderColor: themeConfig.accent,
                color: themeConfig.brightText,
                backgroundColor: `${themeConfig.accent}25`,
              }}
            >
              CRASHED
            </span>
          )}
          {!hasStarted && (
            <span
              className="px-1.5 py-0.2 border text-[10px] uppercase opacity-75"
              style={{ borderColor: themeConfig.border, color: themeConfig.dimText }}
            >
              READY
            </span>
          )}
        </div>

        {/* Action Controls & Sound */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const modes: SpeedMode[] = ['normal', 'chill', 'fast'];
              const nextIdx = (modes.indexOf(speedMode) + 1) % modes.length;
              setSpeedMode(modes[nextIdx]);
            }}
            className="flex items-center gap-1 px-2 py-0.5 border text-xs cursor-pointer hover:bg-white/10 transition-colors"
            style={{
              borderColor: speedMode === 'chill' ? themeConfig.accent : themeConfig.border,
              color: speedMode === 'chill' ? themeConfig.brightText : themeConfig.text,
              backgroundColor: speedMode === 'chill' ? `${themeConfig.accent}15` : undefined,
            }}
            title="Toggle pace: Chill (0.8x) / Normal (1.0x) / Fast (1.4x)"
          >
            <Gauge size={12} />
            <span className="text-[10px]">Speed: {SPEED_CONFIG[speedMode].label}</span>
          </button>

          <button
            onClick={onToggleSound}
            className="flex items-center gap-1 px-2 py-0.5 border text-xs cursor-pointer hover:bg-white/10 transition-colors"
            style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            title={`Toggle Audio Sound: ${soundEnabled ? 'ON' : 'OFF'} [Hotkey: M]`}
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span className="text-[10px]">{soundEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
          </button>

          <button
            onClick={restartGame}
            className="flex items-center gap-1 px-2 py-0.5 border text-xs cursor-pointer hover:bg-white/10 transition-colors"
            style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            title="Restart Game [Space]"
          >
            <RotateCcw size={12} />
            <span className="text-[10px]">Restart</span>
          </button>

          <button
            onClick={handleExitClick}
            className="flex items-center gap-1 px-2 py-0.5 border text-xs cursor-pointer hover:bg-red-500/20 transition-colors"
            style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
            title="Exit Game [ESC]"
          >
            <X size={12} />
            <span className="text-[10px]">Exit [ESC]</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Theme Switcher Row (Direct user request: see dinosaur change colors!) */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] py-0.5">
        <span className="opacity-60 shrink-0" style={{ color: themeConfig.dimText }}>
          Phosphor Theme [T]:
        </span>
        {themeKeys.map((tId) => (
          <button
            key={tId}
            onClick={() => onSetTheme(tId)}
            className={`px-1.5 py-0.2 border uppercase rounded-2xs cursor-pointer transition-all shrink-0 ${
              theme === tId ? 'font-bold' : 'opacity-65 hover:opacity-100'
            }`}
            style={{
              borderColor: theme === tId ? themeConfig.brightText : themeConfig.border,
              backgroundColor: theme === tId ? `${themeConfig.accent}30` : 'transparent',
              color: theme === tId ? themeConfig.brightText : themeConfig.dimText,
            }}
            title={`Switch to ${THEMES[tId].name}`}
          >
            {tId}
          </button>
        ))}
      </div>

      {/* 3. Main HTML5 Canvas Area */}
      <div
        className="relative w-full overflow-hidden border cursor-pointer group"
        style={{ borderColor: themeConfig.border }}
        onClick={triggerJump}
        title="Click or Tap anywhere to Jump / Start / Retry"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto block"
          style={{
            maxHeight: '260px',
            backgroundColor: themeConfig.bg,
          }}
        />

        {/* Pause Overlay indicator */}
        {isPaused && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/60 font-bold text-sm tracking-wider"
            style={{ color: themeConfig.brightText }}
          >
            [ GAME PAUSED - PRESS P OR CLICK TO RESUME ]
          </div>
        )}
      </div>

      {/* 4. Footer Help & Touch Controls */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t text-[11px]"
        style={{ borderColor: themeConfig.border }}
      >
        <div className="text-[10px] opacity-75 hidden sm:block" style={{ color: themeConfig.dimText }}>
          Controls: <span style={{ color: themeConfig.text }}>[SPACE]/[↑]</span> Jump •{' '}
          <span style={{ color: themeConfig.text }}>[↓]</span> Duck •{' '}
          <span style={{ color: themeConfig.text }}>[P]</span> Pause •{' '}
          <span style={{ color: themeConfig.text }}>[T]</span> Cycle Theme •{' '}
          <span style={{ color: themeConfig.text }}>[ESC]</span> Exit
        </div>

        {/* Mobile On-Screen Buttons */}
        <div className="flex sm:hidden items-center gap-2 w-full justify-between pt-1">
          <button
            onPointerDown={() => setDuck(true)}
            onPointerUp={() => setDuck(false)}
            className="flex-1 flex items-center justify-center gap-1 py-2 border text-xs active:bg-white/20 font-bold"
            style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
          >
            <ArrowDown size={14} /> DUCK
          </button>
          <button
            onClick={triggerJump}
            className="flex-1 flex items-center justify-center gap-1 py-2 border text-xs active:bg-white/20 font-bold"
            style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
          >
            <ArrowUp size={14} /> JUMP
          </button>
        </div>

        <div className="text-[10px] ml-auto font-semibold" style={{ color: themeConfig.accent }}>
          Current Score: {String(score).padStart(5, '0')} | High Score: {String(highScore).padStart(5, '0')}
        </div>
      </div>
    </div>
  );
};
