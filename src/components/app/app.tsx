import React from 'react';
import styles from './app.module.css';
import {Table} from "../table";
import {AirportDataProvider} from "../../context-providers/airport-data";

function App() {
    return (
        <div className={styles.App}>
            <AirportDataProvider>
                <Table />
            </AirportDataProvider>
        </div>
    );
}

export default App;
