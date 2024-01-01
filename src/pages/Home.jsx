import styled from "styled-components";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import FeatureProducts from "../components/FeatureProducts";

const Home = () => {
  return <div className=" space-y-10">
    <Hero/>
    <FeatureProducts/>
    <Services/>
    <Trusted/>
  </div>;
};

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.bg};
  width
`;

export default Home;
