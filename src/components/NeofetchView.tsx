import React from 'react';
import type { ThemeConfig } from '../types/terminal';

interface NeofetchViewProps {
  themeConfig: ThemeConfig;
  onCommandClick?: (cmd: string) => void;
}

const ASCII_LOGO = `
    ██████╗ ███████╗██╗   ██╗██████╗  ██████╗ ██╗  ██╗
    ██╔══██╗██╔════╝██║   ██║██╔══██╗██╔═══██╗╚██╗██╔╝
    ██║  ██║█████╗  ██║   ██║██████╔╝██║   ██║ ╚███╔╝ 
    ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══██╗██║   ██║ ██╔██╗ 
    ██████╔╝███████╗ ╚████╔╝ ██████╔╝╚██████╔╝██╔╝ ██╗
    ╚═════╝ ╚══════╝  ╚═══╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
`;

export const NeofetchView: React.FC<NeofetchViewProps> = ({ themeConfig, onCommandClick }) => {
  const infoItems = [
    { label: 'OS', value: 'AGY-OS 2.0 (x86_64-antigravity-linux-gnu)' },
    { label: 'Host', value: 'Nick Napoli Workstation [Bare Metal 32-Core Ryzen 9]' },
    { label: 'Kernel', value: '6.12.8-hardened-ebpf-tty' },
    { label: 'Uptime', value: '418 days, 14 hours, 32 mins' },
    { label: 'Shell', value: 'agy-sh 2.4.0 (x86_64-antigravity)' },
    { label: 'Resolution', value: `${window.innerWidth}x${window.innerHeight} (CRT 1.06s raster)` },
    { label: 'Terminal', value: 'vt220-color / WebGL2 Direct Draw' },
    { label: 'CPU', value: 'AMD Ryzen 9 7950X (32) @ 5.700GHz' },
    { label: 'GPU', value: 'NVIDIA GeForce RTX 4090 (24GB VRAM)' },
    { label: 'Memory', value: '1.8GiB / 64.0GiB (Zero-Leak Heap)' },
    { label: 'Active Theme', value: `${themeConfig.name}` },
  ];

  const paletteColors = [
    '#000000', '#ff5555', '#50fa7b', '#f1fa8c', '#bd93f9', '#ff79c6', '#8be9fd', '#f8f8f2',
    '#6272a4', '#ff6e6e', '#69ff94', '#ffffa5', '#d6acff', '#ff92df', '#a4ffff', '#ffffff',
  ];

  return (
    <div className="my-3 font-mono text-sm leading-relaxed overflow-x-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* ASCII Logo */}
        <div
          className="whitespace-pre font-bold select-none text-xs md:text-sm"
          style={{ color: themeConfig.brightText, textShadow: themeConfig.glow }}
        >
          {ASCII_LOGO}
        </div>

        {/* System Details */}
        <div className="flex-1 space-y-1">
          <div className="font-bold pb-1 border-b border-dashed mb-2" style={{ borderColor: themeConfig.border }}>
            <span style={{ color: themeConfig.brightText }}>visitor</span>
            <span style={{ color: themeConfig.dimText }}>@</span>
            <span style={{ color: themeConfig.promptHost }}>devbox</span>
            <span className="text-xs ml-2 opacity-60">-------------------------</span>
          </div>

          {infoItems.map((item, idx) => (
            <div key={idx} className="flex text-xs md:text-sm">
              <span className="w-28 md:w-32 font-semibold" style={{ color: themeConfig.brightText }}>
                {item.label}:
              </span>
              <span style={{ color: themeConfig.text }}>{item.value}</span>
            </div>
          ))}

          {/* ANSI Color Swatches */}
          <div className="pt-3 flex gap-1 items-center">
            {paletteColors.slice(0, 8).map((color, i) => (
              <span
                key={i}
                className="w-4 h-3 inline-block rounded-xs"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-1 items-center pb-2">
            {paletteColors.slice(8, 16).map((color, i) => (
              <span
                key={i}
                className="w-4 h-3 inline-block rounded-xs"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="pt-2 text-xs flex gap-2">
            <button
              onClick={() => onCommandClick?.('ls -l posts')}
              className="px-2 py-0.5 border text-xs cursor-pointer transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.accent }}
            >
              ➔ Read Articles (ls posts)
            </button>
            <button
              onClick={() => onCommandClick?.('whoami')}
              className="px-2 py-0.5 border text-xs cursor-pointer transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
            >
              ➔ Bio (whoami)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
