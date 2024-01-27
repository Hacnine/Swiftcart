import { Facebook } from "@mui/icons-material";
import { GiReceiveMoney } from "react-icons/gi";
import minilogo from "../../assets/minilogo-2.svg";

const AboutCard = ({ image, title, paragraph, bg }) => {
  return (
    <div className={` flex items-start justify-start gap-2 text-white w-80 h-44 p-4    ${bg}`}>
      <img src={minilogo}  width={50} alt="company logo" />
      <div>
        <p className=" text-xl">{title}</p>
        <p className="text-sm">
         {paragraph}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
