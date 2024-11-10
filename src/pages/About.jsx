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
import background from '../assets/about-us.svg'

const About = () => {
  const styles = {
    container: {
      background: `url(${background})`,
      backgroundSize: 'cover', // Adjust as needed (e.g., 'contain', '50% 50%', etc.)
      backgroundRepeat: 'no-repeat',
      height: '400px', // Set the desired height
      // Add other styling properties as needed
    },
    // Add other styles for child elements if necessary
  };
  return (
    <div className="mb-32 my-5 ">
      <div className="   bg-center bg-no-repeat pt-5 "style={styles.container}>
        <p className="  font-sans font-bold text-5xl mt-28 text-gray-900 py-2 bg-white/40 w-full text-center mb-10">
          About Us
        </p>

        <div className="  hidden md:flex items-center justify-center flex-col md:flex-row bg-[#150022ff] ">
          <AboutCard
            title={"Who We Are?"}
           
            secondaryPara={'Your go-to e-commerce destination for seamless shopping.'}
            bg={"bg-[#170028ff]"}
          />
          <AboutCard
            title={"What Are We Do ?"}
           
            secondaryPara={'We simplify and elevate your online shopping with a diverse product selection.'}
            bg={"bg-[#1b002eff]"}
          />
          <AboutCard
            title={"Why Will You Choose Us?"}
           
            secondaryPara={'Quality products, user-friendly interface, and outstanding customer service.'}
            bg={"bg-[#200038ff]"}
          />
        </div>
      </div>
      <div className=" flex items-center justify-center ">
      <div className=" grid lg:grid-cols-4 md:grid-cols-2 gap-3 mt-14 wrapper">
        {shortReview.map((element, index) => (
          <ShortReview {...element} />
        ))}
      </div>
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

        <p className="font-bold text-[46px] mb-8">Happy Clients</p>

        <div className="  grid grid-cols-4 wrapper gap-20">
          {partners.map((image) => (
            <img src={image.image} alt="partners" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
