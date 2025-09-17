import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = ""; // Ya no necesitas esta variable

  const [coaches, setCoaches] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCoachesData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/coaches/list");
      if (data.success) {
        setCoaches(data.coaches);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); 
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get("/api/user/profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCoachesData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        coaches,
        getCoachesData,
        backendUrl,
        currencySymbol,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;