// src/components/RetryFetch.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const useRetryFetch = ({ retryCount, customFetchData }) => {
    
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        if (retryCount > 0 && retryCount < 10) {
            const retryTimeout = setTimeout(() => {
                customFetchData();
            }, 1000 * seconds); // Retry after 5 seconds
    
            return () => clearTimeout(retryTimeout);
        }
        
    }, [retryCount, customFetchData]);
}

export default useRetryFetch;
