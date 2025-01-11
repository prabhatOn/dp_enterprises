import { ReactNode } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import Navbar from "../common/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Other content */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
