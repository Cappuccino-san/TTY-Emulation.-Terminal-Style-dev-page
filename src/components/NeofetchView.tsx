import React from 'react';
import type { ThemeConfig } from '../types/terminal';

interface NeofetchViewProps {
  themeConfig: ThemeConfig;
  onCommandClick?: (cmd: string) => void;
}

const ASCII_LOGO = `
    ███╗   ██╗██╗ ██████╗██╗  ██╗
    ████╗  ██║██║██╔════╝██║ ██╔╝
    ██╔██╗ ██║██║██║     █████═╝ 
    ██║╚██╗██║██║██║     ██╔═██╗ 
    ██║ ╚████║██║╚██████╗██║ ╚██╗
    ╚═╝  ╚═══╝╚═╝ ╚═════╝╚═╝  ╚═╝
`;

export const NeofetchView: React.FC<NeofetchViewProps> = ({ themeConfig, onCommandClick }) => {
  const infoItems = [
    { label: 'Engineer', value: 'Nicholas Napoli (AI/ML Workflow Engineer)' },
    { label: 'Location', value: 'Winthrop, MA (Boston Area)' },
    { label: 'Specialization', value: 'Machine Learning, GenAI Pipelines & Distributed Big Data' },
    { label: 'Certifications', value: 'AWS Certified AI Practitioner (AIF-C01) [2026]' },
    { label: 'Education', value: 'M.S. Security Studies (GPA 3.90) // B.S. (Cum Laude)' },
    { label: 'Core Frameworks', value: 'PyTorch 2.x, OpenCV, MediaPipe, AWS Bedrock, ComfyUI' },
    { label: 'Cloud & Data', value: 'AWS (SageMaker, S3, Glue, ECR), Databricks, PySpark' },
    { label: 'Full-Stack', value: 'React 19, TypeScript, FastAPI, PostgreSQL, Docker' },
    { label: 'Security Standards', value: 'NIST CSF, AWS KMS, IAM Least-Privilege, OWASP' },
    { label: 'Email', value: 'njnapoli99@gmail.com | (857) 205-3266' },
    { label: 'LinkedIn', value: 'linkedin.com/in/nicholas-napoli476' },
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
          <div className="text-[11px] opacity-80 mt-1 text-center font-mono">
            [NAPOLI-ML-OS]
          </div>
        </div>

        {/* System Details */}
        <div className="flex-1 space-y-1">
          <div className="font-bold pb-1 border-b border-dashed mb-2" style={{ borderColor: themeConfig.border }}>
            <span style={{ color: themeConfig.brightText }}>nicholas</span>
            <span style={{ color: themeConfig.dimText }}>@</span>
            <span style={{ color: themeConfig.promptHost }}>boston-ml-box</span>
            <span className="text-xs ml-2 opacity-60">--------------------------------</span>
          </div>

          {infoItems.map((item, idx) => (
            <div key={idx} className="flex text-xs md:text-sm">
              <span className="w-32 md:w-36 font-semibold shrink-0" style={{ color: themeConfig.brightText }}>
                {item.label}:
              </span>
              <span className="break-all" style={{ color: themeConfig.text }}>{item.value}</span>
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

          <div className="pt-2 text-xs flex flex-wrap gap-2">
            <button
              onClick={() => onCommandClick?.('resume')}
              className="px-2 py-0.5 border text-xs cursor-pointer hover:bg-white/5 transition-colors font-semibold"
              style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
            >
              ➔ View Resume (resume)
            </button>
            <button
              onClick={() => onCommandClick?.('ls -l projects')}
              className="px-2 py-0.5 border text-xs cursor-pointer hover:bg-white/5 transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.accent }}
            >
              ➔ Projects (ls projects)
            </button>
            <button
              onClick={() => onCommandClick?.('skills')}
              className="px-2 py-0.5 border text-xs cursor-pointer hover:bg-white/5 transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            >
              ➔ Skills Matrix (skills)
            </button>
            <button
              onClick={() => onCommandClick?.('mail')}
              className="px-2 py-0.5 border text-xs cursor-pointer hover:bg-white/5 transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.accentAlt }}
            >
              ➔ Send Message (mail)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
