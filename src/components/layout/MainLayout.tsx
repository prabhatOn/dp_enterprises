import { ReactNode } from "react";
import Header from "@/components/common/heroBanner";  // Only keep if it’s not part of Navbar
import Footer from "@/components/common/Footer";
import Navbar from "../common/Navbar";
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24">
          {children} 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
