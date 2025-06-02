import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const theme = createTheme({
  spacing: 4,
  palette: {
    primary: { main: '#1976d2', light: '#f8fafd' },
    secondary: { main: '#ff9800' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
    h1: { fontSize: '2rem', fontWeight: 700 },
    h2: { fontSize: '1.75rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 500 },
    h5: { fontSize: '1.125rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 400 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 991,
      xl: 1280,
      xxl: 1440,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '4px',
        },
        body: {
          fontSize: '12px',
          padding: '4px',
        },
      },
    },
  },
});
