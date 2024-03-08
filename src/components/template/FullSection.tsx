import {Theme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import {SystemStyleObject} from '@mui/system/styleFunctionSx'
import Container from '@mui/material/Container'

const FullSection = ({
	children,
	sx
}: {
	children: React.ReactNode
	sx?: SystemStyleObject<Theme>
}) => {
	return (
		<Box
			component="section"
			sx={theme => ({
				minHeight: 'calc(100vh - 80px)',
				width: '100vw',
				p: 0,
				m: 0,
				...sx,
				[theme.breakpoints.down('md')]: {
					minHeight: 'auto'
				}
			})}
		>
			<Container
				sx={{
					py: 7.5,
					px: 3,
					height: '100%'
				}}
			>
				{children}
			</Container>
		</Box>
	)
}

export default FullSection
