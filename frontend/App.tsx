"use client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./src/app/user/NavBar/NavBar";
import AdminLayout from "./src/app/admin/AdminLayout";
import AdminSideNav from "./src/app/admin/AdminSideNav";
import Footer from "./src/app/user/Footer/Footer";
import UserHome from "./src/app/user/UserHome";
import UserLayout from "./src/app/user/UserLayout";
import Terms from "./src/app/user/TermsAndCondition/termsandcondition";
import ContactUsPage from "./src/app/user/ContactUs/contactus";
import BuyOrnamentsPage from "./src/app/user/BuyOrnaments/buyOrnaments";
import AboutUsPage from "./src/app/user/AboutUs/aboutus";
import PrivacyPlicyPage from "./src/app/user/PrivacyPolicy/privacy";
import AdminDashboard from "./src/app/admin/AdminDashboard/admindashboard";
import AdminProfile from "./src/app/admin/AdminProfile/adminprofile";
import Commission from "./src/app/admin/Commission/commission"; 
// ...import other pages...

const AppRoutes: React.FC = () => {
  return (
    
      <Routes>
        {/* Admin routes */}
        <Route element={<AdminLayout/>}>
        <Route path="/admin" element={ <AdminSideNav/>}/>
        <Route path="/admindashboard" element={ <AdminDashboard/>}/>
        <Route path="/adminprofile" element={ <AdminProfile/>}/>
        <Route path="/commission" element={ <Commission/>}/>
        <Route path="/payoutrequest" element={ <Commission/>}/>
        <Route path="/kyc" element={ <Commission/>}/>
        <Route path="/beneficiaries" element={ <Commission/>}/>
        <Route path="/savingplan" element={ <Commission/>}/>
        <Route path="/spiplan" element={ <Commission/>}/>
        <Route path="/plantscheme" element={ <Commission/>}/>
        <Route path="/notification" element={ <Commission/>}/>
        <Route path="/mybankaccounts" element={ <Commission/>}/>
        <Route path="/logout" element={ <Commission/>}/>
        

        </Route>
        {/*User routes */}
        <Route element={<UserLayout/>}>
        <Route path="/" element={ <UserHome />}/>
        <Route path="/navbar" element={ <NavBar />}/>
        <Route path="/footer" element={ <Footer />}/>
        <Route path="/terms" element={ <Terms />}/>
        <Route path="/contactus" element={ <ContactUsPage />}/>
        <Route path="/buyornaments" element={ <BuyOrnamentsPage />}/>
        <Route path="/aboutus" element={ <AboutUsPage />}/>
        <Route path="/privacy" element={ <PrivacyPlicyPage />}/>
        


        </Route >
             
          
       
       
      </Routes>
    
  );
}

const App: React.FC = () => {
 
  return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>

  );
};

export default App;