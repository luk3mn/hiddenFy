import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemeToggle from '../components/ThemeToggle'
import { useThemeColors } from '../hooks/useThemeColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { iconSizes, spacing } from '../constants/dimensions';
import TokenService from '../service/TokenService';
import { useNavigation } from '@react-navigation/native';
import SpotifyService from '../service/SpotifyService';

const HomeScreen = () => {
  const navigation = useNavigation();
  const colors = useThemeColors();

  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const { token, isExpired } = await TokenService.getToken();
      console.log("TOKEN: ", token);
      console.log("isExpired: ", isExpired);
      if (isExpired) {
        TokenService.clearToken();
        navigation.navigate('Login');
      } else {
        setAccessToken(token);
      }
    }

    fetchToken();
  }, [accessToken]);

  useEffect(() => {
    const fetchTracks = async () => {
      SpotifyService.recentlyPlayed(10, accessToken).then(response => {
        console.log("RESPONSE: ", response)
        setData(response.items);

        if (response.items && response.items.length > 0) {
          response.items.forEach((item, index) => {
            setData(item);
            console.log("ITEM: ", item)
            // console.log('Track Name:', item.track.name);
            // console.log('Played At:', item.played_at);
            // console.log('Artist Name:', item.track.artists[0].name);
          });
        }
      });
    }

    fetchTracks();
  }, [accessToken]);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Caution!", "This feature doesn't work yet!")}>
          <MaterialIcons name={'translate'} size={iconSizes.md} color={colors.iconPrimary}/>
        </TouchableOpacity>
        <ThemeToggle size={iconSizes.md} color={colors.iconPrimary} />
      </View>
      <View style={styles.content}>
        <Text style={{color: colors.textPrimary}}>HOME</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  content: {
    flex: 1,
  }
})