import React, {useContext, useCallback} from 'react';
import styles from './index.module.css'
import {AirportContext} from '../../utils/context';
import SearchIcon from '../../images/search-icon.png'
import ClearIcon from '../../images/clear.png'
import { useForm } from "../../hooks/useForm";
import { IUseForm } from "../../utils/interfaces";

type TAirportData = {
    city: string,
    country: string,
    elevation_ft: string,
    iata: string,
    icao: string,
    latitude: string,
    longitude: string,
    name: string,
    region: string,
    timezone: string,
}

export function Table() {
    const airportsData: TAirportData[] = useContext(AirportContext);
    const { formValues, setFormValues, handleChange }: IUseForm = useForm({ searchText: ''});

    const isShowClearButton = useCallback(
        () => {
            return formValues.searchText === '';
        }, [formValues.searchText]
    );

    const handleClick = () => {
        setFormValues({...formValues, searchText: ''});
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <span className={styles.left}><img src={SearchIcon} alt="Search Icon" className={styles.searchIcon} /></span>
                {
                    !isShowClearButton()
                    && <span className={styles.right}>
                        <img
                            src={ClearIcon}
                            alt="Clear Icon"
                            className={styles.searchIcon}
                            onClick={handleClick}
                        />
                    </span>
                }
                <input
                    name="searchText"
                    type="text"
                    className={styles.searchInput}
                    placeholder="Please enter airport name or code"
                    value={ formValues.searchText }
                    onChange={ e => handleChange(e) }
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name (Code)</th>
                        <th>Lat & Lng</th>
                    </tr>
                </thead>
                <tbody>
                    {airportsData.length === 0 && <tr style={{ alignItems: "center" }}>
                        <td >Airports data not found</td>
                    </tr>}
                    {airportsData.map(airportData => (
                        <tr key={airportData.icao}>
                            <td>{airportData.name} ({airportData.icao})</td>
                            <td>{airportData.latitude}, {airportData.longitude}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}