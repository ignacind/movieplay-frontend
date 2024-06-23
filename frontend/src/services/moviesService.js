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
  searchMovies: async (input, sort, orderBy, page = 0, size = 8) => {
    try {
      const response = await api.get(
        endpoints.movie.searchMovies(input, page, size, sort, orderBy),
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return {movies: []};
    }
  },

  getMovieById: async (movieId) => {
    try {
      const response = await api.get(
        endpoints.movie.getMovieById(movieId)
      )

      return response.data

    } catch(error) {
      console.error(error)
    }
  }

};

export default movieService;
