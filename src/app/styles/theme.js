import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'



// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#F2B84B',
    },
    secondary: {
      main: '#FB6542',
    },

    common: {
        black: '#1E1E1E',
    },
    
    error: {
      main: red.A400,
    },
    warning: {
      main: red.A100,
    },
    background: {
      default: '#fff',
    },
  },

  shape: {
    borderRadius: 12
  },
})


export default theme