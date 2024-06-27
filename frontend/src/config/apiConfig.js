import {API_BASE_URL_DEV, API_BASE_URL_PROD, API_BASE_URL_LOCAL} from '@env';
import axios from 'axios';
import {setupTokenInterceptors} from './tokenInterceptors';
import {setupErrorsInterceptors} from './ErrorInterceptors';


// const API_BASE_URL = API_BASE_URL_LOCAL;
const API_BASE_URL = API_BASE_URL_DEV;

const API_VERSION = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiWithFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Set up interceptors
setupTokenInterceptors(api);
setupTokenInterceptors(apiWithFormData);

setupErrorsInterceptors(api);
setupErrorsInterceptors(apiWithFormData);

const endpoints = {
  user: {
    removeMovieFromFavorites: (userId, movieId) => `${API_VERSION}/users/${userId}/movies/${movieId}`,
    getUserData: userId => `${API_VERSION}/users/${userId}`,
    getFavoriteMovies: userId => `${API_VERSION}/users/${userId}/favorites`,
    addMovieToFavorites: (userId, movieId) => `${API_VERSION}/users/${userId}/movies/${movieId}`,
    changeNickname: userId => `${API_VERSION}/users/${userId}/nickname`,
    changeProfilePicture: userId => `${API_VERSION}/users/${userId}/images`,
  },
  movie: {
    getMoviesForHomepage: () => `${API_VERSION}/movies/`,
    getMovieById: (movieId, userId) => `${API_VERSION}/movies/${movieId}?userId=${userId}`,
    searchMovies: (input, page, size, sort, orderBy, userId) =>
      `${API_VERSION}/movies/search?input=${input}&page=${page}&size=${size}&sort=${sort}&orderBy=${orderBy}&userId=${userId}`,
    getNewReleases: () => `${API_VERSION}/movies/new`,
    rateMovie: (movieId, userId) => `${API_VERSION}/movies/${movieId}/rate/${userId}`,
  },
  auth: {
    logout: userId => `${API_VERSION}/auth/logout/${userId}`,
    deleteUser: userId => `${API_VERSION}/auth/delete-account/${userId}`,
    refreshToken: () => `${API_VERSION}/auth/refresh`,
    login: () => `${API_VERSION}/auth/login`,
  },
};

export {api, apiWithFormData, endpoints};
