import {AxiosError} from "axios";

export interface IHeader {
    loading: boolean,
    error: AxiosError<any, any> | null,
}

export interface IAirportData {
    city: string;
    country: string;
    elevation_ft: string;
    iata: string;
    icao: string;
    latitude: string;
    longitude: string;
    name: string;
    region: string;
    timezone: string;
}

export interface IUseAirportData {
    airportsData: IAirportData[],
    results: IAirportData[],
    setResults: (results: IAirportData[]) => void,
}