import {createTheme, responsiveFontSizes} from '@mui/material/styles'

// Theme light typography and palette
let theme = createTheme({
	breakpoints: {
		values: {
			xs: 400,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1920
		}
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'system-ui',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		h1: {
			fontSize: '3rem',
			fontWeight: 500
		},
		h2: {
			fontSize: '2.5rem',
			fontWeight: 500
		},
		h3: {
			fontSize: '2rem',
			fontWeight: 500
		},
		h4: {
			fontSize: '1.75rem',
			fontWeight: 500
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: 500
		},
		h6: {
			fontSize: '1.25rem',
			fontWeight: 500
		},
		body2: {
			fontSize: '1.125rem',
			fontWeight: 400
		}
	},
	palette: {
		mode: 'light',
		primary: {
			main: '#8257E5',
			light: '#996DFF',
			dark: '#8257E5',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#996DFF20',
			light: '#7F4C3B',
			dark: '#4E3121',
			contrastText: '#ffffff'
		},
		common: {
			black: '#000',
			white: '#FFF'
		},
		grey: {
			'50': '#fafafa',
			'100': '#f5f5f5',
			'200': '#eeeeee',
			'300': '#e0e0e0',
			'400': '#bdbdbd',
			'500': '#9e9e9e',
			'600': '#757575',
			'700': '#616161',
			'800': '#424242',
			'900': '#212121'
		}
	}
})

// Theme light components
theme = createTheme(theme, {
	components: {
		MuiAccordion: {
			styleOverrides: {
				root: {
					'&.Mui-expanded': {
						margin: '0'
					}
				}
			}
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					paddingTop: 0
				}
			}
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					padding: '0 8px'
				},
				content: {
					margin: '12px 0',
					'&.Mui-expanded': {
						margin: '12px 0'
					}
				}
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#fffffffc',
					boxShadow: 'none',
					borderBottomColor: theme.palette.grey[200],
					borderBottomStyle: 'solid',
					borderBottomWidth: 1,
					zIndex: theme.zIndex.drawer + 1
				}
			}
		},
		MuiBreadcrumbs: {
			styleOverrides: {
				root: {
					fontSize: '0.9rem',
					padding: '20px 0',
					color: theme.palette.grey[600],
					'& a': {
						color: theme.palette.grey[500]
					},
					'& a:hover': {
						color: theme.palette.grey[900]
					}
				}
			}
		},
		MuiDrawer: {
			styleOverrides: {
				root: {
					zIndex: theme.zIndex.drawer + 2
				}
			}
		},
		MuiButton: {
			defaultProps: {
				disableRipple: true
			},
			styleOverrides: {
				root: {
					borderRadius: 0,
					boxShadow: 'none'
				}
			},
			variants: [
				{
					props: {variant: 'contained'},
					style: {
						color: theme.palette.grey[900],
						'&:hover': {
							backgroundColor: theme.palette.primary.dark,
							boxShadow: 'none'
						}
					}
				},
				{
					props: {variant: 'outlined'},
					style: {
						borderColor: theme.palette.grey[300],
						color: theme.palette.grey[800],
						'&:hover': {
							color: theme.palette.grey[900]
						}
					}
				},
				{
					props: {variant: 'text'},
					style: {
						'&:hover': {
							backgroundColor: 'transparent',
							color: theme.palette.primary.light
						}
					}
				}
			]
		},
		MuiIconButton: {
			defaultProps: {
				disableRipple: true
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: theme.palette.primary.dark,
					textDecoration: 'none'
				}
			}
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: theme.palette.primary.light
					}
				}
			}
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					fontSize: '0.8rem'
				}
			}
		},
		MuiMenu: {
			styleOverrides: {
				root: {
					'& a': {
						color: theme.palette.grey[900]
					},
					'& .MuiListItemIcon-root': {
						marginRight: 0,
						marginLeft: 0
					}
				}
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary
				}
			}
		}
	}
})

export const light = responsiveFontSizes(theme)
