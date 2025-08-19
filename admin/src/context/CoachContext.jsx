import { createContext } from "react";

export const CoachContext = createContext()

const CoachContextProvider = ({children} ) => {

    return (
        <CoachContext.Provider value={{}}>
            {children}
        </CoachContext.Provider>
    )
}

export default CoachContextProvider