import React from "react";
import ProductSection from "@/components/common/ProductCarousel";
import Hero from "@/components/common/hero";
import Header from "@/components/common/heroBanner";
import ServiceSection from "@/components/common/service";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductSection />
      <Header />
      <ServiceSection/>
      </>
  );
};

export default Home;
