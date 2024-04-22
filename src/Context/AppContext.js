import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [isLoadingLine, setIsLoadingLine] = useState(false);

    return (
        <AppContext.Provider value={{ isLoadingLine, setIsLoadingLine }}>
            {children}
        </AppContext.Provider>
    )
}