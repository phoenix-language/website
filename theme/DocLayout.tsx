import {
  DocLayout as RspressDocLayout,
  type DocLayoutProps,
} from '@rspress/core/theme-original';

export function DocLayout({ beforeDocContent, ...props }: DocLayoutProps) {
  return (
    <RspressDocLayout
      beforeDocContent={
        <>
          <div className="phx-skip-target" id="main-content" tabIndex={-1} />
          {beforeDocContent}
        </>
      }
      {...props}
    />
  );
}
