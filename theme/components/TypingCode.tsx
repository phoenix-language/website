import { useEffect, useMemo, useState } from 'react';

type Token = { text: string; className: string };

type CodeLine = {
  lineNum: number;
  tokens: Token[];
};

const CODE_LINES: CodeLine[] = [
  {
    lineNum: 1,
    tokens: [
      { text: 'add', className: 'phx-code__id' },
      { text: ' :: (a: ', className: 'phx-code__punct' },
      { text: 's32', className: 'phx-code__type' },
      { text: ', b: ', className: 'phx-code__punct' },
      { text: 's32', className: 'phx-code__type' },
      { text: ') => ', className: 'phx-code__punct' },
      { text: 's32', className: 'phx-code__type' },
      { text: ' { a + b };', className: 'phx-code__punct' },
    ],
  },
  { lineNum: 2, tokens: [] },
  {
    lineNum: 3,
    tokens: [
      { text: 'main', className: 'phx-code__id' },
      { text: ' :: () => {', className: 'phx-code__punct' },
    ],
  },
  {
    lineNum: 4,
    tokens: [
      { text: '    ', className: 'phx-code__punct' },
      { text: 'const', className: 'phx-code__kw' },
      { text: ' sum: ', className: 'phx-code__punct' },
      { text: 's32', className: 'phx-code__type' },
      { text: ' = add(10, 2);', className: 'phx-code__punct' },
    ],
  },
  {
    lineNum: 5,
    tokens: [
      { text: '    ', className: 'phx-code__punct' },
      { text: 'const', className: 'phx-code__kw' },
      { text: ' _ = sum;', className: 'phx-code__punct' },
    ],
  },
  {
    lineNum: 6,
    tokens: [{ text: '};', className: 'phx-code__punct' }],
  },
];

type CharToken = { char: string; className: string; lineIndex: number };

function flattenCode(lines: CodeLine[]): CharToken[] {
  const chars: CharToken[] = [];
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    if (line.tokens.length === 0) {
      chars.push({ char: '\n', className: 'phx-code__punct', lineIndex });
      continue;
    }
    for (const token of line.tokens) {
      for (const char of token.text) {
        chars.push({ char, className: token.className, lineIndex });
      }
    }
    if (lineIndex < lines.length - 1) {
      chars.push({ char: '\n', className: 'phx-code__punct', lineIndex });
    }
  }
  return chars;
}

function renderVisibleChars(chars: CharToken[], visibleCount: number) {
  const lines: { lineNum: number; spans: { className: string; text: string }[] }[] =
    [];

  let currentLine = -1;
  let currentSpan: { className: string; text: string } | null = null;

  for (let i = 0; i < visibleCount && i < chars.length; i += 1) {
    const { char, className, lineIndex } = chars[i];
    if (char === '\n') {
      currentSpan = null;
      continue;
    }
    if (lineIndex !== currentLine) {
      currentLine = lineIndex;
      currentSpan = null;
      if (!lines[lineIndex]) {
        lines[lineIndex] = {
          lineNum: CODE_LINES[lineIndex].lineNum,
          spans: [],
        };
      }
    }
    if (!lines[lineIndex]) {
      lines[lineIndex] = { lineNum: CODE_LINES[lineIndex].lineNum, spans: [] };
    }
    if (currentSpan && currentSpan.className === className) {
      currentSpan.text += char;
    } else {
      currentSpan = { className, text: char };
      lines[lineIndex].spans.push(currentSpan);
    }
  }

  return CODE_LINES.map((line, index) => {
    const rendered = lines[index];
    if (!rendered || rendered.spans.length === 0) {
      return (
        <div className="phx-code__line" key={line.lineNum}>
          <span className="phx-code__gutter">{line.lineNum}</span>
          <span className="phx-code__content">&nbsp;</span>
        </div>
      );
    }
    return (
      <div className="phx-code__line" key={line.lineNum}>
        <span className="phx-code__gutter">{line.lineNum}</span>
        <span className="phx-code__content">
          {rendered.spans.map((span, spanIndex) => (
            <span className={span.className} key={spanIndex}>
              {span.text}
            </span>
          ))}
        </span>
      </div>
    );
  });
}

const STATIC_CODE = `add :: (a: s32, b: s32) => s32 { a + b };

main :: () => {
    const sum: s32 = add(10, 2);
    const _ = sum;
};`;

const TYPING_INTERVAL_MS = 45;

export function TypingCode() {
  const chars = useMemo(() => flattenCode(CODE_LINES), []);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      setVisibleCount(chars.length);
      setShowStatus(true);
      setDone(true);
      return;
    }

    if (visibleCount >= chars.length) {
      setDone(true);
      const timer = window.setTimeout(() => setShowStatus(true), 200);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, TYPING_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [chars.length, visibleCount]);

  return (
    <figure className="phx-code">
      <pre aria-hidden="true" className="phx-code__pre">
        <code>{renderVisibleChars(chars, visibleCount)}</code>
        {!done && (
          <span aria-hidden="true" className="phx-code__cursor">
            |
          </span>
        )}
        {done && (
          <span aria-hidden="true" className="phx-code__cursor phx-code__cursor--hold">
            |
          </span>
        )}
      </pre>
      <pre className="phx-sr-only">
        <code>{STATIC_CODE}</code>
      </pre>
      <figcaption className="phx-sr-only">
        Example Phoenix source code demonstrating a typed add function and main
        entry point, followed by a successful phx check result.
      </figcaption>
      <div
        aria-hidden={!showStatus}
        className={`phx-code__status${showStatus ? ' phx-code__status--visible' : ''}`}
      >
        <span className="phx-code__status-cmd">phx check main.phx</span>
        <span className="phx-code__status-arrow"> → </span>
        <span className="phx-code__status-ok">ok</span>
        <span className="phx-code__status-detail"> (0 errors)</span>
      </div>
      <p className="phx-sr-only">Example check result: phx check main.phx — ok (0 errors)</p>
    </figure>
  );
}
