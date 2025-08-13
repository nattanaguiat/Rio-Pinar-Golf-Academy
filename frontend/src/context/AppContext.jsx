import { createContext } from "react";
import { coaches } from "../assets/assets";

export const AppContext = createContext();

const currencySymbol = '$'

const AppContextProvider = ({children}) => {
  
return  (


  <AppContext.Provider value={{coaches, currencySymbol}}>
    {children}
  </AppContext.Provider>


)

};

export default AppContextProvider
