import { useState, useCallback, useEffect } from "react";
import useRetryCustomFetch from "./useRetryCustomFetch";
import movieService from "../services/moviesService";

const useFetchJustReleased = (userId) => {
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


    const handleLoadMore = () => {
        if (hasMore && !loading) {
            fetchJustReleased();
        }
    };

    return {  moviesReleasedList, loading, hasMore, handleLoadMore, fetchJustReleased };
}

export default useFetchJustReleased;