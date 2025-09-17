import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Coaches from "./pages/Coaches";
import MyBookings from "./pages/MyBookings";
import MyProfile from "./pages/MyProfile";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import RioJuniorGA from "./pages/JuniorAcademy";
import JuniorAcademy from "./pages/JuniorAcademy";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="mx-4 sm:mx[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/booking/:coachId" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/junior-academy" element={<JuniorAcademy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
