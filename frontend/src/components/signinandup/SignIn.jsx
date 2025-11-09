
import React from "react";
import { Box, FormControlLabel, Grid } from "@mui/material";
import {
  InputField,
  CheckBoxField,
  Wrapper,
  CustomLink,
  PrimaryButton,
} from "./index";

const SignIn = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Wrapper welcomeMessage="Welcome to " pageName="Sign In">
      <Box
        component="form"
        // onSubmit={handleSubmit}  // I got error here! Event handlers cannot be passed to Client Component props.
        // <... component="form" onSubmit={function}
        noValidate
      >
        <InputField label={"email"} type={"email"}/>
        <InputField label={"password"} type={"password"} />

        <FormControlLabel
          control={<CheckBoxField color="Indigo" />}
          label={<span className=" text-sm text-gray-600">Remember Me</span>}
        />
        <PrimaryButton name={"Sign In"} />
        <Grid container>
          <CustomLink message=" Forgot password?" link="#" />
          <CustomLink message="Don't have an account? Sign Up" link="/signup" />
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default SignIn;
