import React, {useEffect, useState} from 'react';
import styles from './index.module.css'
import SearchIcon from '../../images/search-icon.png'
import ClearIcon from '../../images/clear.png'
import useDebounce from '../../hooks/useDebounce';
import {searchAirport} from '../../utils/api';
import useAirportData from "../../hooks/useAirportData";

export function Table() {
    const {airportsData, results, setResults} = useAirportData();

    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState('');
    const debouncedSearchTerm = useDebounce(searchText, 500);

    const handleClickClear = () => {
        setSearchText('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setSearchText(value);
    };

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
        [debouncedSearchTerm, airportsData, setResults]
    );

    useEffect(
        () => {
            if (searchText === '') {
                setResults(airportsData);
            }
        },
        [results, airportsData, searchText, setResults]
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
                    value={ searchText }
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