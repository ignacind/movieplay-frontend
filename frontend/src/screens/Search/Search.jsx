import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { View } from 'react-native';
import SearchIconWhite from '../../assets/images/search_btn.svg';
import FilterIcon from '../../assets/images/filter_btn.svg';

import SearchHeader from './Search.header';
import SearchMovieCard from './Search.movieCard';
import movieService from '../../services/moviesService';
import LoadingPage from '../../components/LoadingPage';
import FilterPopup from './Search.filterPopUp';

import { styles } from './Search.styles';
import { useSelector } from 'react-redux';

export default function Search({ navigation }) {
  const [searchInput, setSearchInput] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [orderByMethod, setOrderByMethod] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedOrderASC, setSelectedOrderASC] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const userId = useSelector(state => state.user.userId)

  const amountOfMoviesToGet = 8;
  const inputRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchHeader
          inputRef={inputRef}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setIsFilterPopupVisible(!isFilterPopupVisible)}>
          <FilterIcon width={25} height={25} />
        </TouchableOpacity>
      ),
    });
  }, [searchInput, isFilterPopupVisible]);

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
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setHasMore(false);
    }
    setIsLoading(false);
  };

  const applyFilters = () => {
    handleSearch(true);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      handleSearch(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && page === 0 ? (
        <LoadingPage />
      ) : movieData.length > 0 ? (
        <FlatList
          data={movieData}
          renderItem={({ item }) => <SearchMovieCard movie={item} />}
          keyExtractor={item => item.movieId}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={amountOfMoviesToGet}
          windowSize={5}
          removeClippedSubviews={true}
          ListFooterComponent={isLoading && hasMore ? <LoadingPage size='small' /> : null}
        />
      ) : searchAttempted ? (
        <RenderNoResults textSearched={searchInput} />
      ) : (
        <RenderNoSearch />
      )}

      <FilterPopup
        visible={isFilterPopupVisible}
        onClose={() => setIsFilterPopupVisible(false)}
        onApply={applyFilters}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        orderByMethod={orderByMethod}
        setOrderByMethod={setOrderByMethod}
        selectedOrderASC={selectedOrderASC}
        setSelectedOrderASC={setSelectedOrderASC}
      />
    </View>
  );
}

const RenderNoSearch = () => {
  return (
    <View style={styles.noSearchContainer}>
      <Text style={styles.noSearchText}>Hoy estoy pensando en buscar...</Text>
      <SearchIconWhite width={130} height={130} />
    </View>
  );
};

const RenderNoResults = ({ textSearched }) => {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>
        No se encontraron resultados para "{`${textSearched}`}".
      </Text>
    </View>
  );
};
