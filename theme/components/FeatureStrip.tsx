import { Link } from '@rspress/core/theme-original';
import { useEffect, useRef, useState } from 'react';

export type Feature = {
  title: string;
  details: string;
  link?: string;
};

type FeatureStripProps = {
  features: Feature[];
};

function FeatureRow({
  feature,
  index,
  visible,
}: {
  feature: Feature;
  index: number;
  visible: boolean;
}) {
  const num = String(index + 1).padStart(2, '0');
  const isExternal = feature.link?.startsWith('http');

  const content = (
    <>
      <span className="phx-feature__index">{num}</span>
      <div className="phx-feature__body">
        <h3 className="phx-feature__title">{feature.title}</h3>
        <p className="phx-feature__details">{feature.details}</p>
      </div>
    </>
  );

  const className = `phx-feature${visible ? ' phx-feature--visible' : ''}`;

  if (!feature.link) {
    return <div className={className}>{content}</div>;
  }

  if (isExternal) {
    return (
      <a
        className={className}
        href={feature.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={feature.link}>
      {content}
    </Link>
  );
}

export function FeatureStrip({ features }: FeatureStripProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="phx-features-heading"
      className="phx-features"
      ref={ref}
    >
      <h2 className="phx-sr-only" id="phx-features-heading">
        Features
      </h2>
      <div className="phx-features__inner">
        {features.map((feature, index) => (
          <FeatureRow
            feature={feature}
            index={index}
            key={feature.title}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}
