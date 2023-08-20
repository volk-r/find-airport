import styles from "./header.module.css";
import logo from "../../logo.svg";
import React from "react";
import {IHeader} from "../../utils/interfaces";

export const Header = ({loading, error}: IHeader) => {
    return (
        <>
            <header className={styles.AppHeader}>
                <h1>Find your airport</h1>
                {(loading || error) && <img src={logo} className={styles.AppLogo} alt="logo"/>}
                {loading && <p>Loading...</p>}
                {error && <p>Error!</p>}
            </header>
        </>
    );
}
