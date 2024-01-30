import { Button } from "@mui/material";
import heroimage1 from "../assets/heroimage1.svg";
import { Delete, ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";

const HeroImage = () => {
  return (
    <div >
      <div className=" relative">
      <img src={heroimage1} alt="" />

      <div className="absolute left-16 lg:top-60 md:top-40 sm:top-10 top-5 ">
        <span className=" text-4xl md:text-sm font-bold  leading-[146%]   font-open text-start text-slate-blue ">
          SWIFT <span className=" text-purple-950 s   ">CART</span>
        </span>
        <p className="uppercase tracking-wider text-red-400 mb-5 sm:text-sm md:text-base text-xs">
          Where shopping meets delight in every click!
        </p>
        <Link to={"/product"}>
          <Button
            variant="container"
            sx={{
              bgcolor: '#47244c',
              borderRadius: 20,
              color: "white",

              "&:hover": {
                bgcolor: "purple",
                color: "white",
              },
            }}
            startIcon={
              <ShoppingBasket
                fontSize="large"
                sx={{
                  bgcolor: "white",
                  color: '#47244c',
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
    </div>
  );
};

export default HeroImage;
