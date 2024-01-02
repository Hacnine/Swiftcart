import logo from "../assets/logo2.jpeg"

const MiniProductCard = () => {
  return (
    <div>
                <div className="">
          <img src={logo} 
          alt="Product Image"
          className=" md:w-[400px] w-[100px] rounded" />
          </div>
    </div>
  )
}

export default MiniProductCard
