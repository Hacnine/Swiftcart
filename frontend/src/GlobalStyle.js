import { createTheme } from "@mui/material"

export const customTheme = createTheme({
  palette:{
    secondary:{
      light: '#ff9100',
      main:'#b26500'
    },
    myColor:{
      main:'#ff3d00',
    }
  },
  typography:{
    fontSize:10,
  }
})

export const customMUI ={
  btnSecond:{
    bgcolor:'black',
    color:'yellow',
    '&:hover': {
      backgroundColor: 'purple', // Replace with your desired hover color
    },
  }
}


export const Customization = {
  inputField: {
    "& .MuiInput-underline:before": {
      borderBottomColor: "Indigo",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "Indigo",
    },
    // "& .MuiInput-text:before": {
    //   color: "orangered",
    // },

    "& .MuiInput-underline:hover:before": { borderBottomColor: "Indigo" },

    "& .MuiInputLabel-root": { color: "gray" },
    
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        // borderColor: "cyan",
        borderRadius: 4,
      },
    },

    // #000435
  },
};