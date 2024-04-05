import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'

import { AntdStyles } from '@/app/styles/AntdStyles'
import { AntdTheme } from '@/app/styles/AntdTheme'
import { GlobalStyle } from '@/app/styles/GlobalStyle'
import { Theme } from '@/app/styles/Theme'

type ThemeProviderProps = {
  children: React.ReactNode
}

export const AppThemeProvider = ({ children }: ThemeProviderProps) => (
  <ThemeProvider theme={Theme}>
    <ConfigProvider theme={AntdTheme}>
      <GlobalStyle />
      <AntdStyles />
      {children}
    </ConfigProvider>
  </ThemeProvider>
)
