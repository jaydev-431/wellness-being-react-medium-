import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import DesignThinking from "./components/DesignThinking";
import SolutionSection from "./components/SolutionSection";
import PathSection from "./components/PathSection";
import EmergencySection from "./components/EmergencySection";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProblemSection />
              <DesignThinking />
              <SolutionSection />
              <PathSection />
              <EmergencySection />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ROLE DASHBOARDS */}
        <Route path="/victim" element={<h1>Victim Dashboard</h1>} />
        <Route path="/counselor" element={<h1>Counselor Dashboard</h1>} />
        <Route path="/legal" element={<h1>Legal Advisor Dashboard</h1>} />
      </Routes>
    </>
  );
}
