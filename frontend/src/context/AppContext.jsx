import { createContext } from "react";
import { coaches } from "../assets/assets";
import axios from 'axios'
import { useState, useEffect } from "react";
import {toast} from 'react-toastify'

export const AppContext = createContext();


const AppContextProvider = ({ children }) => {
  
  const [coaches, setCoaches] = useState([]);

  const currencySymbol = "$";

  const getCoachesData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/api/coaches/list");
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

  useEffect(() => {
    getCoachesData();
  }, []); 

  return (
    <AppContext.Provider value={{ coaches, currencySymbol }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
