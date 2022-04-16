import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children, locale }) => (
  <div className="bg-gray-300">
    <Navigation locale={locale} />
    {children}
    <Footer />
  </div>
);

export default Layout;