import { IconButton } from '@mui/material';
import React from 'react';

const CustomIconButton = ({ Icon, color }) => {
  return (
    <IconButton
      size="small"
      className="hover:text-purple-700"
      sx={{
        color: color || "Indigo", // Use color if provided, otherwise default to "Indigo"
        border: 2,
        borderColor: color || "Indigo", // Use color if provided, otherwise default to "Indigo"
        borderRadius: "8px",
        fontSize: "16px", // Change to the desired font size

        "&:hover": {
          backgroundColor: color || "Indigo", // Use color if provided, otherwise default to "Indigo"
          borderColor: color || "Indigo", // Use color if provided, otherwise default to "Indigo"
          color: color="DarkGray" ,
        },
      }}
    >
      {Icon}
    </IconButton>
  );
};

export default CustomIconButton;
