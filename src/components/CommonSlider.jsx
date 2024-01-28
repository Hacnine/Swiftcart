import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineNavigateNext, MdNavigateBefore } from "react-icons/md";
import AboutCard from "./about/AboutCard";
import TestimonialCard from "./about/TestimonialCard";
import avatar1 from "../assets/avatar.png";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
import avatar4 from "../assets/avatar4.jpg";

const CommonSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,

    slidesToShow: 3,
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
    <div className=" h-[466px] px-14 mt-20 bg-no-repeat bg-center  gap-2 border-gray-700 bg-testimonial py-16 mr-5w-full ">
      <div className=" container mx-auto">
        <Slider {...settings}>
          <TestimonialCard
            avatar={avatar1}
            designation={"Writer"}
            name={"Abir Mahmud"}
          />
          <TestimonialCard
            avatar={avatar2}
            designation={"Cricketer"}
            name={"Muhammad Hafiz"}
          />
          <TestimonialCard
            avatar={avatar3}
            designation={"Naat Singer"}
            name={"Aqib Farid"}
          />

          <TestimonialCard
            avatar={avatar4}
            designation={"Photo Grapher"}
            name={"Junayed Habib"}
          />
        </Slider>
      </div>
    </div>
  );
};

export default CommonSlider;
