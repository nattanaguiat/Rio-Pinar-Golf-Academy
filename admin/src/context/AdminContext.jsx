import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = ({children} ) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    
        const backendUrl = import.meta.env.VITE_BACKEND_URL

    return (
        <AdminContext.Provider value={{aToken, setAToken, backendUrl}}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider