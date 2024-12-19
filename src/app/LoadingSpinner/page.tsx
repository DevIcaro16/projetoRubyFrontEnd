import React from 'react';
import styles from "./page.module.scss";


const LoadingSpinner = () => {
    return (
        <div className={styles.loadingSpinner}>
            <h1 className={styles.h1}>Carregando...</h1>
            <div className={styles.spinner}>
            </div>
        </div>
    );
};

export default LoadingSpinner;
