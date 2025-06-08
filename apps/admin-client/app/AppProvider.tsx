'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme()

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  )
}
