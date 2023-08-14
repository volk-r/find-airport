import axios from "axios";
import {makeUseAxios} from 'axios-hooks'
import {API_URL, API_KEY, API_HOST, AIR_CODE_LENGTH} from "./constants";

const airportClient = axios.create({
    baseURL: API_URL,
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
    }
});

export const useAxios = makeUseAxios({
    axios: airportClient
})

export async function searchAirport(searchText: string) {
    return [...await searchAirportByName(searchText), ...await searchAirportByCode(searchText)];
}

async function searchAirportByName(name: string) {
    try {
        const response = await airportClient.get('', {
            params: {
                name: name,
                country: "US",
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }

    return null;
}

async function searchAirportByCode(code: string) {
    if (code.length !== AIR_CODE_LENGTH) {
        console.error("iata parameter must contain exactly 3 characters.");

        return [];
    }

    try {
        const response = await airportClient.get('', {
            params: {
                iata: code,
                country: "US",
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }

    return [];
}