import {api, endpoints} from '../config/apiConfig';

const authService = {
  signIn: async (email, realName, photo) => {
    try {
      const response = await api.post(endpoints.auth.login(), {
        userEmail: email,
        realName: realName,
        profilePictureLink: photo,
      });

      return response.data;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  logout: async userId => {
    try {
      const response = await api.delete(endpoints.auth.logout(userId));

      await removeTokens();
      await removeUserId();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteUser: async userId => {
    try {
      const response = await api.delete(endpoints.auth.deleteUser(userId));

      await removeTokens();
      await removeUserId();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  refreshToken: async (userId, oldAccessToken, refreshToken) => {

    try {
      const response = await api.post(endpoints.auth.refreshToken(), {
        userId, oldAccessToken, refreshToken,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

};

export default authService;
