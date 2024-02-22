import { Button } from "@mui/material";
import heroimage1 from "../assets/heroimage1.svg";
import { Delete, ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import HeroImageContent from "./Hero/HeroImageContent";

const HeroImage = ({ image, visible }) => {
  const styles = {
    container: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      // height: "200px",
      width: "100%",
    },
  };
  // 
  return (
    <div className="md:h-[500px] h-[250px] w-full " style={styles.container}>
      {visible ? (
        <div className=" md:translate-y-[220px] translate-y-[70px] translate-x-6 md:translate-x-12 ">
         <HeroImageContent/>
        </div>
      ) : null}
    </div>
  );
};

export default HeroImage;
