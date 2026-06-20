import { Link } from '@rspress/core/theme-original';
import { useEffect, useRef, useState } from 'react';

const INSTALL_CMD =
  'cargo build -p phx && cargo run -p phx -- run examples/hello/src/main.phx';

export function InstallStrip() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      aria-labelledby="phx-install-heading"
      className={`phx-install${visible ? ' phx-install--visible' : ''}`}
      ref={ref}
    >
      <div className="phx-install__inner">
        <h2 className="phx-install__label" id="phx-install-heading">
          Get started
        </h2>
        <div className="phx-install__cmd-row">
          <code className="phx-install__cmd">{INSTALL_CMD}</code>
          <button
            aria-label="Copy install command to clipboard"
            className="phx-install__copy"
            onClick={() => void handleCopy()}
            type="button"
          >
            {copied ? 'copied' : 'copy'}
          </button>
          <span aria-live="polite" className="phx-sr-only">
            {copied ? 'Install command copied to clipboard' : ''}
          </span>
        </div>
        <Link className="phx-install__link" href="/guide/start/getting-started">
          Read the docs →
        </Link>
      </div>
    </section>
  );
}
