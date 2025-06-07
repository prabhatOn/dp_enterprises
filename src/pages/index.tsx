import React from "react";
import ProductSection from "@/components/common/ProductCarousel";
import ServiceSection from "@/components/common/service";
import HeroCarousel from "@/components/common/HeroCarousel";

const Home: React.FC = () => {
  return (
    <>
      <HeroCarousel />
      <ProductSection />
      <ServiceSection />
    </>
  );
};

export default Home;
