const MiniProductCard = ({ images = [{ url: "" }] }) => {
  return (
    <div className=" center gap-6 lg:flex-col ">
      {images.map((image) => (
        <div className="group relative">
          <img
            src={image.url}
            alt="Product Image"
            className=" md:w-[400px] hover:cursor-pointer hover: duration-500 transition-transform hover:scale-105 w-[100px] rounded"
          />

          <div className=" product-effect " />
        </div>
      ))}
    </div>
  );
};

export default MiniProductCard;
