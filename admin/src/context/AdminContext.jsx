import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = ({children} ) => {

    const [atoken, setAToken] = useState('')
    
        const backendUrl = import.meta.env.VITE_BACKEND_URL

    return (
        <AdminContext.Provider value={{atoken, setAToken, backendUrl}}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider