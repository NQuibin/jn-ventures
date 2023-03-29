import type { ThemeConfig } from 'antd/es/config-provider';
import type { ReactNode } from 'react';

import { ConfigProvider } from 'antd';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme: ThemeConfig = {
    token: {
      fontFamily: "'Mukta', sans-serif",
      fontSize: 16
    },
  };

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
