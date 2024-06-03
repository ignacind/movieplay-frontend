import { API_BASE_URL_DEV, API_BASE_URL_PROD, API_BASE_URL_LOCAL } from '@env';
import store from '../redux/store';
import axios from 'axios';

// const API_BASE_URL = __DEV__ ? API_BASE_URL_DEV : API_BASE_URL_PROD;
const API_BASE_URL = API_BASE_URL_LOCAL;

const API_VERSION = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const endpoints = {
  user: {
    removeMovieFromFavorites: (userId, movieId) => `${API_VERSION}/users/${userId}/movies/${movieId}`,
    getUserData: (userId) => `${API_VERSION}/users/${userId}`,
    getFavoriteMovies: (userId) => `${API_VERSION}/users/${userId}/favorites`,
    addMovieToFavorites: (userId, movieId) => `${API_VERSION}/users/${userId}/movies/${movieId}`,
    changeNickname: (userId) => `${API_VERSION}/users/${userId}/nickname`,
    changeProfilePicture: (userId) => `${API_VERSION}/users/${userId}/images`,
  },
  movie: {
    getMoviesForHomepage: () => `${API_VERSION}/movies/`,
    getMovieById: (movieId) => `${API_VERSION}/movies/${movieId}`,
    searchMovies: () => `${API_VERSION}/movies/search`,
    getNewReleases: () => `${API_VERSION}/movies/new`,
    rateMovie: (movieId, userId) => `${API_VERSION}/movies/${movieId}/rate/${userId}`,
  },

  auth: {
    logout: (userId) => `${API_VERSION}/auth/logout/${userId}`,
    deleteUser: (userId) => `${API_VERSION}/auth/delete-account/${userId}`,
    refreshToken: () => `${API_VERSION}/auth/refresh`,
    login: () => `${API_VERSION}/auth/login`,
  },
};

export {api, endpoints};