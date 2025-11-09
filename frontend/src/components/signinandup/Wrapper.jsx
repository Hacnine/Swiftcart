import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { CustomIconButton } from "./index";
import { Facebook, Google, Twitter } from "@mui/icons-material";

const Wrapper = ({ children, pageName, welcomeMessage }) => {

  return (
    <section className="bg-green-100/30 flex items-center flex-col md:flex-row md:justify-between wrapper py-10 mb-36 ">
      <div className="md:w-1/2 w-[90%] ">
        <span className=" text-4xl   font-bold  leading-[146%]  uppercase font-open text-start text-slate-blue">
          {welcomeMessage}{" "}
          <span style={{ color: "red" }}>SWIFT</span>
          <span className="text-purple-900">CART</span>{" "}
          
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
                {pageName}
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
              <p className=" font-bold mt-3 text-slate-600 capitalize">{pageName} With</p>

              <Stack direction="row" spacing={1} >
                <CustomIconButton Icon={<Twitter />} />
                <CustomIconButton Icon={<Facebook />} />
                <CustomIconButton Icon={<Google />} />
              </Stack>

              <p className=" mt-3 text-slate-600 text-sm">Or</p>
              

              {children}
            </Box>
          </Paper>
        </Container>
      </div>
    </section>
  );
};

export default Wrapper;
