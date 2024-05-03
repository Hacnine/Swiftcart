import Hero from "../components/Hero";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import FeatureProducts from "../components/FeatureProducts";
import ChatList from "./ChatList";

const Home = () => {
  return <div className="space-y-10 overflow-clip">
    <ChatList/>
    <Hero/>
    <FeatureProducts/>
    <Services/>
    <Trusted/>
  </div>;
};

export default Home;
