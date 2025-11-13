import React from "react";

import GitHubStarBanner from "@/components/banner/github-star-banner";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/comp-582";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GitHubStarBanner />
      <Navbar />
      <div className="pt-0">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
