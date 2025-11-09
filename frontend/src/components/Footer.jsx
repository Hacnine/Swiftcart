import React from "react";
import GetStarted from "./GetStarted";
import FooterLinks from "./FooterLinks";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  return (
    <div className=" max-w-screen-2xl  mx-auto flex items-center justify-center flex-col w-full relative ">
      <div className="w-[90%] absolute md:-top-24 -top-32 ">
        <GetStarted />
      </div>
      <div className="w-full  ">
        <NewsLetter />
        <FooterLinks />
      </div>
    </div>
  );
};

export default Footer;
