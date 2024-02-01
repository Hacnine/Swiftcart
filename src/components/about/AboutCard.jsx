import { Facebook } from "@mui/icons-material";
import { GiReceiveMoney } from "react-icons/gi";
import minilogo from "../../assets/minilogo-2.svg";

const AboutCard = ({ image, title, paragraph, secondaryPara, bg }) => {
  return (
    <div
      className={` flex items-start justify-start gap-2 text-white w-80 p-5 h-44 ${bg}`}
    >
      <img src={minilogo} width={50} alt="company logo" />
      <div>
        <p className=" md:text-xl text-sm font-bold mb-3">{title}</p>
        {/* <p className="text-sm md:block hidden">{paragraph}</p> */}
        <p className="text-sm b">{secondaryPara}</p>

      </div>
    </div>
  );
};

export default AboutCard;
