import { useState } from "react";
import userService from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { changeStateFavorite } from "../redux/slices/favoritesSlice";
import { Alert } from "react-native";

const FAVORITES_LIMIT = 25;

const useHandleFavorites = (userId) => {
    const [loading, setLoading] = useState(false);
    const amountFavorites = useSelector(state => state.favorites.amountFavorites);
    const dispatch = useDispatch();

    const updateFavorite = async (movie, isFavorite) => {
        setLoading(true);
        try {
            if (isFavorite) {
                if (amountFavorites === FAVORITES_LIMIT) {
                    Alert.alert("Tienes demasiados favoritos...")
                    return false;
                } 

                await userService.addMovieToFavorites(userId, movie.movieId);
                
            } else {
                await userService.removeMovieFromFavorites(userId, movie.movieId);
            }

            dispatch(changeStateFavorite({ movie }));
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
