import {useContext, useState} from 'react';
import {AirportContext} from "../utils/context";
import {IAirportData, IUseAirportData} from "../utils/interfaces";

export default function useAirportData(): IUseAirportData {
    const airportsData: IAirportData[] = useContext(AirportContext);
    const [results, setResults] = useState(airportsData);

    return {
        airportsData,
        results,
        setResults,
    };
}