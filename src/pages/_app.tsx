import type { Session } from '@supabase/auth-helpers-nextjs';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import ThemeProvider from '@/features/theme/providers/ThemeProvider';

import '@/styles/globals.css';
import '@fontsource/quattrocento-sans/400.css';

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient as any}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionContextProvider>
  );
}
