import Navbar from "@/components/navbar/comp-582";
import Footer from "@/app/[locale]/(marketing)/_components/footer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
