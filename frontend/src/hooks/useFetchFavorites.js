import { useState, useCallback, useEffect } from "react";
import userService from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { addInitialResponseListToFavorites } from "../redux/slices/favoritesSlice";

const useFetchFavorites = (userId) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites)
    const [movieFavorites, setMovieFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFavorites = async () => {
        setIsLoading(true);

        try {
            const response = await userService.getUserFavorites(userId);
            if (response && response.movies) {
                setMovieFavorites([...movieFavorites, ...response.movies]);
                dispatch(addInitialResponseListToFavorites(movieFavorites))
            } 
        } catch (error) {
            console.error("Error fetching favorites", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFavorites();
    }, []);



    return { isLoading, fetchFavorites };

}

export default useFetchFavorites;
  