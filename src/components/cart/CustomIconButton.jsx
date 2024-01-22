import { IconButton } from "@mui/material";


const CustomIconButton = ({ Icon }) => {
  return (
    <IconButton
      size="small"
    //   className=" hover:text-purple-700"
      sx={{
        color: "Indigo",
        border: 0.5,
        borderColor: "Indigo",
        borderRadius: "3px",
        fontSize: "10px",

        "&:hover": {
          backgroundColor: "Indigo",
          borderColor: "Indigo",
        //   color: "white",
          bgcolor: "whitesmoke"
        },
      }}
    >
      {Icon}
    </IconButton>
  );
};

export default CustomIconButton;
