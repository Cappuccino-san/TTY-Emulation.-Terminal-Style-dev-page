import React from 'react';
import type { ThemeConfig } from '../types/terminal';
import { Sparkles, Terminal, FileText, Folder, User, Mail, HelpCircle } from 'lucide-react';

interface QuickToolbarProps {
  themeConfig: ThemeConfig;
  onCommandClick: (cmd: string) => void;
}

export const QuickToolbar: React.FC<QuickToolbarProps> = ({
  themeConfig,
  onCommandClick,
}) => {
  const quickActions = [
    { label: 'ls -l posts', icon: <FileText size={11} />, desc: 'Articles' },
    { label: 'ls -l projects', icon: <Folder size={11} />, desc: 'Projects' },
    { label: 'whoami', icon: <User size={11} />, desc: 'Bio' },
    { label: 'mail', icon: <Mail size={11} />, desc: 'Contact' },
    { label: 'help', icon: <HelpCircle size={11} />, desc: 'Man Page' },
    { label: 'neofetch', icon: <Terminal size={11} />, desc: 'SysInfo' },
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
      <span className="opacity-50 text-[10px] uppercase font-semibold shrink-0" style={{ color: themeConfig.dimText }}>
        Quick:
      </span>
      {quickActions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => onCommandClick(action.label)}
          className="flex items-center gap-1 px-2 py-0.5 border rounded-xs whitespace-nowrap cursor-pointer hover:bg-white/5 transition-all text-xs shrink-0"
          style={{
            borderColor: themeConfig.border,
            color: themeConfig.text,
          }}
          title={`Execute: ${action.label}`}
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};
