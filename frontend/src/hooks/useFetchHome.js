import { useState, useCallback, useEffect } from "react";
import useRetryCustomFetch from "./useRetryCustomFetch";
import movieService from "../services/moviesService";

const useFetchHome = (userId) => {
    const [moviesMap, setMoviesMap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [justReleased, setJustReleased] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const fetchHomeData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await movieService.getHomeData();
            setMoviesMap(response);
            setLoading(false);
            setRetryCount(0);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setRetryCount((prev) => prev + 1);
        }
    }, [userId]);

    const fetchJustReleased = (async () => {
        setIsFetchingMore(true);
        try {
            const response = await movieService.getJustReleased(page, 10); // Assuming 10 movies per page
            if (response && response.movies) {
                setJustReleased((prev) => [...prev, ...response.movies]);
                setHasMore(response.movies.length > 0);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
            setIsFetchingMore(false);
        } catch (error) {
            console.log(error);
            setIsFetchingMore(false);
        }
    }, [page]);

    useEffect(() => {
        fetchHomeData();
    }, [userId, fetchHomeData]);

    useEffect(() => {
        if (page > 0) {
            fetchJustReleased();
        }
    }, [page, fetchJustReleased]);

    useRetryCustomFetch({ retryCount, customFetchData: fetchHomeData });

    return { moviesMap, loading, justReleased, setPage, isFetchingMore, hasMore };
}

export default useFetchHome;
