import React from "react";
import { Grid, Link } from "@mui/material";


const CustomLink = ({ message, link }) => {
  return (
    <Grid item xs>
      <Link
        href={link?.toString() ?? "#"}
        variant="body2"
        sx={{ color: "gray" }}
      >
        
        {message}
      </Link>
    </Grid>
  );
};

export default CustomLink;
