import Image from 'next/image'
import Box from '@mui/material/Box'
import logoImage from '../../public/images/logo-main.png'

const LogoType = ({
  component = 'header',
}: {
  component?: 'footer' | 'header'
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Image
        src={logoImage}
        alt="Picture of the author"
        width={164}
        height={33}
        style={{
          filter: component === 'header' ? undefined : 'grayscale(100%)',
          opacity: component === 'header' ? 1 : 0.5,
        }}
      />
    </Box>
  )
}

export default LogoType
