import React, { useState } from 'react';
import type { ManPage } from '../commands/manPages';
import type { ThemeConfig } from '../types/terminal';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';

interface ManPagerProps {
  page: ManPage;
  themeConfig: ThemeConfig;
  onCommandClick?: (cmd: string) => void;
  onClose?: () => void;
}

export const ManPager: React.FC<ManPagerProps> = ({
  page,
  themeConfig,
  onCommandClick,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sec: string) => {
    setCollapsedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const headerTitle = `${page.command}(${page.section})`;

  return (
    <div
      className="my-3 font-mono border rounded-sm overflow-hidden text-xs md:text-sm animate-in fade-in duration-300 shadow-xl"
      style={{
        borderColor: themeConfig.border,
        backgroundColor: 'rgba(5, 10, 7, 0.92)',
      }}
    >
      {/* Man Page Vintage Top Header */}
      <div
        className="px-3 py-1.5 flex items-center justify-between border-b select-none font-bold text-xs"
        style={{
          borderColor: themeConfig.border,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          color: themeConfig.brightText,
        }}
      >
        <span>{headerTitle}</span>
        <span className="hidden sm:inline opacity-70">General Commands Manual</span>
        <div className="flex items-center gap-3">
          <span>{headerTitle}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="p-0.5 hover:bg-white/10 rounded-xs cursor-pointer opacity-70 hover:opacity-100"
              title="Close manual (q)"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Optional In-Pager Quick Filter */}
      <div
        className="px-3 py-1 border-b flex items-center gap-2 text-xs"
        style={{ borderColor: themeConfig.border, backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <Search size={12} style={{ color: themeConfig.dimText }} />
        <input
          type="text"
          placeholder="Filter commands or options (e.g. ls, cat, audio)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-xs font-mono"
          style={{ color: themeConfig.brightText }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs opacity-60 hover:opacity-100"
            style={{ color: themeConfig.dimText }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Man Page Body */}
      <div className="p-4 space-y-4 max-h-[550px] overflow-y-auto leading-relaxed">
        {/* NAME */}
        <section>
          <div
            className="font-bold tracking-wider mb-1 cursor-pointer flex items-center justify-between"
            style={{ color: themeConfig.brightText }}
            onClick={() => toggleSection('name')}
          >
            <span>NAME</span>
            {collapsedSections['name'] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </div>
          {!collapsedSections['name'] && (
            <div className="pl-4" style={{ color: themeConfig.text }}>
              <span className="font-semibold" style={{ color: themeConfig.accent }}>
                {page.command}
              </span>{' '}
              — {page.synopsis}
            </div>
          )}
        </section>

        {/* SYNOPSIS */}
        <section>
          <div
            className="font-bold tracking-wider mb-1 cursor-pointer flex items-center justify-between"
            style={{ color: themeConfig.brightText }}
            onClick={() => toggleSection('synopsis')}
          >
            <span>SYNOPSIS</span>
            {collapsedSections['synopsis'] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </div>
          {!collapsedSections['synopsis'] && (
            <div
              className="pl-4 font-mono font-semibold py-1 px-2 border-l-2 bg-black/30 text-xs"
              style={{ borderColor: themeConfig.accent, color: themeConfig.brightText }}
            >
              {page.synopsis}
            </div>
          )}
        </section>

        {/* DESCRIPTION */}
        <section>
          <div
            className="font-bold tracking-wider mb-1 cursor-pointer flex items-center justify-between"
            style={{ color: themeConfig.brightText }}
            onClick={() => toggleSection('description')}
          >
            <span>DESCRIPTION</span>
            {collapsedSections['description'] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </div>
          {!collapsedSections['description'] && (
            <div className="pl-4 whitespace-pre-line" style={{ color: themeConfig.text }}>
              {page.description}
            </div>
          )}
        </section>

        {/* COMMANDS LIST */}
        {page.commandsList && (
          <section>
            <div
              className="font-bold tracking-wider mb-1 cursor-pointer flex items-center justify-between"
              style={{ color: themeConfig.brightText }}
              onClick={() => toggleSection('commands')}
            >
              <span>AVAILABLE COMMANDS</span>
              {collapsedSections['commands'] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
            {!collapsedSections['commands'] && (
              <div className="pl-4 space-y-2.5">
                {page.commandsList
                  .filter(
                    (c) =>
                      !searchQuery ||
                      c.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.desc.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 border rounded-xs transition-colors group"
                      style={{
                        borderColor: themeConfig.border,
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => onCommandClick?.(item.example || item.cmd.split(' ')[0])}
                          className="font-bold text-left cursor-pointer hover:underline"
                          style={{ color: themeConfig.brightText }}
                          title={`Click to execute: ${item.example || item.cmd}`}
                        >
                          $ {item.cmd}
                        </button>
                        {item.example && (
                          <button
                            onClick={() => onCommandClick?.(item.example!)}
                            className="text-xs px-1.5 py-0.5 border opacity-75 group-hover:opacity-100 hover:bg-white/5 cursor-pointer transition-all"
                            style={{ borderColor: themeConfig.border, color: themeConfig.accent }}
                          >
                            Run: {item.example}
                          </button>
                        )}
                      </div>
                      <div className="text-xs mt-1" style={{ color: themeConfig.text }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        )}

        {/* OPTIONS */}
        {page.options && page.options.length > 0 && (
          <section>
            <div
              className="font-bold tracking-wider mb-1 cursor-pointer flex items-center justify-between"
              style={{ color: themeConfig.brightText }}
              onClick={() => toggleSection('options')}
            >
              <span>OPTIONS</span>
              {collapsedSections['options'] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
            {!collapsedSections['options'] && (
              <div className="pl-4 space-y-1.5">
                {page.options.map((opt, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <span className="font-bold w-14" style={{ color: themeConfig.brightText }}>
                      {opt.flag}
                    </span>
                    <span className="flex-1" style={{ color: themeConfig.text }}>
                      {opt.desc}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* KEYBINDINGS */}
        {page.keybindings && (
          <section>
            <div
              className="font-bold tracking-wider mb-1 cursor-pointer flex items-center justify-between"
              style={{ color: themeConfig.brightText }}
              onClick={() => toggleSection('keybindings')}
            >
              <span>KEYBOARD SHORTCUTS</span>
              {collapsedSections['keybindings'] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
            {!collapsedSections['keybindings'] && (
              <div className="pl-4 space-y-1.5">
                {page.keybindings.map((kb, idx) => (
                  <div key={idx} className="flex gap-3 items-center text-xs">
                    <kbd
                      className="px-1.5 py-0.5 border font-semibold min-w-[70px] text-center"
                      style={{
                        borderColor: themeConfig.border,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: themeConfig.brightText,
                      }}
                    >
                      {kb.key}
                    </kbd>
                    <span className="flex-1" style={{ color: themeConfig.text }}>
                      {kb.action}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* SEE ALSO */}
        {page.seeAlso && (
          <section className="pt-2 border-t border-dashed" style={{ borderColor: themeConfig.border }}>
            <span className="font-bold tracking-wider mr-3" style={{ color: themeConfig.brightText }}>
              SEE ALSO:
            </span>
            <span className="space-x-2 text-xs">
              {page.seeAlso.map((sa, idx) => (
                <button
                  key={idx}
                  onClick={() => onCommandClick?.(`man ${sa.replace(/\(\d\)/, '')}`)}
                  className="underline cursor-pointer hover:opacity-100"
                  style={{ color: themeConfig.accent }}
                >
                  {sa}
                </button>
              ))}
            </span>
          </section>
        )}
      </div>

      {/* Vintage Less/Man Pager Bottom Bar */}
      <div
        className="px-3 py-1 flex items-center justify-between border-t text-xs select-none"
        style={{
          borderColor: themeConfig.border,
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          color: themeConfig.dimText,
        }}
      >
        <span className="font-bold" style={{ color: themeConfig.brightText }}>
          Manual page {page.command}({page.section}) line 1/1 (END)
        </span>
        <span className="opacity-70 text-xs">Press 'q' or Esc to exit pager</span>
      </div>
    </div>
  );
};
