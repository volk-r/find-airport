import React from 'react';
import logo from '../../logo.svg';
import styles from './app.module.css';
import {useAxios} from '../../utils/api'
import {AirportContext} from "../../utils/context";
import {Table} from "../table";

function App() {
    const [{ data, loading, error }] = useAxios({
        params: {
            "country": "US"
        }
    })

    return (
        <div className={styles.App}>
            <header className={styles.AppHeader}>
                <h1>Find your airport</h1>
                {!data && <img src={logo} className={styles.AppLogo} alt="logo"/>}
                {loading && <p>Loading...</p>}
                {error && <p>Error!</p>}
            </header>
            {data &&
            <AirportContext.Provider value={data}>
                <Table />
            </AirportContext.Provider>}
        </div>
    );
}

export default App;
