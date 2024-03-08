import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
	children?: React.ReactNode
}

const TabletUp = ({children}: Props) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up(900))

	return matches ? <>{children}</> : null
}

export default TabletUp
