import { useState, useCallback, useEffect } from "react";
import userService from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { addInitialResponseListToFavorites } from "../redux/slices/favoritesSlice";

const useFetchFavorites = () => {
    const dispatch = useDispatch();
    const FAVORITES_LIMIT = useSelector(state => state.favorites.FAVORITES_LIMIT)
    const [isLoading, setIsLoading] = useState(false);

    const fetchFavorites = async (userId) => {
        setIsLoading(true);

        try {
            const response = await userService.getUserFavorites(userId, 0, FAVORITES_LIMIT);
            
            if (response && response.movies) {
                dispatch(addInitialResponseListToFavorites(response.movies))
            } 
        } catch (error) {
            console.error("Error fetching favorites", error);
        } finally {
            setIsLoading(false);
        }

        
    }


    return { isLoading, fetchFavorites };

}

export default useFetchFavorites;
  