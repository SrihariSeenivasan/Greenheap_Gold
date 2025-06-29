"use client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./src/app/user/NavBar/NavBar";
import AdminLayout from "./src/app/admin/AdminLayout";
import AdminSideNav from "./src/app/admin/AdminSideNav";
import Footer from "./src/app/user/Footer/Footer";
import UserHome from "./src/app/user/UserHome";
import UserLayout from "./src/app/user/UserLayout";
import Terms from "./src/app/user/TermsAndCondition/termsandcondition";

// ...import other pages...

const AppRoutes: React.FC = () => {
  return (
    
      <Routes>
        {/* Admin routes */}
        <Route element={<AdminLayout/>}>
        <Route path="/admin" element={ <AdminSideNav/>}/>

        </Route>
        {/*User routes */}
        <Route element={<UserLayout/>}>
        <Route path="/" element={ <UserHome />}/>
        <Route path="/navbar" element={ <NavBar />}/>
        <Route path="/footer" element={ <Footer />}/>
        <Route path="/terms" element={ <Terms />}/>

        </Route >
              <Route path="/" element={ <UserHome />}/>
        <Route path="/navbar" element={ <NavBar />}/>
        <Route path="/footer" element={ <Footer />}/>
        <Route path="/terms" element={ <Terms />}/>
          
       
       
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