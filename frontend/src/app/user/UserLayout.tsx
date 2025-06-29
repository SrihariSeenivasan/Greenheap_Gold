import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../../../globals.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";

interface UserLayoutProps {
  children?: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;