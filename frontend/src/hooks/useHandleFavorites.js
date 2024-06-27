import { useState } from "react";
import userService from "../services/userService";
import { useDispatch } from "react-redux";
import { changeStateFavorite } from "../redux/slices/tempFavoritesSlice";
const useHandleFavorites = (userId) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const updateFavorite = async (movieId, isFavorite) => {
        setLoading(true);
        try {
            if (isFavorite) {
                await userService.addMovieToFavorites(userId, movieId);
            } else {
                await userService.removeMovieFromFavorites(userId, movieId);
            }
            dispatch(changeStateFavorite({ movieId, isFavorite }));
            return true;
        } catch (error) {
            console.error(error);
            setLoading(false);
            return false;
        }
        
    };
    

    return { updateFavorite, loading };
};

export default useHandleFavorites;
