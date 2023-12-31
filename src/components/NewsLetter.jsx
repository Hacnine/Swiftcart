import PurpleBtn from "./PurpleBtn";

const NewsLetter = () => {
  return (
    <div className=" flex items-center justify-center sm:flex-row flex-col ">
      <div className=" wrapper bg-[#322b3c] md:w-[30%] w-full h-[150px] uppercase flex items-center sm:justify-end justify-center    ">
        <div className=" mt-5">
          <p className="text-slate-400 text-sm">subscribe to our</p>
          <h1 className="text-white text-2xl  font-normal">NewsLetter</h1>
        </div>
      </div>
      <div className=" wrapper bg-[#372f42] md:w-[70%] w-full py-11 px-10 h-[150px]">
        <div className=" md:w-[95%] flex items-center justify-between bg-white   border border-gray-600 rounded-full px-1.5">
          <input
            type="text"
            placeholder=""
            className="bg-transparent w-[70%] h-[50px]  border border-transparent outline-none px-2 focus:border-transparent   

        "
          />
          <div className="  ">
            <PurpleBtn
              className={
                "flex justify-center items-center     text-sm leading-none rounded-full py-3 "
              }
              children={"SUBSCRIBE"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
