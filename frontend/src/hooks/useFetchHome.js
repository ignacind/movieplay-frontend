import { useState, useCallback, useEffect } from "react";
import movieService from "../services/moviesService";
import useInternetConnection from "./useInternetConnection";

const useFetchHome = (userId) => {
    const [moviesMap, setMoviesMap] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchHomeData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await movieService.getHomeData();
            setMoviesMap(response);
            setLoading(false);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    

    useEffect(() => {
        fetchHomeData();
    }, [userId, fetchHomeData]);

    useInternetConnection(fetchHomeData);

    return { moviesMap, loading };
}

export default useFetchHome;
