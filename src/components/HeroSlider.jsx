import Slider from "react-slick";
import TestimonialCard from "./about/TestimonialCard";
import avatar1 from '../assets/heroimage1.svg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';
import avatar4 from '../assets/avatar4.jpg';
import HeroImage from "./HeroImage";

import  heroimage2 from '../assets/heroimage2.svg';
import  heroimage3 from '../assets/heroimage3.svg';
import heroimage4  from '../assets/heroimage4.svg';


const HeroSlider = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    // nextArrow: <CustomNextArrow />,
    // prevArrow: <CustomPrevArrow />,
    // initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    // sm:bg-green-600 md:bg-yellow-900 lg:bg-red-500
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

