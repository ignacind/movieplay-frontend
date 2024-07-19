import { useState, useEffect, useCallback } from "react";
import movieService from "../services/moviesService";
import useInternetConnection from "./useInternetConnection";

const useFetchMovieDetails = (movieId, userId) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMovieData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await movieService.getMovieById(movieId, userId);
            setMovie(response);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }  finally {
            setLoading(false);
        }
    }, [movieId]);


    useEffect(() => {
        fetchMovieData();
    }, [movieId, fetchMovieData]);
    

    useInternetConnection(fetchMovieData);


    return { movie, loading };
}

export default useFetchMovieDetails;