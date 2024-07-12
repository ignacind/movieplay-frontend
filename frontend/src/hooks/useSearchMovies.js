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

  const filterGenres = (movies, selectedGenres) => {
    if (selectedGenres.length === 0) {
      return movies;
    }
    return movies.filter((movie) =>
      movie.genres.some((genre) => selectedGenres.includes(genre.name))
    );
  };

  const handleSearch = async (newSearch = false) => {
    let textInputValue = searchInput;
    if (textInputValue === "" || textInputValue.trim().length === 0) {
      return;
    }

    setPreviousInput(searchInput);

    const orderBy = orderByMethod || "DATE";
    setPage(newSearch ? 0 : page);
    let currentPage = newSearch ? 0 : page;
    setIsLoading(true);
    setFirstSearch(newSearch);
    setSearchAttempted(true);
    console.log("searching page: ", currentPage)
    try {
      const response = await movieService.searchMovies(
        textInputValue.trimStart(),
        selectedOrderASC ? "ASC" : "DESC",
        orderBy,
        newSearch ? 0 : currentPage,
        AMOUNT_MOVIES_TO_GET,
        userId
      );
      console.log("amount of movies: ", response.movies ?  response.movies.length : null)
      if (response && response.movies) {
        const filteredMovies = filterGenres(response.movies, selectedGenres);
        setMovieData(
          newSearch ? filteredMovies : [...movieData, ...filteredMovies]
        );
        setPage(currentPage + 1);
        setHasMore(response.movies.length > 0);
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
    if (hasMore) {
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
