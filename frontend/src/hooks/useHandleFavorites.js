import { useState } from "react";
import userService from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { changeStateFavorite } from "../redux/slices/favoritesSlice";
import { useModal } from '../context/ModalContext';


const useHandleFavorites = (userId) => {
    const [loading, setLoading] = useState(false);
    const {amountFavorites, FAVORITES_LIMIT} = useSelector(state => state.favorites);
    
    const dispatch = useDispatch();
    const { showModal } = useModal();

    const updateFavorite = async (movie, isFavorite) => {
        setLoading(true);

        try {
            if (isFavorite) {
                if (amountFavorites === FAVORITES_LIMIT) {
                    showModal("Advertencia", "Has superado la cantidad máxima de favoritos.");
                    setLoading(false);
                    return false;
                }

                await userService.addMovieToFavorites(userId, movie.movieId);
            } else {
                await userService.removeMovieFromFavorites(userId, movie.movieId);
            }

            dispatch(changeStateFavorite({ movie, localFavorite: isFavorite }));
            setLoading(false);
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
