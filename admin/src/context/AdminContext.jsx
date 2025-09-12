import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [coaches, setCoaches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllCoaches = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-coaches",
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        setCoaches(data.coaches);
        console.log(data.coaches);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const changeAvailability = async (coachId) => {
  //   try {
  //     const {data} = await axios.post(backendUrl + '/api/admin/change-availability', coachId, {headaers: {aToken}})
  //     if (datasuccess) {
  //       toast.success(data.message)
  //       getAllCoaches()
  //     } else {
  //       toast.error(data.message)
  //     }
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/bookings", {
        headers: { aToken },
      });
      if (data.success) {
        setBookings(data.bookings);
        console.log(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-booking",
        { bookingId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        backendUrl,
        getAllCoaches,
        coaches,
        setCoaches,
        bookings,
        setBookings,
        getAllBookings,
        cancelBooking,
        dashData,
        getDashData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
