import React, {createContext, FC} from "react";
import {useAxios} from "../utils/api";
import {Header} from "../components/header";

export const AirportContext = createContext([]);

export const AirportDataProvider: FC<any> = ({ children }) => {
    const [{ data, loading, error }] = useAxios({
        params: {
            "country": "US"
        }
    })

    return (
        <>
            <Header loading={loading} error={error} />
            {data &&
            <AirportContext.Provider value={data}>
                {children}
            </AirportContext.Provider>}
        </>
    );
}