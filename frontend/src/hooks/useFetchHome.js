import { useState, useCallback, useEffect } from "react";
import useRetryCustomFetch from "./useRetryCustomFetch";
import movieService from "../services/moviesService";

const useFetchHome = (userId) => {
    const [moviesMap, setMoviesMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const fetchHomeData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await movieService.getHomeData();
            setMoviesMap(response);
            setLoading(false);
            setRetryCount(0);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setRetryCount((prev) => prev + 1);
        }
    }, [userId]);

    

    useEffect(() => {
        fetchHomeData();
    }, [userId, fetchHomeData]);


    useRetryCustomFetch({ retryCount, customFetchData: fetchHomeData });

    return { moviesMap, loading };
}

export default useFetchHome;
