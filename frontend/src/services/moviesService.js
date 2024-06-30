import {api, endpoints} from '../config/apiConfig';

const movieService = {
  getHomeData: async () => {
    try {
      const response = await api.get(endpoints.movie.getMoviesForHomepage());

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  searchMovies: async (input, sort, orderBy, page = 0, size = 8, userId) => {
    try {
      const response = await api.get(
        endpoints.movie.searchMovies(input, page, size, sort, orderBy, userId),
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return {movies: []};
    }
  },

  getMovieById: async (movieId, userId) => {
    try {
      const response = await api.get(
        endpoints.movie.getMovieById(movieId, userId)
      )

      return response.data

    } catch(error) {
      console.error(error)
    }
  },

  rateMovie: async (movieId, userId, rating) => {
    try {
      const response = await api.post(
        endpoints.movie.rateMovie(movieId, userId),
        { rating }
      )
      return response.data

    } catch(error) {
      console.error(error)
    }
  },

  getJustReleased: async (page = 0, size = 10) => {
    try {
      const response = await api.get(endpoints.movie.getNewReleases(page, size));

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  
};

export default movieService;
