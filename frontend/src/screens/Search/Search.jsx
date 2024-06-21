import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { View } from 'react-native';
import SearchIcon from '../../assets/images/search_btn_black.svg';
import FilterIcon from '../../assets/images/filter_btn.svg';

import MovieCard from '../../components/MovieCard';
import movieService from '../../services/moviesService';
import LoadingPage from '../../components/LoadingPage';
import FilterPopup from './FilterPopUp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

  const inputRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <View style={styles.searchIcon}>
            <TouchableOpacity
              style={styles.searchIcon.btn}
              onPress={() => handleSearch()}>
              <SearchIcon width={28} height={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={text => setSearchInput(text)}
              style={styles.inputText}
              placeholder="Buscar Película o Actor"
              onSubmitEditing={() => handleSearch()}
              placeholderTextColor={'#303030'}
            />
          </View>
        </View>
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
    if (!textInputValue.trim().length) {
      return;
    }

    const orderBy = orderByMethod || 'DATE';

    setIsLoading(true);
    const response = await movieService.searchMovies(
      textInputValue.trimStart(),
      selectedOrderASC ? 'ASC' : 'DESC',
      orderBy,
      newSearch ? 0 : page,
      15
    );

    const filteredMovies = filterGenres(response.movies, selectedGenres);
    setMovieData(newSearch ? filteredMovies : [...movieData, ...filteredMovies]);
    setPage(newSearch ? 1 : page + 1);
    setHasMore(response.movies.length > 0);
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
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={item => item.movieId}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? <LoadingPage /> : null}
        />
      ) : searchInput ? (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#03152D',
  },
  headerContainer: {
    width: wp('64%'),
    height: hp('5.2%'),
    flexDirection: 'row',
    backgroundColor: '#CECECE',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: wp('2%'),
  },
  inputContainer: {
    marginLeft: wp('.5%'),
    width: wp('82%'),
  },
  inputText: {
    fontSize: hp('2%'),
    color: '#000',
  },
  filterBtn: {
    marginRight: wp('1.5%'),
  },
  noSearchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSearchText: {
    color: '#FAFAFA',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    paddingBottom: 25,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: wp('10%'),
    justifyContent: 'center',
  },
  noResultsText: {
    color: '#FAFAFA',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
});

const RenderNoSearch = () => {
  return (
    <View style={styles.noSearchContainer}>
      <Text style={styles.noSearchText}>Hoy estoy pensando en buscar...</Text>
      <SearchIcon width={130} height={130} />
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