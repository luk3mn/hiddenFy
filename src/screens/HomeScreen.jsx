import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemeToggle from '../components/ThemeToggle'
import { useThemeColors } from '../hooks/useThemeColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { iconSizes, spacing } from '../constants/dimensions';
import TokenService from '../service/TokenService';
import { useNavigation } from '@react-navigation/native';
import SpotifyService from '../service/SpotifyService';
import { itemFormatter, tracksFormatter } from '../service/HandleDataService';

const HomeScreen = () => {
  const navigation = useNavigation();
  const colors = useThemeColors();

  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const { token, isExpired } = await TokenService.getToken();
      // console.log("TOKEN: ", token);
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
    if (accessToken) {
      SpotifyService.currentlyPlayingTrack(accessToken).then(response => {
        // console.log("CURRENTLY PLAYING TRACK: ", response)
        if (response !== '204') {
          // setPlayingTrack(response.item);
          // itemFormatter(response.item);
        }
      })
    }

    
    if (accessToken) {
      SpotifyService.recentlyPlayed(2, accessToken).then(response => {
        // console.log("RESPONSE: ", response)
        setData(response.items);
        const track = tracksFormatter(response)
        // recently_played.push(track)

        
        let recently_played = [];
        if (response.items && response.items.length > 0) {
          response.items.forEach((item) => {
            let track_dict = {};
            // console.log("ITEM: ", item.track)
            
            track_dict.song = item.track.name;
            track_dict.album = item.track.album.name;
            track_dict.preview_url = item.track.preview_url;
            track_dict.artist = item.track.album.artists[0].name;
            track_dict.image = item.track.album.images[0].url
            
            // const track = itemFormatter(item)

            recently_played.push(track_dict)
          });
        }

        console.log(recently_played);
      })
    }
  }, []);

  // useState(() => {
  //   const expiryModel = new Date('2024-10-12T21:16:04Z').getTime();
  //   // const currentTimeModel = new Date('2024-10-12T16:23:04Z').getTime();
  //   const currentTimeModel = new Date().getTime();
  //   console.log('ExpiryModel....: ', expiryModel)
  //   console.log('Current Time...: ', currentTimeModel)
  //   console.log(!(expiryModel > currentTimeModel))
  // },[])
  
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