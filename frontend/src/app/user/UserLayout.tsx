import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../../../globals.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import UserHome from "./UserHome";
import {Outlet} from "react-router-dom";

interface UserLayoutProps {
  children?: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = () => {
  return (
    <div >
      <NavBar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-4 md:p-6 lg:p-8">
          <Outlet />
          <Footer/>
        </main>
    </div>
  );
};

export default UserLayout;