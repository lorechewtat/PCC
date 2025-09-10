// theme.ts
import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  palette: {
    primary: {
      main: '#20315D', // tu color personalizado
      contrastText: '#ffffff', // color del texto sobre el botón, etc.
    },
  },
});

export default myTheme;
