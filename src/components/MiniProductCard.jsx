import logo from "../assets/logo2.jpeg";

const MiniProductCard = (
  { images = [{ url: "" }] }
) => {
  return (
    <div className=" center gap-6 lg:flex-col">

      {images.map((image)=>(
        <div className="">
        <img
          src={image.url}
          alt="Product Image"
          className=" md:w-[400px] hover:cursor-pointer w-[100px] rounded"
        />
        </div>
      ))}

    </div>
  );
};

export default MiniProductCard;
