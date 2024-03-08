import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
	children?: React.ReactNode
}

const Mobile = ({children}: Props) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('sm'))

	return matches ? <>{children}</> : null
}

export default Mobile
