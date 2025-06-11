import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }

  interface Palette {
    backgroundCustom: {
      main?: string;
      dark?: string;
    };
  }

  interface PaletteOptions {
    backgroundCustom?: {
      main?: string;
      dark?: string;
    };
  }
}
