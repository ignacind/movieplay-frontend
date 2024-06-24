import { useState } from "react";
import userService from "../services/userService";

const useHandleFavorites = (userId) => {
    const [loading, setLoading] = useState(false);

    const addMovieToFavorites = async (movieId) => {
        setLoading(true);
        try {
            await userService.addMovieToFavorites(userId, movieId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const removeMovieFromFavorites = async (movieId) => {
        setLoading(true);
        try {
            await userService.removeMovieFromFavorites(userId, movieId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { addMovieToFavorites, removeMovieFromFavorites, loading };
};

export default useHandleFavorites;
