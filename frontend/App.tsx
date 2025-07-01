"use client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./src/app/user/NavBar/NavBar";
import AdminLayout from "./src/app/admin/AdminLayout";
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
import KYC from "./src/app/admin/KYC/kyc";
import Beneficiaries from "./src/app/admin/Beneficiaries/beneficiaries";
import SavingPlan from "./src/app/admin/ChitJewelsSavingPlan/savingplan";
import SPIPPlan from "./src/app/admin/DigitalGoldSPIPlan/sipplan";
import PlantScheme from "./src/app/admin/GoldPlantScheme/plantscheme";
import Notification from "./src/app/admin/Notification/notification";
import MyBankAccounts from "./src/app/admin/MyBankAccounts/mybankaccounts";
import ManageOrnaments from "./src/app/admin/ManageOrnaments/manageornaments";
import PartnerPopup from "./src/app/user/PartnerPopup";
import SignupPopup from "./src/app/user/SignupPopup";
// ...import other pages...

const AppRoutes: React.FC = () => {
  return (
    
      <Routes>
        {/* Admin routes */}
        <Route element={<AdminLayout/>}>
        
        <Route path="/admin" element={ <AdminDashboard/>}/>
        <Route path="/adminprofile" element={ <AdminProfile/>}/>
        <Route path="/commission" element={ <Commission/>}/>
        <Route path="/payoutrequest" element={ <Commission/>}/>
        <Route path="/kyc" element={ <KYC/>}/>
        <Route path="/beneficiaries" element={ <Beneficiaries/>}/>
        <Route path="/savingplan" element={ <SavingPlan/>}/>
        <Route path="/spiplan" element={ <SPIPPlan/>}/>
        <Route path="/plantscheme" element={ <PlantScheme/>}/>
        <Route path="/notification" element={ <Notification/>}/>
        <Route path="/mybankaccounts" element={ <MyBankAccounts/>}/>
        <Route path="/manageornaments" element={ <ManageOrnaments/>}/>
      
        
        {/* Add other admin routes here */}
        
        

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
        <Route path="/partnerpopup" element={ <PartnerPopup open={true} onClose={() => {}} />}/>
        <Route path="/signuppopup" element={ <SignupPopup open={true} onClose={() => {}} />}/>
        {/* Add other user routes here */}

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