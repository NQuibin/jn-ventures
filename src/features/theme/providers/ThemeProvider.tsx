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
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
});
export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
