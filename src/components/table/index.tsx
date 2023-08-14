import React, {useContext, useCallback, useEffect, useState} from 'react';
import styles from './index.module.css'
import {AirportContext} from '../../utils/context';
import SearchIcon from '../../images/search-icon.png'
import ClearIcon from '../../images/clear.png'
import useForm from '../../hooks/useForm';
import useDebounce from '../../hooks/useDebounce';
import {IUseForm} from '../../utils/interfaces';
import {searchAirport} from '../../utils/api';

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
    const [results, setResults] = useState(airportsData);

    const [isSearching, setIsSearching] = useState(false);

    const {formValues, setFormValues, handleChange}: IUseForm = useForm({ searchText: ''});
    const debouncedSearchTerm = useDebounce(formValues.searchText, 500);

    const handleClickClear = useCallback(() => {
        setFormValues({...formValues, searchText: ''});
    }, []);

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setResults([]);
                setIsSearching(true);

                const searchResults = airportsData.filter(airportData => (
                    airportData.name.toLowerCase().indexOf(debouncedSearchTerm.toLowerCase()) !== -1
                ))

                if (searchResults.length > 0) {
                    setResults(searchResults);

                    return;
                }

                searchAirport(debouncedSearchTerm).then((results: any) => {
                    setIsSearching(false);
                    setResults(results);
                });
            } else {
                setResults(airportsData);
            }
        },
        [debouncedSearchTerm]
    );

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <span className={styles.left}><img src={SearchIcon} alt="Search Icon" className={styles.searchIcon} /></span>
                {
                    debouncedSearchTerm.length > 0
                    && <span className={styles.right}>
                        <img
                            src={ClearIcon}
                            alt="Clear Icon"
                            className={styles.searchIcon}
                            onClick={handleClickClear}
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
                    {
                        results.length === 0 &&
                        <tr style={{ alignItems: "center" }}>
                            <td>
                                {isSearching ? "Searching..." : "Airports data not found"}
                            </td>
                        </tr>
                    }
                    {results.map(airportData => (
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