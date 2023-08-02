'use client'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { theme } from '@/theme'
 import { CssBaseline, ThemeProvider } from '@mui/material'

 
export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ThemeProvider theme={theme} >
          <CssBaseline />
          {children}
    </ThemeProvider>
  )
}