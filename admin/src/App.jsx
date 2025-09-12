import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllSessions from "./pages/Admin/AllBookings";
import AddCoach from "./pages/Admin/AddCoach";
import CoachesList from "./pages/Admin/CoachesList";
import { CoachContext } from "./context/CoachContext";
import CoachDashboard from "./pages/Coach/CoachDashboard";
import CoachBookings from "./pages/Coach/CoachBookings";
import CoachProfile from "./pages/Coach/CoachProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { cToken } = useContext(CoachContext);

  return aToken || cToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-bookings" element={<AllSessions />} />
          <Route path="/add-coach" element={<AddCoach />} />
          <Route path="/coaches-list" element={<CoachesList />} />

          {/* Coach Routes */}
          <Route path="/coach-dashboard" element={<CoachDashboard />} />
          <Route path="/coach-bookings" element={<CoachBookings />} />
          <Route path="/coach-profile" element={<CoachProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
