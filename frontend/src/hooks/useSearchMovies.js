import { useState } from 'react';
import movieService from '../services/moviesService';
import { changeStateFavorite } from '../redux/slices/tempFavoritesSlice';
import { useDispatch, useSelector } from 'react-redux';

const useSearchMovies = (searchInput, userId, orderByMethod, selectedGenres, selectedOrderASC) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.tempFavorites.favorites);

  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [page, setPage] = useState(0);

  const amountOfMoviesToGet = 8;

  const filterGenres = (movies, selectedGenres) => {
    if (selectedGenres.length === 0) {
      return movies;
    }
    return movies.filter(movie =>
      movie.genres.some(genre => selectedGenres.includes(genre.name))
    );
  };

  const handleSearch = async (newSearch = true) => {
    let textInputValue = searchInput;
    if (textInputValue === '' || textInputValue.trim().length === 0) {
      return;
    }

    const orderBy = orderByMethod || 'DATE';

    setIsLoading(true);
    setSearchAttempted(true);
    try {
      const response = await movieService.searchMovies(
        textInputValue.trimStart(),
        selectedOrderASC ? 'ASC' : 'DESC',
        orderBy,
        newSearch ? 0 : page,
        amountOfMoviesToGet,
        userId
      );

      if (response && response.movies) {
        const filteredMovies = filterGenres(response.movies, selectedGenres);
        setMovieData(newSearch ? filteredMovies : [...movieData, ...filteredMovies]);
        setPage(newSearch ? 1 : page + 1);
        setHasMore(response.movies.length > 0);
        addResponseMoviesToTempFavorites(filteredMovies);
    

      } else {
        setHasMore(false);
      }
      


    } catch (error) {
      console.error("Error fetching movies: ", error);
      setHasMore(false);
    }
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      handleSearch(false);
    }
  };

  const addResponseMoviesToTempFavorites =  (movies) => {
      movies.forEach(movie => {
        dispatch(changeStateFavorite({ movieId: movie.movieId, isFavorite: movie.isFavorite }));
      });
  };

  return { movieData, isLoading, hasMore, searchAttempted, page, handleSearch, handleLoadMore };
};

export default useSearchMovies;
