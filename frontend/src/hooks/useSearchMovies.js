import { useState } from "react";
import movieService from "../services/moviesService";

const useSearchMovies = (
  searchInput,
  userId,
  orderByMethod,
  selectedGenres,
  selectedOrderASC
) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [page, setPage] = useState(0);
  const [previousInput, setPreviousInput] = useState("");

  const AMOUNT_MOVIES_TO_GET = 8;


  const handleSearch = async (newSearch = false) => {
    let textInputValue = searchInput;
    if (textInputValue === "" || textInputValue.trim().length === 0) {
      return;
    }

    setPreviousInput(searchInput);

    const orderBy = orderByMethod || "releaseDate";

    setIsLoading(true);
    setFirstSearch(newSearch);
    setSearchAttempted(true);
    console.log("searching page: ", page)
    try {
      const response = await movieService.searchMovies(
        textInputValue.trimStart(),
        selectedOrderASC ? "ASC" : "DESC",
        orderBy,
        newSearch ? 0 : page,
        AMOUNT_MOVIES_TO_GET,
        userId,
        selectedGenres.map(genre => `&genreName=${genre}`).join('')
      );

      if (response && response.movies) {
        setMovieData(newSearch ? response.movies : [...movieData, ...response.movies]);
        setPage(newSearch ? 1 : page + 1);
        setHasMore(response.movies.length === AMOUNT_MOVIES_TO_GET);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setHasMore(false);
    } finally {
          setIsLoading(false);
    }

    setFirstSearch(false);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      handleSearch(false);
    }
  };

  return {
    movieData,
    isLoading,
    firstSearch,
    hasMore,
    searchAttempted,
    page,
    previousInput,
    handleSearch,
    handleLoadMore,
  };
};

export default useSearchMovies;
