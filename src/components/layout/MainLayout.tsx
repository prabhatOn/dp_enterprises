import { ReactNode } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "../common/Navbar";
import "tailwindcss/tailwind.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="">
        <Navbar />
        <div className="">
          {children} 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
