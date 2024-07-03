import { useState, useCallback, useEffect } from "react";
import useRetryCustomFetch from "./useRetryCustomFetch";
import movieService from "../services/moviesService";

const useFetchJustReleased = (userId) => {
    const [loading, setLoading] = useState(true);
    const [moviesReleasedList, setMoviesReleasedList] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);


    const fetchJustReleased = useCallback(async () => {
        if (!hasMore) return;
        console.log("fetching page home", page);
        try {
            const response = await movieService.getJustReleased(page, 10);
            if (response && response.movies) {
                setMoviesReleasedList((prev) => [...prev, ...response.movies]);
                setHasMore(response.movies.length > 0);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
    }, [page, hasMore]);


    const handleLoadMore = () => {
        console.log("ENTER handleLoadMore");
        if (hasMore && !loading) {
            fetchJustReleased();
        }
    };

    return {  moviesReleasedList, loading, setPage, hasMore, handleLoadMore, fetchJustReleased };
}

export default useFetchJustReleased;