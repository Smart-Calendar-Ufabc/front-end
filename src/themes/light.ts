import { createTheme, responsiveFontSizes } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    tags: {
      text: {
        high: string
        medium: string
        low: string
        routine: string
        event: string
      }
      backgroundColor: {
        high: string
        medium: string
        low: string
        routine: string
        event: string
      }
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    tags?: {
      text?: {
        high?: string
        medium?: string
        low?: string
        routine?: string
        event?: string
      }
      backgroundColor?: {
        high?: string
        medium?: string
        low?: string
        routine?: string
        event?: string
      }
    }
  }
}

// Theme light typography and palette
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
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
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body2: {
      fontSize: '1.125rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#8257E5',
      light: '#996DFF',
      dark: '#8257E5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#996DFF20',
      light: '#7F4C3B',
      dark: '#4E3121',
      contrastText: '#ffffff',
    },
    common: {
      black: '#000',
      white: '#FFF',
    },
    grey: {
      '50': '#fafafa',
      '100': '#f5f5f5',
      '200': '#f0f0f0',
      '300': '#E2E2E2',
      '400': '#D3D3D3',
      '500': '#C4C4C4',
      '600': '#AAAAAA',
      '700': '#8B8B8B',
      '800': '#666666',
      '900': '#484848',
    },
    text: {
      primary: '#484848',
      secondary: '#666666',
    },
  },
  tags: {
    text: {
      high: '#FC6E6E',
      medium: '#FFA500',
      low: '#5CA9D4',
      routine: '#99BEBA',
      event: '#996DFF',
    },
    backgroundColor: {
      high: '#FC6E6E20',
      medium: '#FFA50020',
      low: '#5CA9D420',
      routine: '#99BEBA20',
      event: '#996DFF20',
    },
  },
})

// Theme light components
theme = createTheme(theme, {
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            margin: '0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingTop: 0,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0 8px',
        },
        content: {
          margin: '12px 0',
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fffffffc',
          boxShadow: 'none',
          borderBottomColor: theme.palette.grey[200],
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          zIndex: theme.zIndex.drawer + 1,
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
          padding: '20px 0',
          color: theme.palette.grey[600],
          '& a': {
            color: theme.palette.grey[500],
          },
          '& a:hover': {
            color: theme.palette.grey[900],
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: theme.zIndex.drawer + 2,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: 'none',
          padding: 12,
          lineHeight: 'normal',
          textTransform: 'none',
          fontSize: '1rem',
        },
        endIcon: {
          marginRight: 0,
          marginLeft: 4,
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: theme.palette.common.white,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: theme.palette.grey[100],
            borderColor: theme.palette.grey[300],
            borderWidth: 1,
            borderStyle: 'solid',
            color: theme.palette.primary.light,
            '&:hover': {
              borderColor: theme.palette.primary.light,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.palette.primary.light,
            },
          },
        },
      ],
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.dark,
          textDecoration: 'none',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.light,
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& a': {
            color: theme.palette.grey[900],
          },
          '& .MuiListItemIcon-root': {
            marginRight: 0,
            marginLeft: 0,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
  },
})

export const light = responsiveFontSizes(theme)
