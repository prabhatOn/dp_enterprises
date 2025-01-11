import Header from "@/components/common/Header";
import React from "react";
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import ProductCarousel from "@/components/common/ProductCarousel";

const index = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Here add the photo */}
          <ProductCarousel />
          <Header />
          {/* Other content */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
