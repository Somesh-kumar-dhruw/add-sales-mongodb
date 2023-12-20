// Import necessary modules and components
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import routing components
import  { Navbar }  from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { AddSales } from "./pages/AddSales";
import { TopSales } from "./pages/TopSales"; 
import {TodayRevenue} from "./pages/TodayRevenue"
import { Login } from "./pages/Login"; 
import { Registration } from "./pages/Registration"; 
import { UserInfo } from "./pages/UserInfo";


// Define the main App component
export default function App() {
  return (
    <div className="app-box">
      {/* Set up the BrowserRouter for routing */}
      <BrowserRouter>
        {/* Include the Navbar component */}
        <Navbar />
        {/* Define route configurations */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/AddSales" element={<AddSales />} /> 
          <Route path="/TopSales" element={<TopSales />} /> 
          <Route path="/TodayRevenue" element={<TodayRevenue />} /> 
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} /> 
          <Route path="/UserInfo" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
