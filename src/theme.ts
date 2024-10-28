import { createTheme as createMuiTheme } from '@mui/material/styles'

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    gradients?: {
      desktop?: string
      mobile?: string
      tablet?: string
      nav?: string
      lightblueComponent?: string
      // You can add more gradient definitions here if needed
    }
  }
  interface Palette {
    gradients: {
      desktop: string
      mobile: string
      tablet: string
      nav: string
      lightblueComponent: string
      // Match the PaletteOptions gradients structure
    }
  }
}

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    gradients: {
      desktop: 'linear-gradient(135deg, #f5f7fa, #d4e0eb, #c3cfe2)',
      mobile: 'linear-gradient(135deg, #f5f7fa, #d4e0eb, #c3cfe2)',
      tablet: 'linear-gradient(135deg, #f5f7fa, #d4e0eb, #c3cfe2)',
      nav: 'linear-gradient(180deg, rgba(17, 24, 39, 1), rgba(31, 41, 55, 1))',
      lightblueComponent: 'linear-gradient(135deg, #f5f7fa, #d4e0eb, #c3cfe2)',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR","SBAggro","Consolas","Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '6rem',
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 225,
    },
  },
})

export default theme
