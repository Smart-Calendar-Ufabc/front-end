import Image from 'next/image'
import Box from '@mui/material/Box'
import logoType from '../../public/images/logo-main.png'
import logoIcon from '../../public/images/logo-icon.png'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

const LogoType = ({
  component = 'header',
}: {
  component?: 'footer' | 'header'
}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down(350))

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {matches ? (
        <Image
          src={logoIcon}
          alt="Picture of the author"
          width={35}
          height={33}
          style={{
            filter: component === 'header' ? undefined : 'grayscale(100%)',
            opacity: component === 'header' ? 1 : 0.5,
          }}
        />
      ) : (
        <Image
          src={logoType}
          alt="Picture of the author"
          width={164}
          height={33}
          style={{
            filter: component === 'header' ? undefined : 'grayscale(100%)',
            opacity: component === 'header' ? 1 : 0.5,
          }}
        />
      )}
    </Box>
  )
}

export default LogoType
