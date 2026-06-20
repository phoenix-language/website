import {
  Layout as RspressLayout,
  type LayoutProps,
} from '@rspress/core/theme-original';
import { SkipLink } from './components/SkipLink';

export function Layout({ top, ...props }: LayoutProps) {
  return (
    <RspressLayout
      top={
        <>
          <SkipLink />
          {top}
        </>
      }
      {...props}
    />
  );
}
