import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [coaches, setCoaches] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [userData, setUserData] = useState(false);

  const getCoachesData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/coaches/list");
      if (data.success) {
        setCoaches(data.coaches);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/profile", {
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
        coaches, getCoachesData,
        backendUrl,
        currencySymbol,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
