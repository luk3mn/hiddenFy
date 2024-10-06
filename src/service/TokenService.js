import AsyncStorage from '@react-native-async-storage/async-storage';


class TokenService {
  constructor() {
    this.TOKEN_KEY = 'spotify_token';
    this.EXPIRY_KEY = 'token_expiry';
  }

  // Save token and expiry time
  saveToken = async (token, expiryTime) => {
    if (!this.TOKEN_KEY || !this.EXPIRY_KEY) {
      console.error('TOKEN_KEY or EXPIRY_KEY is undefined');
      return;
    }
    await AsyncStorage.setItem(this.TOKEN_KEY, token);
    await AsyncStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
  };

  // Get token
  getToken = async () => {
    if (!this.TOKEN_KEY || !this.EXPIRY_KEY) {
      console.error('TOKEN_KEY or EXPIRY_KEY is undefined');
      return { token: null, isExpired: true };
    }
    const token = await AsyncStorage.getItem(this.TOKEN_KEY);
    const expiry = await AsyncStorage.getItem(this.EXPIRY_KEY);

    if (!token || !expiry) {
      return { token: null, isExpired: true };  // No token or expiry found
    }

    const isExpired = expiry && new Date().getTime() > parseInt(expiry);
    return { token, isExpired };
  };
  
  // Clear token when necessary
  clearToken = async () => {
    if (!this.TOKEN_KEY || !this.EXPIRY_KEY) {
      console.error('TOKEN_KEY or EXPIRY_KEY is undefined');
      return;
    }
    await AsyncStorage.removeItem(this.TOKEN_KEY);
    await AsyncStorage.removeItem(this.EXPIRY_KEY);
  };
}

export default new TokenService();