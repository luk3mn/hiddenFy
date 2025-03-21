import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColors } from '../hooks/useThemeColors'
import { fontSize, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import uuid from 'react-native-uuid';
import CryptoJS from 'crypto-js';
import {decode as atob, encode as btoa} from 'base-64'
import { authorize } from 'react-native-app-auth';
import { useNavigation } from '@react-navigation/native';
// import { saveToken } from '../data/tokenManager';
import TokenService from '../service/TokenService';

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const colors = useThemeColors();

  const clientId = 'bd684713d23b4e54adcb7201910473ed';
  const redirectUri = 'com.hiddenfy://oauthredirect';
  const scope = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing user-read-recently-played';

  // You already generated codeVerifier and codeChallenge earlier
  const [codeVerifier, setCodeVerifier] = useState('');
  const [codeChallenge, setCodeChallenge] = useState('');


  useEffect(() => {
    const hexStringToUint8Array = (hexString) => {
      const length = hexString.length / 2;
      const array = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        array[i] = parseInt(hexString.substr(i * 2, 2), 16);
      }
      return array;
    };

    const sha256 = async (plain) => {
      const hash = CryptoJS.SHA256(plain).toString(CryptoJS.enc.Hex);
      return hash;
    };

    // Base64 encoding function
    const base64encode = (input) => {
      return btoa(String.fromCharCode(...input))
        .replace(/=/g, '')     // Remove padding
        .replace(/\+/g, '-')    // Replace '+' with '-'
        .replace(/\//g, '_');   // Replace '/' with '_'
    };

    // Run everything
    const run = async () => {
      const codeVerify = uuid.v4().replace(/-/g, '') + uuid.v4().replace(/-/g, '');
      setCodeVerifier(codeVerify);

      /** Code Challenge */
      const hashed = await sha256(codeVerify);

      // Convert hex string back to Uint8Array
      const hashedArray = hexStringToUint8Array(hashed);

      // Encode to Base64
      setCodeChallenge(base64encode(hashedArray))
    }

    run();
  }, [])

  const authorizeSpotify = async () => {
    try {
      const authorizationConfig = {
        clientId: clientId,
        redirectUrl: redirectUri,
        scopes: [scope],
        serviceConfiguration: {
          authorizationEndpoint: 'https://accounts.spotify.com/authorize',
          tokenEndpoint: 'https://accounts.spotify.com/api/token',
        },
        codeVerifier: codeVerifier,
        codeChallengeMethod: 'S256',
        codeChallenge: codeChallenge,
      };

      const authState = await authorize(authorizationConfig);
      // const expiryTime = new Date(authState.accessTokenExpirationDate).getTime(); // CORRIGIR
      const expiryTime = new Date(authState.accessTokenExpirationDate).getTime();
      console.log("EXPIRY TIME: ", expiryTime)
      console.log("ACCESS TOKEN EXPEIRED TIME: ", authState.accessTokenExpirationDate)
      TokenService.saveToken(authState.accessToken, expiryTime)
      setToken(authState.accessToken);
      console.log('Spotify Authorization Success:', authState);
      toHome();
    } catch (error) {
      console.log('Spotify Authorization Error:', error);
    }
  };

  const toHome = () => {
    console.log("going to home............");
    // navigation.navigate('Home', {
    //   token: token,
    //   loggedIn: true
    // })
    navigation.navigate('Home');
  }


  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <TouchableOpacity onPress={authorizeSpotify} style={[styles.toggle, {backgroundColor: colors.togglePrimary}]}>
        <Text style={[styles.txtToggle, {color: colors.textPrimary}]}>Login with Sposity</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  toggle: {
    alignSelf: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.lg
  },
  txtToggle: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.bold,
    fontWeight: 'bold',
  }
})