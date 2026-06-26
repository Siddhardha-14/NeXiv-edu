import React from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// Markdown Renderer — converts lesson markdown content to React elements
// Supports: ### H3, #### H4, ```code blocks```, **bold**, `inline code`,
//           - bullet lists, and paragraphs
// ═══════════════════════════════════════════════════════════════════════════

function applyInlineMarkdown(str) {
  return str
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-[var(--bg-inset)] text-emerald-400 dark:text-emerald-300 px-1.5 py-0.5 rounded text-[0.8em] font-mono">$1</code>');
}

export function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3);
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={`code-${i}`}
          className="bg-[var(--bg-root)] border border-[var(--border-default)] rounded-xl p-4 overflow-x-auto my-3"
        >
          {lang && (
            <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
              {lang}
            </span>
          )}
          <code className="text-emerald-400 text-[0.8rem] font-mono leading-relaxed">
            {codeLines.join('\n')}
          </code>
        </pre>
      );
      i++;
      continue;
    }

    // H3 ###
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-[var(--text-primary)] font-bold text-lg tracking-tight mt-6 mb-2 pb-2 border-b border-[var(--border-subtle)]"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // H4 ####
    if (line.startsWith('#### ')) {
      elements.push(
        <h4
          key={`h4-${i}`}
          className="text-[var(--accent)] font-semibold text-sm mt-4 mb-1.5"
        >
          {line.slice(5)}
        </h4>
      );
      i++;
      continue;
    }

    // Bullet list item
    if (line.match(/^[-*] /)) {
      const content = applyInlineMarkdown(line.slice(2));
      elements.push(
        <li
          key={`li-${i}`}
          className="flex items-start gap-2.5 text-[var(--text-secondary)] text-sm leading-relaxed"
        >
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </li>
      );
      i++;
      continue;
    }

    // Empty line → spacer
    if (line.trim() === '') {
      elements.push(<div key={`sp-${i}`} className="h-2" />);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="text-[var(--text-secondary)] text-sm leading-[1.75]"
        dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(line) }}
      />
    );
    i++;
  }

  // Wrap consecutive <li> in <ul>
  const wrapped = [];
  let liBuffer = [];

  elements.forEach((el, idx) => {
    if (el.type === 'li') {
      liBuffer.push(el);
    } else {
      if (liBuffer.length) {
        wrapped.push(
          <ul key={`ul-${idx}`} className="list-none p-0 my-3 flex flex-col gap-2">
            {liBuffer}
          </ul>
        );
        liBuffer = [];
      }
      wrapped.push(el);
    }
  });

  if (liBuffer.length) {
    wrapped.push(
      <ul key="ul-end" className="list-none p-0 my-3 flex flex-col gap-2">
        {liBuffer}
      </ul>
    );
  }

  return wrapped;
}
