import { useState, useCallback, useEffect } from "react";
import useRetryCustomFetch from "./useRetryCustomFetch";
import movieService from "../services/moviesService";

const useFetchJustReleased = (userId) => {
    const [loading, setLoading] = useState(true);
    const [moviesReleasedList, setMoviesReleasedList] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);


    const fetchJustReleased = useCallback(async () => {
        if (isFetchingMore || !hasMore) return;
        setIsFetchingMore(true);
        console.log("fetching page", page)
        try {
            const response = await movieService.getJustReleased(page, 10);
            if (response && response.movies) {
                setMoviesReleasedList((prev) => [...prev, ...response.movies]);
                setHasMore(response.movies.length > 0);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
            setIsFetchingMore(false);
        } catch (error) {
            console.log(error);
            setIsFetchingMore(false);
        }
    }, [page, isFetchingMore, hasMore]);



    const handleLoadMore = () => {
        if (hasMore && !loading && !isFetchingMore) {
            fetchJustReleased();
        }
    };

    return {  moviesReleasedList, loading, setPage, isFetchingMore, hasMore, handleLoadMore, fetchJustReleased };
}

export default useFetchJustReleased;