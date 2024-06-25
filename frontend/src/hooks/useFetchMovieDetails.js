import { useState, useEffect, useCallback } from "react";
import useRetryCustomFetch from "./useRetryCustomFetch";
import movieService from "../services/moviesService";


const useFetchMovieDetails = (movieId, userId) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const fetchMovieData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await movieService.getMovieById(movieId, userId);
            setMovie(response);
            setLoading(false);
            setRetryCount(0);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setRetryCount((prev) => prev + 1);
        }
    }, [movieId]);


    useEffect(() => {
        fetchMovieData();
    }, [movieId, fetchMovieData]);
    

    useRetryCustomFetch({ retryCount, customFetchData: fetchMovieData });


    return { movie, loading };
}

export default useFetchMovieDetails;