import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import PathSection from "./components/PathSection";
import EmergencySection from "./components/EmergencySection";
import Footer from "./components/Footer";
import QuickExit from "./components/QuickExit";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VictimDashboard from "./components/VictimDashboard";
import CounselorDashboard from "./components/CounselorDashboard";
import LegalDashboard from "./components/LegalDashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <QuickExit />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProblemSection />
              <SolutionSection />
              <PathSection />
              <EmergencySection />
              <Footer />
            </>
          }
        />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ROLE DASHBOARDS */}
        <Route path="/victim" element={<VictimDashboard />} />
        <Route path="/counselor" element={<CounselorDashboard />} />
        <Route path="/legal" element={<LegalDashboard />} />
      </Routes>
    </>
  );
}