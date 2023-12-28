import { IoClose } from "react-icons/io5";

const  NavbarPopup = ({ open, onClose, children }) => {
  return (
    <div
    onClick={onClose}
    className={`
  fixed inset-0 flex justify-center items-center transition-colors
  ${open ? "visible bg-black/20" : "invisible"}
  `}
  >
    <div
      onClick={onClose}
      className={`
    bg-white rounded-xl shadow  flex items-center justify-center text-xl w-[70%] h-[90%] transition-all
    ${open ? "scale-100 opacity-100" : " scale-125 opacity-0 "}
    `}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
      >
        <IoClose />

        
      </button>
      {children}
    </div>
  </div>
  )
}

export default NavbarPopup
