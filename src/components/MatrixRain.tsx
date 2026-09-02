import React, { useEffect, useRef } from 'react';
import { THEMES } from '../styles/themes';
import type { ThemeId } from '../types/terminal';

interface MatrixRainProps {
  theme: ThemeId;
  onExit: () => void;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ theme, onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeConfig = THEMES[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Matrix characters: Katakana, Cyrillic, Latin, Math, Hex
    const characters = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEFλπΣΨΩ§Ξ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black background creates fade trail
      ctx.fillStyle = 'rgba(2, 9, 4, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Lead character glows bright white/cyan
        const isLeading = Math.random() > 0.88;
        ctx.fillStyle = isLeading ? themeConfig.brightText : themeConfig.text;
        ctx.shadowColor = isLeading ? themeConfig.accent : 'transparent';
        ctx.shadowBlur = isLeading ? 8 : 0;

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      onExit();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [theme, onExit, themeConfig]);

  return (
    <div
      onClick={onExit}
      className="fixed inset-0 z-50 bg-black cursor-pointer flex flex-col justify-between"
      title="Click or press any key to exit Matrix mode"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 p-4 flex justify-between items-center text-xs tracking-wider opacity-75">
        <span
          className="px-2 py-1 border"
          style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
        >
          [ MATRIX TTY PROTOCOL ACTIVE // PRESS ANY KEY OR CLICK TO EXIT ]
        </span>
      </div>
    </div>
  );
};
