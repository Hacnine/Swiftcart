import { Delete } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";

const CartCard = () => {
  return (
    <div>
      <table className="table-auto border-separate border-spacing-2 border border-slate-200 w-full ">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-2">Product Name</th>

            <th className="td-qty px-4 py-2 border-2 text-center">Quantity</th>
            <th className="px-4 py-2 border-2">Unit Price</th>
            <th className="px-4 py-2 border-2">Sub Total</th>
            <th className="px-4 py-2 border-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="  border-2 text-center">
              <List sx={{ width: "100%", maxWidth: "100%" }}>
                <ListItem>
                  <img
                    src="https://via.placeholder.com/200x200/"
                    alt="Image"
                    style={{ width: 70, marginRight: 20 }}
                  />
                  <ListItemText
                    primary={
                      <a href="#" className="text-blue-500 hover:underline">
                        Adidas Men Red Printed T-shirt
                      </a>
                    }
                    secondary={
                      <div
                        className={`w-4 h-4 bg-[#FF5733] rounded-full`}
                      ></div>
                    }
                  />
                </ListItem>
              </List>
            </td>

            <td className="px-4 py-2 border-2 text-center">
              <div className="flex items-center">
                <button className="p-1 border" type="button">
                  -
                </button>
                <span className="px-2">2</span>
                <button className="p-1 border" type="button">
                  +
                </button>
              </div>
            </td>
            <td className="px-4 py-2 border-2 text-center">$ 20.63</td>
            <td className="px-4 py-2 border-2 text-center">$ 41.26</td>
            <td className="px-4 py-2 border-2 text-center">
              <IconButton
                sx={{ color: "red", "&:hover": { color: "OrangeRed" } }}
              >
                <Delete />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td
              className="border-t border-2 text-center"
              colspan="6"
              align="right"
            >
              Total
            </td>
            <td className="border-t border-2 text-center" colspan="2">
              <b className="block px-4 py-2">$ 163.47</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartCard;

// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Stack,
//   IconButton,
//   Button,
//   TableCell,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableBody,
//   styled,
//   tableCellClasses,
//   Card,
//   Grid,
//   CardMedia,
//   CardContent,
//   Typography,
//   createTheme,
// } from "@mui/material";
// import React from "react";
// import img from "../../assets/detective.svg";
// import { Delete, FiberManualRecordOutlined } from "@mui/icons-material";
// import CartAmountToggle from "../CartAmountToggle";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),

// ];

// // const useStyles = createTheme((theme) => ({
// //   imageContainer: {
// //     width: "100%",
// //     height: 100,
// //     overflow: "hidden",
// //   },
// //   image: {
// //     width: "100%",
// //     height: "100%",
// //     objectFit: "cover",
// //   },
// //   textContainer: {
// //     padding: theme.spacing(2),
// //   },
// // }));
// const CartCard = ({ image }) => {
//   // const classes = useStyles();

//   const handleClick = () => <></>;
//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//               <StyledTableCell align="right">Calories</StyledTableCell>
//               <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow key={row.name}>
//                 <StyledTableCell component="th" scope="row">
//                   <Stack
//                     direction="row"
//                     alignItems="center"
//                     justifyContent="center"
//                   >
//                     <List sx={{ width: "100%", maxWidth: "100%" }}>
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar>
//                             <img src={img} alt="Image" style={{ width: 70 }} />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText
//                           primary="Item"
//                           secondary={
//                             <div
//                               className={`w-4 h-4 bg-[#FF5733] rounded-full`}
//                             >
//
//                             </div>
//                           }
//                         />
//                       </ListItem>
//                     </List>
//                   </Stack>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.calories}</StyledTableCell>
//                 <StyledTableCell align="right">  <div className="flex items-center justify-center  mb-3 font-bold text-gray-600">
//         <button className=" " >-</button>
//         <input
//           type="text"
//           className=" border-transparent w-11  focus:border-transparent focus:ring-0 "

//         />

//         <button >+</button>
//       </div></StyledTableCell>
//                 <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                 <StyledTableCell align="right">
//                   <IconButton
//                     aria-label="delete"
//                     color="error"
//                     sx={{ "&:hover": { color: "red" } }}
//                     onClick={handleClick}
//                   >
//                     <Delete />
//                   </IconButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Stack direction="row" alignItems="center" justifyContent="center">
//         <List
//           sx={{ width: "100%", maxWidth: "90%", bgcolor: "background.paper" }}
//         >
//           <ListItem sx={{ borderBottom: "1px solid #ccc" }}>
//             <ListItemAvatar>
//               <Avatar>
//                 <img src={img} alt="Image" style={{ width: 70 }} />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText
//               primary="Item"
//               secondary={
//                 <div className={`w-4 h-4 bg-[#FF5733] rounded-full`}>jjj</div>
//               }
//             />
//             <ListItemText secondary="90000:" />

//             <ListItemText
//               secondary={
//                 <CartAmountToggle
//                 // amount={amount}
//                 // setIncrease={setIncrease}
//                 // setDecrease={setDecrease}
//                 />
//               }
//             />

//             <ListItemText secondary="90000:" />

//             <IconButton
//               aria-label="delete"
//               color="error"
//               sx={{ "&:hover": { color: "red" } }}
//               onClick={handleClick}
//             >
//               <Delete />
//             </IconButton>
//           </ListItem>
//         </List>
//       </Stack>
//     </>
//   );
// };

// export default CartCard;
