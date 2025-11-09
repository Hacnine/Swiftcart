import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({ name }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className="hover:bg-purple-800"
      sx={{ mt: 3, mb: 2, bgcolor: "Indigo", borderRadius: 20 }}
    >
      {name}
    </Button>
  );
};

export default PrimaryButton;
