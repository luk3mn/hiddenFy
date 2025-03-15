import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ThemeToggle from '../components/ThemeToggle'
import { useThemeColors } from '../hooks/useThemeColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { iconSizes, spacing } from '../constants/dimensions';
import TokenService from '../service/TokenService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SpotifyService from '../service/SpotifyService';
import { itemFormatter, tracksFormatter } from '../service/HandleDataService';
import CardTrack from '../components/CardTrack';
import CurrentlyPlayingTrack from '../components/CurrentlyPlayingTrack';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const colors = useThemeColors();

  const [accessToken, setAccessToken] = useState(null);
  const [duration, setDuration] = useState(1000);
  const [playingTrack, setPlayingTrack] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    ;(async () => {
      const { token, isExpired } = await TokenService.getToken();
      console.log("isExpired >>>>>>>>>>>>>: ", isExpired);
      if (isExpired) {
        TokenService.clearToken();
        navigation.navigate('Login');
      } else {
        setAccessToken(token);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("ROUTE.........: ", route)
    // if (!loggedIn) {
      // setLoggedIn(route.params.loggedIn)
    // }
  }, []);

  useEffect(() => {
    (async () => {
      if (accessToken) {
        await SpotifyService.recentlyPlayed(10, accessToken).then(response => {
          const tracks = tracksFormatter(response)
          setRecentlyPlayed(tracks);
        })
      }
      console.log("NEW DURATION: ", duration)
    })();
  }, [accessToken, duration]);

  useEffect(() => {
    // ;(async () => {
    // })();
    if (accessToken) {
      setInterval(async() => {
        await SpotifyService.currentlyPlayingTrack(accessToken).then(response => {
          if (response !== '204') {
            const track = itemFormatter(response);
            console.log("CURRENTLY PLAYING TRACK: ", track)
            setPlayingTrack(track);
            setDuration(track.duration);
          }
        })
      }, duration);
    }
  }, [accessToken, duration]);

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       console.log("CALLING SCREEN.........................")
  //     }
  //   }, [])
  // );

  // useEffect(() => {
  //   setInterval(() => {
  //     // setDuration(1);
  //     console.log("DURATION CALLING: ", duration)
  //   }, duration);
  // }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Caution!", "This feature doesn't work yet!")}>
          <MaterialIcons name={'translate'} size={iconSizes.md} color={colors.iconPrimary}/>
        </TouchableOpacity>
        <ThemeToggle size={iconSizes.md} color={colors.iconPrimary} />
      </View>
      <View style={styles.content}>
        {/* <Text style={{color: colors.textPrimary}}>HOME</Text> */}
        {/* <CardTrack/> */}
        <FlatList
          data={recentlyPlayed}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CardTrack 
              item={item}
              index={index}
            />
          )}
        />
      </View>
      <View style={{flex: 0}}>
        <CurrentlyPlayingTrack item={playingTrack} />
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