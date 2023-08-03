'use client'
import { theme } from '@/app/theme'
 import { CssBaseline, ThemeProvider } from '@mui/material'

 
export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
    </ThemeProvider>
  )
}