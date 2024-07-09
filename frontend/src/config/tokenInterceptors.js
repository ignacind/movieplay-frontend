import store from '../redux/store';
import authService from '../services/authService';
import {api, apiWithFormData} from './apiConfig';
import { saveTokens } from '../services/storageService';

const requestInterceptor = config => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const responseInterceptor = async error => {
  const originalRequest = error.config;

  if (error.response && (error.response.status === 403 && !originalRequest._retry)) {
    originalRequest._retry = true;

    try {

      const state = store.getState();
      const UserRefreshToken = state.auth.refreshToken;
      const userId = state.user.userId;
      const oldAccessToken = state.auth.accessToken;

      if (!userId || !oldAccessToken || !UserRefreshToken) {
        throw new Error('Missing userId, oldAccessToken, or refreshToken');
      }

      const response = await authService.refreshToken(
        userId,
        oldAccessToken,
        UserRefreshToken,
      );

      const newAccessToken = response.accessToken;

      await saveTokens(newAccessToken, UserRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      if (originalRequest.baseURL === api.defaults.baseURL) {
        return api(originalRequest);
      } else if (originalRequest.baseURL === apiWithFormData.defaults.baseURL) {
        return apiWithFormData(originalRequest);
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

const setupTokenInterceptors = apiInstance => {
  apiInstance.interceptors.request.use(requestInterceptor, error =>
    Promise.reject(error),
  );
  apiInstance.interceptors.response.use(
    response => response,
    responseInterceptor,
  );
};

export {setupTokenInterceptors};
