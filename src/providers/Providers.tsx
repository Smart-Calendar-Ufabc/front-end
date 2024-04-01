import ColorModeProvider from './ColorModeProvider'
import ThemeProvider from './ThemeProvider'

const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ColorModeProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ColorModeProvider>
  )
}

export default Providers
