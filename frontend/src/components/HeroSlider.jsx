import HeroImage from "./HeroImage";
import heroimage1 from "../assets/heroimage1.svg";
import heroimage2 from "../assets/heroimage2.svg";
import heroimage4 from "../assets/heroimage5.svg";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Slider from "react-slick";

const HeroSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NavigateNext />,
    prevArrow: <NavigateBefore />,
    appendDots: (dots) => (
      <div
        style={{
          bottom: "20px", // Adjust position as needed
        }}
      >
        <ul style={{ margin: "0px" }}>
          {/* Remove default margin */}
          {dots.map((dot, index) => (
            <li
              key={index}
              className=" border-4 border-purple-900 w-0.5 h-0.5 rounded-full"
              style={{
                //   display: 'inline-block',
                //   marginRight: '5px', // Adjust spacing as needed
                //   borderRadius: '50%', // Make dots circular
                width: "15px", // Adjust size as needed
                height: "15px", // Adjust size as needed
                backgroundColor: dot.props.className.includes("slick-active")
                  ? "white"
                  : "", // Change color based on active/inactive state
                cursor: 'pointer',
              }}
            ></li>
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <>
      <div className="w-full h-full px-1 sm:hidden visible">
        <HeroImage image={heroimage1} visible />
      </div>
      <div className="w-full h-full px-1 sm:block hidden">
        <Slider {...settings}>
          <HeroImage image={heroimage1} visible />
          <HeroImage image={heroimage2} />
          <HeroImage image={heroimage4} />
        </Slider>
      </div>
    </>
  );
};

export default HeroSlider;
