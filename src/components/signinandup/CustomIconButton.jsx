import { IconButton } from '@mui/material'
import React from 'react'

const CustomIconButton = ({Icon}) => {
  return (
    <IconButton
                  size="small"
                  className=" hover:text-purple-700"

                  sx={{
                    color: "Indigo",
                    border: 2,
                    borderColor: "Indigo",
                    borderRadius: "8px",
                    fontSize: "5px",

                    "&:hover": {
                      backgroundColor: "Indigo",
                      borderColor: "Indigo",
                      color: "white",
                    },
                  }}
                >
                  {Icon}
                </IconButton>
  ) 
}

export default CustomIconButton
