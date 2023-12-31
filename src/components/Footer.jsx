import React from "react";
import GetStarted from "./GetStarted";
import FooterLinks from "./FooterLinks";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  return (
    <div className="  mx-auto flex items-center justify-center flex-col w-full relative mt-36">
      <div className="w-[90%] absolute -top-24 ">
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
