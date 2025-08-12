import { createContext } from "react";
import { coaches } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  
return  (


  <AppContext.Provider value={{coaches}}>
    {children}
  </AppContext.Provider>


)

};

export default AppContextProvider
