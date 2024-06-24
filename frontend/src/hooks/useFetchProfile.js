// src/hooks/useFetchProfile.js
import { useState, useEffect, useCallback } from 'react';
import userService from '../services/userService';
import useRetryCustomFetch from './useRetryCustomFetch'

const useFetchProfile = (userId, isAuthenticated) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const userData = await userService.getUserData(userId);
            setUser(userData);
            setLoading(false);
            setRetryCount(0);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setRetryCount((prev) => prev + 1);
        }
    }, [userId]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated, userId, fetchUserData]);

    useRetryCustomFetch({ retryCount, customFetchData: fetchUserData });


    return { user, loading };
};

export default useFetchProfile;
