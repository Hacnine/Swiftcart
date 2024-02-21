import loading from '../assets/loading.svg'
import '../globalcss.css'

const Loading = () => {
  return (
    <div className="center flex-col bg-[#009f9f54] h-screen">
      <img src={loading} width={700} alt="" />
      <span class="loader"></span>
    </div>
  );
};

export default Loading;
