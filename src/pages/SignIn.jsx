import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent } from "react";
import { Customization } from "../GlobalStyle";
import {
  AccountCircle,
  Facebook,
  FacebookRounded,
  Google,
  Twitter,
} from "@mui/icons-material";
import {SignIn} from "../components/signinandup/index"

const SignInPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
    <SignIn/>
    </>
  );
};

export default SignInPage;
