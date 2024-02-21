import HeroImage from "./HeroImage";
import  heroimage2 from '../assets/heroimage2.svg';
import  heroimage3 from '../assets/heroimage3.svg';
import heroimage4  from '../assets/heroimage4.svg';
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
          bottom: '20px', // Adjust position as needed
        }}
      >
        <ul style={{ margin: '0px' }}>
          {/* Remove default margin */}
          {dots.map((dot, index) => (
            <li
              key={index}
              className=" border-4 border-purple-900 w-0.5 h-0.5 rounded-full"
              // style={{
              //   display: 'inline-block',
              //   marginRight: '5px', // Adjust spacing as needed
              //   borderRadius: '50%', // Make dots circular
              //   width: '10px', // Adjust size as needed
              //   height: '10px', // Adjust size as needed
              //   backgroundColor: dot.props.className.includes('slick-active')
              //     ? '#000'
              //     : '#ccc', // Change color based on active/inactive state
              //   cursor: 'pointer',
              // }}
            ></li>
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <div className="w-full ">
      <Slider {...settings}>
       <HeroImage/>
      <img src={heroimage2} alt="" />
     <img src={heroimage3} alt="" />
       <img src={heroimage4} alt="" />


      </Slider>
    </div>
  );
};

export default HeroSlider;

