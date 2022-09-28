import { createContext, useContext, useState, useEffect } from "react";

interface LoadingProps{
    loading: boolean
    setLoading: (state: boolean) => void
    message: string | undefined
    setMessage: (message: string) => void
}
const LoadingContext = createContext({} as LoadingProps);

function LoadingProvider({ children }: React.PropsWithChildren<{}>){
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if(!loading){ setMessage(undefined); }
    }, [loading])

    return (
        <LoadingContext.Provider value={{ loading, setLoading, message, setMessage }}>{children}</LoadingContext.Provider>
    );
}

export { LoadingContext, LoadingProvider }
export const useLoading = () => useContext(LoadingContext);