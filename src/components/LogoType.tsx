import Image from 'next/image'
import Box from '@mui/material/Box'
import logoImage from '../../public/images/logo-main.png'
import Typography from '@mui/material/Typography'

const LogoType = ({
	component = 'header',
	direction = 'horizontal'
}: {
	component?: 'footer' | 'header'
	direction?: 'horizontal' | 'vertical'
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1
			}}
		>
			<Image
				src={logoImage}
				alt="Picture of the author"
				width={164}
				height={33}
				style={{
					filter: component === 'header' ? undefined : 'grayscale(100%)',
					opacity: component === 'header' ? 1 : 0.5
				}}
			/>
		</Box>
	)
}

export default LogoType
