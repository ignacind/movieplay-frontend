import { useState, useCallback, useEffect } from "react";
import movieService from "../services/moviesService";
import useInternetConnection from "./useInternetConnection";

const useFetchJustReleased = () => {
    const [loading, setLoading] = useState(true);
    const [moviesReleasedList, setMoviesReleasedList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const fetchJustReleased = useCallback(async () => {
        if (!hasMore) return;
        try {
            setLoading(true);
            const response = await movieService.getJustReleased(page, 8);
            if (response && response.movies) {
                setMoviesReleasedList((prev) => [...prev, ...response.movies]);
                setHasMore(response.movies.length > 0);
                setPage((prevPage) => prevPage + 1 )
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [page, hasMore]);

    useInternetConnection(fetchJustReleased, hasMore);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            fetchJustReleased();
        } 
    };

    return {  moviesReleasedList, loading, hasMore, handleLoadMore, fetchJustReleased };
}

export default useFetchJustReleased;