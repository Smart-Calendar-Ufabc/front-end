import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
	children?: React.ReactNode
}

const TabletDown = ({children}: Props) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down(900))

	return matches ? <>{children}</> : null
}

export default TabletDown
