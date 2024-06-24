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
            console.log("THIS IS THE RESPONSE", response)
            setMovie(response);
            setLoading(false);
            setRetryCount(0);
        } catch (error) {
            console.log(error);
            console.log("WE HAD A ERROR")
            setLoading(false);
            setRetryCount((prev) => prev + 1);
        }
    }, [movieId]);

    useEffect(() => {
        fetchMovieData();
    }, [movieId, fetchMovieData]);

    useRetryCustomFetch({ retryCount, customFetchData: fetchMovieData });

    console.log("THIS IS MOVIE FROM FETCH", movie)

    return { movie, loading };
}

export default useFetchMovieDetails;