import React from "react";
import { Box, FormControlLabel, Grid, Stack } from "@mui/material";
import {
  InputField,
  CheckBoxField,
  Wrapper,
  CustomLink,
  PrimaryButton,
} from "./index";

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Wrapper welcomeMessage="Let's begin with " pageName="Sign Up">
      <Box
        component="form"
        // onSubmit={handleSubmit}  // I got error here! Event handlers cannot be passed to Client Component props.
        // <... component="form" onSubmit={function}
        noValidate
      >
        <Stack >
          <Stack direction="row" spacing={1}>
            <InputField label={"First Name"} type="text" />

            <InputField label={"Last Name"} type="text" />
          </Stack>
          <InputField label={"email"} type="email" />
          <InputField label={"password"} type={"password"} />

          <InputField label={"Re Enter Password"} type={"password"} />
        </Stack>

        <FormControlLabel
          control={<CheckBoxField color="Indigo" />}
          label={<span className=" text-sm text-gray-600">Remember Me</span>}
        />
        <PrimaryButton name={"Sign In"} />
        <Grid container>
          <CustomLink message="Have an account? Sign In" link="/signin" />
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default SignUp;
