"use client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./src/app/admin/AdminDashboard/admindashboard";
import AdminLayout from "./src/app/admin/AdminLayout";
import AdminProfile from "./src/app/admin/AdminProfile/adminprofile";
import Beneficiaries from "./src/app/admin/Beneficiaries/beneficiaries";
import SavingPlan from "./src/app/admin/ChitJewelsSavingPlan/savingplan";
import Commission from "./src/app/admin/Commission/commission";
import SPIPPlan from "./src/app/admin/DigitalGoldSPIPlan/sipplan";
import PlantScheme from "./src/app/admin/GoldPlantScheme/plantscheme";
import KYC from "./src/app/admin/KYC/kyc";
import ManageOrnaments from "./src/app/admin/ManageOrnaments/manageornaments";
import MyBankAccounts from "./src/app/admin/MyBankAccounts/mybankaccounts";
import Notification from "./src/app/admin/Notification/notification";
import PartnerLayout from "./src/app/partner/PartnerLayout";
import PartnerCampaigns from "./src/app/partner/partnercampaigns";
import PartnerCommission from "./src/app/partner/partnercommission";
import PartnerDashboard from "./src/app/partner/partnerdashboard";
import PartnerLeaderboard from "./src/app/partner/partnerleaderboard";
import PartnerLogin from "./src/app/partner/partnerlogin";
import PartnerMarketing from "./src/app/partner/partnermarketing";
import PartnerPayout from "./src/app/partner/partnerpayout";
import PartnerProfile from "./src/app/partner/partnerprofile";
import PartnerReferral from "./src/app/partner/partnerreferral";
import PartnerSupport from "./src/app/partner/partnersupport";
import AboutUsPage from "./src/app/user/AboutUs/aboutus";
import BuyOrnamentsPage from "./src/app/user/BuyOrnaments/buyOrnaments";
import ContactUsPage from "./src/app/user/ContactUs/contactus";
import Footer from "./src/app/user/Footer/Footer";
import NavBar from "./src/app/user/NavBar/NavBar";
import PrivacyPlicyPage from "./src/app/user/PrivacyPolicy/privacy";
import Terms from "./src/app/user/TermsAndCondition/termsandcondition";
import UserHome from "./src/app/user/UserHome";
import UserLayout from "./src/app/user/UserLayout";

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
        {/* <Route path="/beneficiaries" element={ <Beneficiaries/>}/> */}
        <Route path="/savingplan" element={ <SavingPlan/>}/>
        <Route path="/spiplan" element={ <SPIPPlan/>}/>
        <Route path="/plantscheme" element={ <PlantScheme/>}/>
        <Route path="/notification" element={ <Notification/>}/>
        <Route path="/mybankaccounts" element={ <MyBankAccounts/>}/>
        <Route path="/manageornaments" element={ <ManageOrnaments/>}/>
        
        {/* Add other admin routes here */}
        
        

        </Route>
        {/* Partner routes */}
        <Route element={<PartnerLayout/>}>
          <Route path="/pdashboard" element={<PartnerDashboard />} />
          <Route path="/preferral" element={<PartnerReferral />} />
          <Route path="/pmarketing" element={<PartnerMarketing />} />
          <Route path="/pcommission" element={<PartnerCommission />} />
          <Route path="/ppayout" element={<PartnerPayout />} />
          <Route path="/pcampaigns" element={<PartnerCampaigns />} />
          <Route path="/pleaderboard" element={<PartnerLeaderboard />} />
          <Route path="/psupport" element={<PartnerSupport />} />
          <Route path="/pprofile" element={<PartnerProfile />} />
          
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