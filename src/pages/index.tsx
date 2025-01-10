import Header from "@/components/common/Header";
import React from "react";
import 'tailwindcss/tailwind.css';
import '@/styles/globals.css';

const index = () => {
  return (
    <div>
      <Header />

      <h1 className="text-3xl font-bold">Hello World</h1>
    </div>
  );
};

export default index;
