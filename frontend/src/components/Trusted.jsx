import React from "react";

const Trusted = () => {
  return (
    <div className="">
      <div className=" bg-slate-200 flex items-center justify-center flex-col pt-8 pb-4 max-w-[1368px] mb-36 ">
        <h3 className=" text-lg font-bold text-gray-600 ">
          Trusted By 1000+ Companies
        </h3>
        <div className="grid md:grid-cols-5 grid-cols-3">
          {/* my 1st img  */}
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image2.png"
              alt="trusted-brands"
              className=" w-32"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image3.png"
              alt="trusted-brands"
              className=" w-32"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image4.png"
              alt="trusted-brands"
              className=" w-32"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image6.png"
              alt="trusted-brands"
              className=" w-32"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image8.png"
              alt="trusted-brands"
              className=" w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trusted;
