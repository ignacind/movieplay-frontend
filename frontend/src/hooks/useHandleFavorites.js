import { useState } from "react";
import userService from "../services/userService";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/tempFavoritesSlice";
const useHandleFavorites = (userId) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    
    const addMovieToFavorites = async (movieId) => {
        setLoading(true);
        try {
            await userService.addMovieToFavorites(userId, movieId);
            dispatch(addFavorite(movieId));
            return true
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeMovieFromFavorites = async (movieId) => {
        setLoading(true);
        try {
            await userService.removeMovieFromFavorites(userId, movieId);
            dispatch(removeFavorite(movieId));
            return true
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { addMovieToFavorites, removeMovieFromFavorites, loading };
};

export default useHandleFavorites;
