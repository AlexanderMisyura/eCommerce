import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }

  interface Palette {
    accent: {
      main?: string;
      light?: string;
      dark?: string;
    };
    confirmation: {
      main?: string;
      light?: string;
      dark?: string;
    };
    backgroundCustom: {
      main?: string;
      dark?: string;
    };
  }

  interface PaletteOptions {
    accent: {
      main?: string;
      light?: string;
      dark?: string;
    };

    confirmation: {
      main?: string;
      light?: string;
      dark?: string;
    };

    backgroundCustom?: {
      main?: string;
      dark?: string;
    };
  }
}
