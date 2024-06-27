import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { View } from 'react-native';
import FilterIcon from '../../assets/images/filter_btn.svg';

import SearchHeader from './Search.header';
import SearchMovieCard from './Search.movieCard';
import LoadingPage from '../../components/LoadingPage';
import FilterPopup from './Search.filterPopUp';

import { styles } from './Search.styles';
import { useSelector } from 'react-redux';

import useSearchMovies from '../../hooks/useSearchMovies';
import { RenderNoResults, RenderNoSearch } from './Search.noRenders';

export default function Search({ navigation }) {
  const [searchInput, setSearchInput] = useState('');
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [orderByMethod, setOrderByMethod] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedOrderASC, setSelectedOrderASC] = useState(true);
  const amountOfMoviesToGet = 8;
  const inputRef = useRef();
  const userId = useSelector(state => state.user.userId)
  const favorites = useSelector(state => state.tempFavorites.favorites)


  const { movieData,
    isLoading,
    hasMore,
    searchAttempted,
    page,
    handleSearch,
    handleLoadMore } = useSearchMovies(searchInput, userId, orderByMethod, selectedGenres, selectedOrderASC);


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


  const applyFilters = () => {
    handleSearch(true);
  };


  return (
    <View style={styles.container}>
      {isLoading && page === 0 ? (
        <LoadingPage />
      ) : movieData.length > 0 ? (
        <FlatList
          data={movieData}
          renderItem={({ item }) =>
            <SearchMovieCard
              key={`movie-${item.movieId}-${item.isFavorite}-${favorites[item.movieId]}-${item.rating}`}
              movie={item}
            />}
          keyExtractor={(item, index) => `movie-${item.movieId}-${index}`}
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


