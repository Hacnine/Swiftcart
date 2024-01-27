import React from "react";
import { useProductContext } from "../context/ProductContext";

import AboutCard from "../components/about/AboutCard";
import { GiReceiveMoney } from "react-icons/gi";
import { RiTruckFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import CommonSlider from "../components/CommonSlider";
import ProfileCard from "../components/about/ProfileCard";
import { memberInfo, partners, shortReview } from "../constants";
import ShortReview from "../components/about/ShortReview";

const About = () => {
  const { start } = useProductContext();
  return (
    <div className="mb-36  ">
      <div className=" bg-about  bg-center bg-no-repeat pt-5 ">
        <p className="  font-sans font-bold text-5xl mt-28 text-gray-900 py-2 bg-white/40 w-full text-center mb-10">
          About Us
        </p>

        <div className=" center bg-[#150022ff] ">
          <AboutCard
           
            title={"Who We Are?"}
            paragraph={
              "We are a dedicated team committed to providing top-notch products and services. With a passion for customer satisfaction, we strive to deliver quality and excellence in every aspect of your shopping experience."
            }
            bg={"bg-[#170028ff]"}
          />
          <AboutCard
            
            title={"What Are We Do ?"}
            paragraph={
              "We provide a curated selection of high-quality products, seamless online shopping, and reliable delivery services to enhance your overall shopping experience. "
            }
            bg={"bg-[#1b002eff]"}
          />
          <AboutCard
            
            title={"Why Will You Choose Us?"}
            paragraph={
              "At, we prioritize your shopping experience. Our commitment to quality products, seamless navigation, secure transactions, and exceptional customer service sets us apart."
            }
            bg={"bg-[#200038ff]"}
          />
        </div>
      </div>
      <div className=" grid lg:grid-cols-4 md:grid-cols-2  mt-14 wrapper">
        {shortReview.map((element, index) => (
          <ShortReview {...element} />
        ))}
      </div>

      
      <div className="center flex-col font-semibold mt-14">
        <p className=" text-red-400">OUR TEAM</p>

        <p className="font-bold text-[46px] ">Meet Our Team</p>

        <div className="pt-10  grid lg:grid-cols-4 md:grid-cols-2 gap-10 ">
          {memberInfo.map((item) => (
            <ProfileCard {...item} />
          ))}
        </div>
      </div>

      <CommonSlider />

      <div className="center flex-col font-semibold mt-14">
        <p className=" text-red-400">OUR PARTNERS</p>

        <p className="font-bold text-[46px]">Happy Clients
</p>

      <div className="  grid grid-cols-4 wrapper gap-20">
        {partners.map((image)=>(
          <img src={image.image} alt="partners" />
        ))}
      </div>
      </div>

    </div>
  );
};

export default About;
