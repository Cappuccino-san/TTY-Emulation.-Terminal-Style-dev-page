import React from 'react';
import type { ThemeConfig } from '../types/terminal';
import { Sparkles, Terminal, FileText, Folder, User, Mail, HelpCircle, Award, Briefcase, Cpu, Trash2, Gamepad2 } from 'lucide-react';

interface QuickToolbarProps {
  themeConfig: ThemeConfig;
  onCommandClick: (cmd: string) => void;
}

export const QuickToolbar: React.FC<QuickToolbarProps> = ({
  themeConfig,
  onCommandClick,
}) => {
  const quickActions = [
    { label: 'clear', icon: <Trash2 size={11} />, desc: 'Clear Screen' },
    { label: 'dino', icon: <Gamepad2 size={11} />, desc: 'Dino Runner Game' },
    { label: 'resume', icon: <Award size={11} />, desc: 'Resume' },
    { label: 'skills', icon: <Cpu size={11} />, desc: 'Skills Matrix' },
    { label: 'projects', icon: <Folder size={11} />, desc: 'AI/ML Projects' },
    { label: 'posts', icon: <FileText size={11} />, desc: 'Articles' },
    { label: 'experience', icon: <Briefcase size={11} />, desc: 'Experience' },
    { label: 'whoami', icon: <User size={11} />, desc: 'Bio' },
    { label: 'mail', icon: <Mail size={11} />, desc: 'Send Message' },
    { label: 'neofetch', icon: <Terminal size={11} />, desc: 'SysInfo' },
    { label: 'help', icon: <HelpCircle size={11} />, desc: 'Help / Man' },
    { label: 'matrix', icon: <Sparkles size={11} />, desc: 'Screensaver' },
  ];

  return (
    <div
      className="py-1 px-2 border-t flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono select-none z-20 shrink-0"
      style={{
        borderColor: themeConfig.border,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
      }}
    >
      <span className="opacity-60 text-[10px] uppercase font-semibold shrink-0" style={{ color: themeConfig.brightText }}>
        Quick Shortcuts:
      </span>
      {quickActions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => onCommandClick(action.label)}
          className="flex items-center gap-1 px-2 py-0.5 border rounded-xs whitespace-nowrap cursor-pointer hover:bg-white/10 transition-all text-xs shrink-0"
          style={{
            borderColor: action.label === 'dino' ? themeConfig.accent : themeConfig.border,
            color: action.label === 'dino' ? themeConfig.brightText : themeConfig.text,
            backgroundColor: action.label === 'dino' ? `${themeConfig.accent}18` : undefined,
          }}
          title={`Execute: ${action.label} (${action.desc})`}
        >
          {action.icon}
          <span className={action.label === 'dino' ? 'font-bold tracking-wide' : ''}>{action.label}</span>
        </button>
      ))}
    </div>
  );
};
