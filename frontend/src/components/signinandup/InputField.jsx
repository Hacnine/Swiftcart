import React from "react";
import { TextField } from "@mui/material";
const InputField = ({ label, type}) => {
    return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={<span className=" text-sm text-gray-600 capitalize">{label}</span>}
      name={label}
      autoComplete={label}
      variant="standard"
      type={type}
      sx={{
        "& .MuiInput-underline:before": {
          borderBottomColor: "Indigo",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "Indigo",
        },
    
        "& .MuiInput-underline:hover:before": { borderBottomColor: "Indigo" },
    
        "& .MuiInputLabel-root": { color: "gray" },
        
        "& .MuiOutlinedInput-root": {
          "& > fieldset": {
            borderRadius: 4,
          },
        },
        
      }}
    />
  );
};

export default InputField;
