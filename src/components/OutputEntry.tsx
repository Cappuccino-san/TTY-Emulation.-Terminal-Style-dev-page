import React from 'react';
import type { HistoryEntry, ThemeConfig } from '../types/terminal';
import { formatBytes } from '../commands/commandRegistry';
import { MarkdownViewer } from './MarkdownViewer';
import { ManPager } from './ManPager';
import { NeofetchView } from './NeofetchView';
import { MailComposer } from './MailComposer';
import { Folder, FileText, Binary, Search, Tag, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface OutputEntryProps {
  entry: HistoryEntry;
  themeConfig: ThemeConfig;
  onCommandClick: (cmd: string) => void;
  onCloseManPage?: () => void;
}

export const OutputEntry: React.FC<OutputEntryProps> = ({
  entry,
  themeConfig,
  onCommandClick,
  onCloseManPage,
}) => {
  const { command, path, type, content } = entry;

  return (
    <div className="space-y-1 font-mono text-xs md:text-sm">
      {/* Prompt Command Line Header (if this output was triggered by a command) */}
      {command !== undefined && (
        <div className="flex items-center gap-2 pt-2 select-none">
          <span className="font-bold" style={{ color: themeConfig.promptUser }}>
            visitor
          </span>
          <span style={{ color: themeConfig.dimText }}>@</span>
          <span className="font-bold" style={{ color: themeConfig.promptHost }}>
            devbox
          </span>
          <span style={{ color: themeConfig.dimText }}>:</span>
          <span className="font-semibold" style={{ color: themeConfig.promptPath }}>
            {path === '/' ? '~' : `~${path}`}
          </span>
          <span className="font-bold" style={{ color: themeConfig.promptSymbol }}>
            $
          </span>
          <span className="font-mono font-medium pl-1" style={{ color: themeConfig.brightText }}>
            {command}
          </span>
        </div>
      )}

      {/* Output Content Dispatcher */}
      <div className="pl-1">
        {/* 1. LS Table Output */}
        {type === 'table' && content?.items && (
          <div className="my-2 space-y-1 overflow-x-auto">
            {content.isLong ? (
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr
                    className="border-b select-none opacity-60"
                    style={{ borderColor: themeConfig.border, color: themeConfig.dimText }}
                  >
                    <th className="py-1 pr-3">PERMS</th>
                    <th className="py-1 pr-3">OWNER</th>
                    <th className="py-1 pr-3 text-right">SIZE</th>
                    <th className="py-1 pr-4">DATE</th>
                    <th className="py-1 pr-4">NAME</th>
                    <th className="py-1">SUMMARY / TAGS</th>
                  </tr>
                </thead>
                <tbody>
                  {content.items.map((item: any, idx: number) => {
                    const isDir = item.type === 'dir';
                    const isBinary = item.path?.startsWith('/bin');
                    const clickCmd = isDir ? `cd ${item.name}` : `cat ${item.path || item.name}`;

                    return (
                      <tr
                        key={idx}
                        className="hover:bg-white/5 transition-colors cursor-pointer group"
                        onClick={() => onCommandClick(clickCmd)}
                        title={`Click to run: ${clickCmd}`}
                      >
                        <td className="py-1 pr-3 opacity-60 font-mono text-xs">
                          {item.permissions || (isDir ? 'drwxr-xr-x' : '-rw-r--r--')}
                        </td>
                        <td className="py-1 pr-3 opacity-60 text-xs">
                          {item.owner || 'nick'}
                        </td>
                        <td className="py-1 pr-3 text-right opacity-80 text-xs">
                          {formatBytes(item.size || 4096)}
                        </td>
                        <td className="py-1 pr-4 opacity-60 text-xs">
                          {item.updatedAt || '2026-08-01'}
                        </td>
                        <td className="py-1 pr-4 font-bold flex items-center gap-1.5 whitespace-nowrap">
                          {isDir ? (
                            <Folder size={13} style={{ color: themeConfig.accent }} />
                          ) : isBinary ? (
                            <Binary size={13} style={{ color: themeConfig.accentAlt }} />
                          ) : (
                            <FileText size={13} style={{ color: themeConfig.brightText }} />
                          )}
                          <span
                            className="group-hover:underline"
                            style={{
                              color: isDir
                                ? themeConfig.brightText
                                : isBinary
                                ? themeConfig.accentAlt
                                : themeConfig.text,
                            }}
                          >
                            {item.name}
                            {isDir ? '/' : ''}
                          </span>
                        </td>
                        <td className="py-1 text-xs">
                          <span style={{ color: themeConfig.dimText }}>
                            {item.summary || item.title || ''}
                          </span>
                          {item.tags && (
                            <span className="ml-2 space-x-1">
                              {item.tags.map((t: string, ti: number) => (
                                <span
                                  key={ti}
                                  className="px-1 py-0.2 border text-[10px]"
                                  style={{ borderColor: themeConfig.border, color: themeConfig.accent }}
                                >
                                  #{t}
                                </span>
                              ))}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              /* Short Grid View */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 my-1">
                {content.items.map((item: any, idx: number) => {
                  const isDir = item.type === 'dir';
                  const clickCmd = isDir ? `cd ${item.name}` : `cat ${item.path || item.name}`;

                  return (
                    <button
                      key={idx}
                      onClick={() => onCommandClick(clickCmd)}
                      className="p-1.5 border rounded-xs flex items-center gap-2 text-left hover:bg-white/5 transition-all cursor-pointer group"
                      style={{ borderColor: themeConfig.border }}
                      title={`Click to run: ${clickCmd}`}
                    >
                      {isDir ? (
                        <Folder size={14} style={{ color: themeConfig.accent }} />
                      ) : (
                        <FileText size={14} style={{ color: themeConfig.brightText }} />
                      )}
                      <span
                        className="truncate font-semibold text-xs group-hover:underline"
                        style={{ color: isDir ? themeConfig.brightText : themeConfig.text }}
                      >
                        {item.name}
                        {isDir ? '/' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. Markdown Post Output */}
        {type === 'markdown' && content && (
          <MarkdownViewer
            title={content.title}
            filename={content.filename}
            date={content.date}
            readTime={content.readTime}
            tags={content.tags}
            content={content.content}
            path={content.path}
            themeConfig={themeConfig}
            onCommandClick={onCommandClick}
          />
        )}

        {/* 3. Man Page Pager Output */}
        {type === 'man' && content && (
          <ManPager
            page={content}
            themeConfig={themeConfig}
            onCommandClick={onCommandClick}
            onClose={onCloseManPage}
          />
        )}

        {/* 4. Neofetch Output */}
        {type === 'neofetch' && (
          <NeofetchView themeConfig={themeConfig} onCommandClick={onCommandClick} />
        )}

        {/* 5. Mail Composer Output */}
        {type === 'mail-composer' && (
          <MailComposer
            toAddress={content?.to}
            themeConfig={themeConfig}
            onCancel={() => onCommandClick('clear')}
            onDone={() => onCommandClick('clear')}
          />
        )}

        {/* 6. Grep & Tag Search Results */}
        {type === 'grep' && content && (
          <div className="my-2 space-y-2">
            <div className="flex items-center gap-2 text-xs pb-1 border-b" style={{ borderColor: themeConfig.border }}>
              <Search size={13} style={{ color: themeConfig.accent }} />
              <span className="font-bold" style={{ color: themeConfig.brightText }}>
                Matching results for pattern '{content.query}':
              </span>
              <span className="opacity-60 text-xs">({content.results.length} found)</span>
            </div>

            <div className="space-y-2">
              {content.results.map((res: any, rIdx: number) => (
                <div
                  key={rIdx}
                  onClick={() => onCommandClick(`cat ${res.path}`)}
                  className="p-2 border rounded-xs hover:bg-white/5 cursor-pointer transition-colors group"
                  style={{ borderColor: themeConfig.border, backgroundColor: 'rgba(0,0,0,0.2)' }}
                  title={`Click to read: cat ${res.path}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold group-hover:underline" style={{ color: themeConfig.brightText }}>
                      {res.type === 'post' ? '📄' : '⚙️'} {res.title}
                    </span>
                    <span className="text-[11px] opacity-60 font-mono" style={{ color: themeConfig.dimText }}>
                      {res.path}
                    </span>
                  </div>

                  {res.snippet && (
                    <div className="text-xs mt-1" style={{ color: themeConfig.text }}>
                      {res.snippet}
                    </div>
                  )}

                  {res.matchLine && (
                    <div
                      className="text-xs font-mono mt-1 px-2 py-0.5 border-l-2 bg-black/40 italic"
                      style={{ borderColor: themeConfig.accent, color: themeConfig.brightText }}
                    >
                      &gt; {res.matchLine}
                    </div>
                  )}

                  {res.tags && (
                    <div className="mt-1.5 flex gap-1 items-center text-[10px]">
                      <Tag size={10} style={{ color: themeConfig.dimText }} />
                      {res.tags.map((t: string, ti: number) => (
                        <span key={ti} className="px-1 border" style={{ borderColor: themeConfig.border, color: themeConfig.accent }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Tree Output */}
        {type === 'tree' && (
          <pre
            className="my-2 p-3 border rounded-xs font-mono text-xs overflow-x-auto leading-relaxed"
            style={{
              borderColor: themeConfig.border,
              color: themeConfig.brightText,
              backgroundColor: 'rgba(0,0,0,0.35)',
            }}
          >
            {content}
          </pre>
        )}

        {/* 8. Weather Widget */}
        {type === 'weather' && content && (
          <div
            className="my-2 p-3 border rounded-xs font-mono text-xs max-w-lg"
            style={{ borderColor: themeConfig.border, backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            <div className="font-bold pb-1 mb-2 border-b" style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}>
              WEATHER REPORT // {content.city.toUpperCase()}
            </div>
            <pre className="text-xs leading-tight mb-2" style={{ color: themeConfig.accent }}>
              {content.ascii}
            </pre>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span style={{ color: themeConfig.dimText }}>Temperature:</span> {content.temp}</div>
              <div><span style={{ color: themeConfig.dimText }}>Condition:</span> {content.condition}</div>
              <div><span style={{ color: themeConfig.dimText }}>Humidity:</span> {content.humidity}</div>
              <div><span style={{ color: themeConfig.dimText }}>Wind:</span> {content.wind}</div>
            </div>
          </div>
        )}

        {/* 9. Errors */}
        {type === 'error' && (
          <div className="my-1.5 flex items-start gap-2 text-xs md:text-sm text-red-400 font-mono whitespace-pre-wrap">
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <span>{content}</span>
          </div>
        )}

        {/* 10. Success */}
        {type === 'success' && (
          <div className="my-1.5 flex items-start gap-2 text-xs md:text-sm font-mono whitespace-pre-wrap" style={{ color: themeConfig.brightText }}>
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: themeConfig.accent }} />
            <span>{content}</span>
          </div>
        )}

        {/* 11. Plain Text / System Output */}
        {(type === 'text' || type === 'system') && content && (
          <div
            className={`my-1 font-mono text-xs md:text-sm whitespace-pre-wrap leading-relaxed ${
              typeof content === 'string' && (content.includes('██') || content.includes('╭─') || content.includes('┌─'))
                ? 'banner-bloom font-bold'
                : ''
            }`}
            style={{
              color:
                typeof content === 'string' && (content.includes('██') || content.includes('╭─'))
                  ? themeConfig.brightText
                  : themeConfig.text,
            }}
          >
            {content}
          </div>
        )}
      </div>
    </div>
  );
};
