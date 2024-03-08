import {useContext} from 'react'
import {ColorModeContext} from '../providers/ColorModeProvider'

const useColorMode = () => {
	const mode = useContext(ColorModeContext)
	return mode
}

export default useColorMode
