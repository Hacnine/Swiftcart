import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({avatar, name, designation}) => {
  return (
    <div className="  bg-[#9d98a3] my-20 ">
      <div className=" relative  border border-slate-300 w-80 py-2 rounded-md shadow-md shadow-slate-200">
        <span className="absolute -top-5 bg-purple-950 rounded-full text-xl w-10 h-10 center text-white z-40 ">
          <FaQuoteLeft />
        </span>
        <p className=" ml-12 italic text-slate-100 " >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero esse
          commodi atque{" "}
        </p>

        <List sx={{ width: "100%", maxWidth: 360 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Travis Howard"
                src={avatar}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" color="white">
                  {name}
                </Typography>
              }
              secondary={designation}
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default TestimonialCard;
