"use client";
import { Route, BrowserRouter , Routes } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AdminLayout from "./admin/AdminLayout";

// ...import other pages...

const AppRoutes: React.FC = () => {
  return (
    
      <Routes>
        {/* Admin routes */}
        <Route element={<AdminLayout/>}>
        <Route path="/admin" element={ <AdminLayout/>}/>

        </Route>
        {/*User routes */}
        <Route path="/navbar" element={ <NavBar />}/>
        <Route path="/footer" element={ <Footer />}/>

        <Route />
              
          
       
       
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