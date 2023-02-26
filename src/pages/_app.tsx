import type { AppProps } from 'next/app';
import theme from '../features/common/theme';

import { ChakraProvider } from '@chakra-ui/react';

import '@/styles/globals.css';
import '@fontsource/ntr/400.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
