import { useState, useCallback, useEffect } from "react";
import userService from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { changeStateFavorite } from "../redux/slices/tempFavoritesSlice";

const useFetchFavorites = (userId) => {
    const dispatch = useDispatch();
    const tempFavorites = useSelector(state => state.tempFavorites.favorites);

    const [movieFavorites, setMovieFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const fetchFavorites = async () => {
        setIsLoading(true);
        try {
            const response = await userService.getUserFavorites(userId, page, 8);
            if (response && response.movies) {
                setMovieFavorites([...movieFavorites, ...response.movies]);
                setPage(page + 1);
                setHasMore(response.movies.length > 0);
                for (let movie of response.movies) {
                    dispatch(changeStateFavorite({ movieId: movie.movieId, isFavorite: true }));
                }
            } else {
                setHasMore(false);
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

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchFavorites();
        }
    };

    return { movieFavorites, isLoading, hasMore, handleLoadMore, fetchFavorites };

}

export default useFetchFavorites;
  