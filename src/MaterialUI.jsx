import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    AvatarGroup,
    Badge,
    Button,
    ButtonGroup,
    Checkbox,
    Chip,
    FormControlLabel,
    FormLabel,
    IconButton,
    ListItem,
    ListItemIcon,
    Paper,
    Radio,
    RadioGroup,
    Rating,
    Skeleton,
    Slider,
    Stack,
    Switch,
    TextField,
    ThemeProvider,
    Tooltip,
    Typography,
  } from "@mui/material";
  import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
  
  import * as React from "react";
  import Box from "@mui/material/Box";
  import Fab from "@mui/material/Fab";
  import AddIcon from "@mui/icons-material/Add";
  import EditIcon from "@mui/icons-material/Edit";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import NavigationIcon from "@mui/icons-material/Navigation";
  import { FaDeleteLeft } from "react-icons/fa6";
  import { MdDelete } from "react-icons/md";
  import {
    ArrowDownward,
    FavoriteBorder,
    HeartBrokenOutlined,
    InboxRounded,
    InboxSharp,
  } from "@mui/icons-material";
  ``;
  import { customMUI, customTheme, Customization } from "./GlobalStyle";
const MaterialUI = () => {
  const btnStyle = { backgroundColor: "red", my: 5 };

  return (
    <div>
        <div className="center flex-col">
        <Typography variant="h3">Bismillah</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              variant="standard"
              autoFocus
              sx={Customization.inputField}
            />
          </Grid>
        </Grid>

        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "green" },
            border: "1px solid green",
            borderRadius: 1,
          }}
          InputProps={{ disableUnderline: true }}
          label="standard"
          variant="standard"
        />
        <TextField
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "orange",
              },
            },
          }}
          id="outlined-basic"
          label="outlined"
          variant="outlined"
        />

        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "green" },
            border: "1px solid green",
            borderRadius: 1,
          }}
          InputProps={{ disableUnderline: true }}
          label="standard"
          variant="standard"
        />

        <TextField
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "orange",
              },
            },
          }}
          id="outlined-basic"
          label="outlined"
          variant="outlined"
        />

        <Button variant="contained" sx={btnStyle}>
          Customized Button
        </Button>
        <Button variant="contained" sx={customMUI.btnSecond}>
          Customized Color
        </Button>

        <ThemeProvider theme={customTheme}>
          <Button variant="contained" color="secondary">
            Customized Color
          </Button>

          <Button variant="contained" color="myColor">
            My Color
          </Button>
        </ThemeProvider>

        <Paper elevation={9}>
          <Box p={5} textAlign={"center"}>
            1
          </Box>
          <Box p={5} textAlign={"center"}>
            1
          </Box>
        </Paper>

        <Typography variant="h3">Grid</Typography>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent={"center"}
        >
          <Grid item lg={3} md={3} sm={12} xs={3}>
            <Box bgcolor={"purple"} p={5} textAlign={"center"}>
              1<Typography>Bismillah</Typography>
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box bgcolor={"green"} p={5} textAlign={"center"}>
              1
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box bgcolor={"red"} p={5} textAlign={"center"}>
              1
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box bgcolor={"blue"} p={5} textAlign={"center"}>
              1
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} direction="row" justifyContent={"center"}>
          <Grid item lg={3} md={3} sm={12} xs={3}>
            <Box bgcolor={"purple"} p={5} textAlign={"center"}>
              1
              <Grid container direction="column-reverse">
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Box bgcolor={"green"} p={5} textAlign={"center"}>
                    1
                  </Box>
                </Grid>

                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Box bgcolor={"red"} p={5} textAlign={"center"}>
                    1
                  </Box>
                </Grid>

                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Box bgcolor={"blue"} p={5} textAlign={"center"}>
                    1
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box bgcolor={"green"} p={5} textAlign={"center"}>
              1
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box bgcolor={"red"} p={5} textAlign={"center"}>
              1
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box bgcolor={"blue"} p={5} textAlign={"center"}>
              1
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h3">Accordion</Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownward />}>
            <Typography>Open</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Bismillah</Typography>
          </AccordionDetails>
        </Accordion>

        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangle" width={210} height={118} />

        <Typography variant="h5">ListItem</Typography>
        <ListItem>
          <ListItemIcon>
            <InboxRounded />
          </ListItemIcon>
        </ListItem>

        <Typography variant="h5">Tooltip</Typography>
        <Tooltip title="Delete">
          <IconButton>
            <MdDelete />
          </IconButton>
        </Tooltip>

        <h1>Typography</h1>
        <Typography variant="h1">Heading H1</Typography>
        <Typography variant="h2">Heading H2</Typography>
        <Typography variant="h6">Heading H2</Typography>

        <h1>Chip</h1>
        <Stack direction={"row"} spacing={1}>
          <Chip
            label="Chip Filled"
            variant="outlined"
            onClick={() => console.log("object")}
          />
        </Stack>

        <h1>Badge</h1>
        <Badge badgeContent={4} color="primary">
          <HeartBrokenOutlined color="action" />
        </Badge>

        <h1>Avatar</h1>
        <Avatar>H</Avatar>

        <AvatarGroup max={4}>
          <Avatar
            alt="Mellow"
            src="https://www.pexels.com/photo/trees-during-day-3573351/"
          />
          <Avatar
            alt="Mellow"
            src="https://www.pexels.com/photo/trees-during-day-3573351/"
          />{" "}
          <Avatar
            alt="Mellow"
            src="https://www.pexels.com/photo/trees-during-day-3573351/"
          />{" "}
          <Avatar
            alt="Mellow"
            src="https://www.pexels.com/photo/trees-during-day-3573351/"
          />{" "}
          <Avatar
            alt="Mellow"
            src="https://www.pexels.com/photo/trees-during-day-3573351/"
          />
        </AvatarGroup>
        <h1>Button Prop</h1>
        <Box py={10}>All Side Margin</Box>
        <Box
          fontWeight="bold"
          fontSize={24}
          fontStyle="italic"
          color="success.main"
          bgcolor={"wheat"}
          border={1}
          borderTop={0}
          borderColor={"secondary.main"}
          borderRadius={16}
          width={300}
          height={300}
        >
          Alhamdulilallh
        </Box>

        <h1>Text Field</h1>
        <Stack spacing={2} direction={"row"}>
          <TextField id="outlined-basic" label="Outlined" border={0} />

          {/* <TextField/>
        <TextField label='Name' />
        <TextField label='Name' variant="standard" />
        <TextField label='Name' variant="filled" /> */}
        </Stack>

        <h1>Switch</h1>
        <Switch />
        <Switch defaultChecked />
        <FormControlLabel control={<Switch />} label="Dark" />

        <Checkbox
          icon={<FavoriteBorder color="warning" />}
          checkedIcon={<FavoriteIcon color="warning" />}
          onChange={() => console.log("Checked Done.")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Bangladesh"
          labelPlacement="start"
        />

        <Radio value="Ok" />

        <FormControlLabel
          control={<Radio />}
          label="Muslim"
          labelPlacement="start"
        />

        <FormLabel />
        <RadioGroup>
          <FormControlLabel
            control={<Radio />}
            label="Muslim"
            labelPlacement="end"
          />
          <FormControlLabel
            control={<Radio />}
            label="Islam"
            labelPlacement="end"
          />
          <FormControlLabel
            control={<Radio />}
            label="Arab"
            labelPlacement="end"
          />
        </RadioGroup>

        <h1>Rating</h1>
        <Rating value={3} readOnly />
        <Rating value={2.5} precision={0.2} />

        <h1>Slider</h1>
        <Box sx={{ width: 300 }}>
          <Slider defaultValue={6} color="secondary" />
        </Box>
      </div>
    </div>
  )
}

export default MaterialUI
