import axios from "axios";
import {makeUseAxios} from 'axios-hooks'
import {API_URL, API_KEY, API_HOST} from "./constants";

export const useAxios = makeUseAxios({
    axios: axios.create({
        baseURL: API_URL,
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
        }
    })
})