import { Fragment } from 'react';
import { useFrontmatter } from '@rspress/core/runtime';
import { HomeBackground, Link } from '@rspress/core/theme-original';
import { FeatureStrip, type Feature } from './components/FeatureStrip';
import { InstallStrip } from './components/InstallStrip';
import { TypingCode } from './components/TypingCode';

type HeroAction = {
  theme: 'brand' | 'alt';
  text: string;
  link: string;
};

type Hero = {
  name?: string;
  text?: string;
  tagline?: string;
  actions?: HeroAction[];
};

function HomeLayoutMarkdown() {
  const { frontmatter } = useFrontmatter();
  const hero = frontmatter?.hero as Hero | undefined;
  const features = (frontmatter?.features as Feature[] | undefined) ?? [];
  const lines: string[] = [];

  if (hero?.name) {
    lines.push(`# ${hero.name}`, '');
  }
  if (hero?.text) {
    lines.push(hero.text, '');
  }
  if (hero?.tagline) {
    lines.push(`> ${hero.tagline}`, '');
  }
  if (hero?.actions?.length) {
    lines.push(
      hero.actions.map((action) => `[${action.text}](${action.link})`).join(' | '),
      '',
    );
  }
  if (features.length > 0) {
    lines.push('## Features', '');
    for (const feature of features) {
      const title = feature.link
        ? `[**${feature.title}**](${feature.link})`
        : `**${feature.title}**`;
      lines.push(`- ${title}: ${feature.details}`);
    }
    lines.push('');
  }

  return <Fragment>{lines.join('\n')}</Fragment>;
}

function HeroActionButton({ action }: { action: HeroAction }) {
  const isExternal = action.link.startsWith('http');
  const className =
    action.theme === 'brand' ? 'phx-hero__btn phx-hero__btn--brand' : 'phx-hero__btn phx-hero__btn--ghost';

  if (isExternal) {
    return (
      <a className={className} href={action.link} rel="noopener noreferrer" target="_blank">
        {action.text}
      </a>
    );
  }

  return (
    <Link className={className} href={action.link}>
      {action.text}
    </Link>
  );
}

export default function HomeLayout() {
  if (import.meta.env.SSG_MD) {
    return <HomeLayoutMarkdown />;
  }

  const { frontmatter } = useFrontmatter();
  const hero = (frontmatter?.hero as Hero | undefined) ?? {};
  const features = (frontmatter?.features as Feature[] | undefined) ?? [];

  return (
    <Fragment>
      <HomeBackground />
      <main className="phx-home" id="main-content" tabIndex={-1}>
        <div className="phx-home__mesh" aria-hidden="true" />
        <div className="phx-home__noise" aria-hidden="true" />

        <section aria-labelledby="phx-hero-heading" className="phx-hero">
          <div className="phx-hero__inner">
            <div className="phx-hero__code-col">
              <TypingCode />
            </div>
            <div className="phx-hero__text-col">
              <div className="phx-hero__title-row">
                <h1 className="phx-hero__wordmark" id="phx-hero-heading">
                  {hero.name ?? 'Phoenix'}
                </h1>
                <img
                  alt="Phoenix logo"
                  className="phx-hero__logo"
                  height={48}
                  src="/phoenix-logo.png"
                  width={48}
                />
              </div>
              {hero.text && <p className="phx-hero__headline">{hero.text}</p>}
              {hero.tagline && <p className="phx-hero__tagline">{hero.tagline}</p>}
              {hero.actions && hero.actions.length > 0 && (
                <div className="phx-hero__actions">
                  {hero.actions.map((action) => (
                    <HeroActionButton action={action} key={action.text} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <FeatureStrip features={features} />
        <InstallStrip />

        <footer className="phx-footer">
          <p className="phx-footer__tag">Phoenix · experimental alpha</p>
          <nav aria-label="Footer" className="phx-footer__links">
            <Link href="/guide/start/introduction">Docs</Link>
            <a href="https://github.com/phoenix-language/phoenix" rel="noopener noreferrer" target="_blank">
              GitHub
            </a>
            <a href="https://discord.com/invite/U4FmBUHzEP" rel="noopener noreferrer" target="_blank">
              Discord
            </a>
          </nav>
        </footer>
      </main>
    </Fragment>
  );
}
