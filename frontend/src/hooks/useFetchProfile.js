// src/hooks/useFetchProfile.js
import { useState, useEffect, useCallback } from 'react';
import userService from '../services/userService';
import useInternetConnection from './useInternetConnection';

const useFetchProfile = (userId, isAuthenticated) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const userData = await userService.getUserData(userId);
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated, userId, fetchUserData]);

    useInternetConnection(fetchUserData);

    return { user, loading };
};

export default useFetchProfile;
