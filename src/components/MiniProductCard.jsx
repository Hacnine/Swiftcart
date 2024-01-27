
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

{/* <div class="group relative">
  <img src="your-image.jpg" alt="Your Image" class="w-full h-auto" />
  <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"></div>
</div> */}


          <div className=" product-effect " />

{/* <div className="right-0 product-effect " /> */}
        </div>
        
      ))}

      
    </div>
  );
};

export default MiniProductCard;
