import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PatientLayout from "./components/PatientLayout";
import CaretakerLayout from "./components/CaretakerLayout";
import DoctorLayout from "./components/DoctorLayout";
import Home from "./pages/Home";
import PrescriptionReader from "./pages/PrescriptionReader";
import HealthReports from "./pages/HealthReports";
import Support from "./pages/Support";
import Tracker from "./pages/Tracker";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Patient Layout with Nested Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="prescription" element={<PrescriptionReader />} />
          <Route path="health-reports" element={<HealthReports />} />
          <Route path="support" element={<Support />} />
          <Route path="medicines" element={<Tracker />} />
        </Route>

        {/* Caretaker Layout with its own pages (modify as needed) */}
        <Route path="/caretaker" element={<CaretakerLayout />}>
        <Route path="prescription" element={<PrescriptionReader />} />
          <Route path="health-reports" element={<HealthReports />} />
          <Route path="support" element={<Support />} />
          <Route path="medicines" element={<Tracker />} />
        </Route>

        {/* Doctor Layout with its own pages (modify as needed) */}
        <Route path="/doctor" element={<DoctorLayout />}>
        <Route path="prescription" element={<PrescriptionReader />} />
          <Route path="health-reports" element={<HealthReports />} />
          <Route path="support" element={<Support />} />
          <Route path="medicines" element={<Tracker />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
