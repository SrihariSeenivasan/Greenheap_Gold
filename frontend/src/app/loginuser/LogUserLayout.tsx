import "bootstrap/dist/css/bootstrap.min.css";
import { MessageCircle } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import "../../../globals.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";


interface UserLayoutProps {
  children?: React.ReactNode;
}

const LogUserLayout: React.FC<UserLayoutProps> = () => {
  return (
    <div >
      <NavBar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-4 md:p-6 lg:p-8">
          <Outlet />
          {/* Floating WhatsApp Button */}
          <div className="fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6">
            <button
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce"
              style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
          <Footer/>
        </main>
    </div>
  );
};

export default LogUserLayout;