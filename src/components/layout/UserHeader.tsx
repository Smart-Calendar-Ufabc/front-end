import AppBar from "@mui/material/AppBar"
import LogoType from "../LogoType"
import ProfileMenu from "../ProfileMenu"

export const headerHeight = '78px'

export default function Header() {
	return (
		<AppBar
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				height: headerHeight,
				px: 3,
				py: 2
			}}
		>
			<LogoType />
			<ProfileMenu />
		</AppBar>
	)
}