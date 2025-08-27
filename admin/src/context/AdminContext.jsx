import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [coaches, setCoaches] = useState([]);

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
        console.log(data.coaches)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AdminContext.Provider value={{ aToken, setAToken, backendUrl, getAllCoaches, coaches, setCoaches }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
