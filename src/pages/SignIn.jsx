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
    <section className="bg-green-100/30 flex items-center flex-col md:flex-row md:justify-between wrapper py-20">
      <div className="md:w-1/2 w-[90%] ">
        <span className=" text-5xl   font-bold  leading-[146%]   font-open text-start text-slate-blue">
          LET’S BEGIN WITH <span className="text-purple-900">SWIFT CART </span>
        </span>
      </div>

      <div className="md:w-1/2 w-[90%] space-y-4  ">
        <Container component="main" maxWidth="xs" sx={{}}>
          <Paper
            elevation={10}
            sx={{
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                marginTop: 8,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "Indigo",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <Typography component="h1" variant="h5" color="whitesmoke">
                Sign In
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 2,
                pb: 2,
              }}
            >
              <p className=" font-bold mt-3 text-slate-600">Sign In With</p>
              
              <Stack direction="row" spacing={1} mt={2}>
                <IconButton
                  size="small"
                  className="hover:text-purple-700"

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
                  <Twitter />
                </IconButton>
                <IconButton
                  size="small"
                  className="hover:text-purple-700"

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
                  <Google />
                </IconButton>

                <IconButton
                  size="small"
                  className="hover:text-purple-700"
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
                  <Facebook />
                </IconButton>
              </Stack>

              <p className=" mt-3 text-slate-600 text-sm">Or</p>

              <Box
                component="form"
                // onSubmit={handleSubmit}
                noValidate
                // sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={<span className=" text-sm text-gray-600">Email</span>}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="standard"
                  sx={Customization.inputField}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={
                    <span className=" text-sm text-gray-600">Password</span>
                  }
                  type="password"
                  id="password"
                  variant="standard"
                  autoComplete="current-password"
                  sx={Customization.inputField}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      defaultChecked
                      sx={{
                        color: "Indigo",
                        "&.Mui-checked": {
                          color: "Indigo",
                        },
                        "&.Mui-label": {
                          color: "Indigo",
                        },
                      }}
                    />
                  }
                  label={
                    <span className=" text-sm text-gray-600">Remember Me</span>
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="hover:bg-purple-800"
                  sx={{ mt: 3, mb: 2, bgcolor: "Indigo", borderRadius: 20 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" sx={{ color: "gray" }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2" sx={{ color: "gray" }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>
    </section>
  );
};

export default SignIn;
