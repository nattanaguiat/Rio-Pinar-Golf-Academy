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

function App() {
  return (
    <div className="mx-4 sm:mx[10%]">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/booking/:coachID" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
    </div>
  );
}

export default App;
