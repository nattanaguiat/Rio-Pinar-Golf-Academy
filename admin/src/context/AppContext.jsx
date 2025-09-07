import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = ({children} ) => {


    const currency = "$"

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)


        let age = today.getFullYear() - birthDate.getFullYear()
        return age
     }

     const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
    
      
    
      const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return (
          dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
        );
      };

    return (
        <AppContext.Provider value={{calculateAge, slotDateFormat, currency}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider