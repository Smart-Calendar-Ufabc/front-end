'use client'

import { useState, createContext, useEffect } from 'react'

export const ColorModeContext = createContext<string>('light')

const ColorModeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setMode('dark')
      }
      window
        .matchMedia('(prefers-color-scheme: light)')
        .addEventListener('change', (event) =>
          setMode(event.matches ? 'light' : 'dark'),
        )
      return () => {
        window
          .matchMedia('(prefers-color-scheme: light)')
          .removeEventListener('change', () => {})
      }
    }
  }, [])

  return (
    <ColorModeContext.Provider value={mode}>
      {children}
    </ColorModeContext.Provider>
  )
}

export default ColorModeProvider
