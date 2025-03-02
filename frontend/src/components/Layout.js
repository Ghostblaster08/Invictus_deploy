import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Chatbot from "./Chatbot"; // Import Chatbot component
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PrescriptionReader from "../pages/PrescriptionReader";
import HealthReports from "../pages/HealthReports";
import Support from "../pages/Support";
import Medicines from "../pages/Tracker";
import "../styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/prescription" element={<PrescriptionReader />} />
            <Route path="/health-reports" element={<HealthReports />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Layout;
