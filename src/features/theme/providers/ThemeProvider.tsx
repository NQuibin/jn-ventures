import type { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = extendTheme({
  fonts: {
    heading: `'Padauk', sans-serif`,
    body: `'Padauk', sans-serif`,
  },
});
export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
