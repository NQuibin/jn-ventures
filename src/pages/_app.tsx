import type { AppProps } from 'next/app';
import ThemeProvider from '@/features/theme/providers/ThemeProvider';

import '@/styles/globals.css';
import '@fontsource/padauk/400.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
