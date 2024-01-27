import { Button } from "@mui/material";
import heroimage1 from "../assets/heroimage1.svg";
import { Delete, ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";

const HeroImage = () => {
  return (
    <div className=" relative">
      <img src={heroimage1} alt="" />

      <div className="absolute left-16 top-60 ">
        <span className=" text-4xl   font-bold  leading-[146%]   font-open text-start text-slate-blue ">
          SWIFT <span className=" text-purple-950">CART</span>
        </span>
        <p className="uppercase tracking-wider text-red-400 mb-5">
          Where shopping meets delight in every click!
        </p>
        <Link to={"/product"}>
          <Button
            variant="container"
            sx={{
              bgcolor: "BurlyWood",
              borderRadius: 20,
              color: "white",

              "&:hover": {
                bgcolor: "#f4af90e2",
                color: "white",
              },
            }}
            startIcon={
              <ShoppingBasket
                fontSize="large"
                sx={{
                  bgcolor: "white",
                  color: "BurlyWood",
                  borderRadius: 7,
                  width: 40,
                  height: 40,
                  p: 1,
                }}
              />
            }
          >
            Buy Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroImage;
