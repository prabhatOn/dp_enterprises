import React from "react";
import ProductCarousel from "@/components/common/ProductCarousel";
import Hero from "@/components/common/hero";
import Header from "@/components/common/heroBanner";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductCarousel />
      <Header />
      </>
  );
};

export default Home;
