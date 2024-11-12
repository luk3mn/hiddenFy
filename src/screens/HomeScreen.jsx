import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
  const [data, setData] = useState(null);
  const [playingTrack, setPlayingTrack] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    ;(async () => {
      const { token, isExpired } = await TokenService.getToken();
      console.log("isExpired: ", isExpired);
      if (isExpired) {
        TokenService.clearToken();
        navigation.navigate('Login');
      } else {
        setAccessToken(token);
      }
    })();
  }, [accessToken])

  useEffect(() => {
    console.log("ROUTE.........: ", route.params)
    // if (!loggedIn) {
      // setLoggedIn(route.params.loggedIn)
    // }
  }, []);

  useEffect(() => {
    ;(async () => {
      // if (accessToken) {
      //   SpotifyService.currentlyPlayingTrack(accessToken).then(response => {
      //     // console.log("CURRENTLY PLAYING TRACK: ", response)
      //     if (response !== '204') {
      //       // setPlayingTrack(response.item);
      //       const track = itemFormatter(response);
      //       setPlayingTrack(track);
      //       // console.log(track)
      //     }
      //   })
      // }

      // console.log("ACCESS..........")
      if (accessToken) {
        SpotifyService.recentlyPlayed(5, accessToken).then(response => {
          const tracks = tracksFormatter(response)
          setRecentlyPlayed(tracks);
        })
      }
    })();
  }, []);


  useFocusEffect(() => {
    // console.log(".................")
    // SpotifyService.recentlyPlayed(7, accessToken).then(response => {
    //   const tracks = tracksFormatter(response)
    //   setRecentlyPlayed(tracks);
    // })

    if (accessToken) {
      SpotifyService.currentlyPlayingTrack(accessToken).then(response => {
        // console.log("CURRENTLY PLAYING TRACK: ", response)
        if (response !== '204') {
          // setPlayingTrack(response.item);
          const track = itemFormatter(response);
          setPlayingTrack(track);
          // console.log(track)
        }
      })
    }
  });
  

  // const recently = [
  //   {
  //     album: "Hypnotize",
  //     artist: "System Of A Down",
  //     image: "https://i.scdn.co/image/ab67616d0000b273f5e7b2e5adaa87430a3eccff",
  //     played_at: "2024-10-13:09:46:07",
  //     preview_url: "https://p.scdn.co/mp3-preview/578e8890a2f1e3f61007394f18a76114eb121a8c?cid=bd684713d23b4e54adcb7201910473ed",
  //     title: "Lonely Day"
  //   },
  //   // Add more tracks here if needed
  // ];

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