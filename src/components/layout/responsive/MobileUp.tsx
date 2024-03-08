import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
	children?: React.ReactNode
}

const MobileUp = ({children}: Props) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'))

	return matches ? <>{children}</> : null
}

export default MobileUp
