import { Alert, Animated, Easing, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useThemeColors } from '../hooks/useThemeColors'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fontSize, iconSizes, imageSizes, spacing } from '../constants/dimensions';

const CurrentlyPlayingTrack = ({ item }) => {
  const colors = useThemeColors();
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (containerWidth && textWidth) {
      // Start the animation once both widths are known
      startScrolling();
    }
  }, [containerWidth, textWidth]);

  const startScrolling = () => {
    const distance = textWidth > containerWidth ? textWidth : containerWidth;

    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: -distance, // Move leftwards
          duration: distance * 100, // Adjust speed (longer text should scroll slower)
          useNativeDriver: true,
        }),
        Animated.timing(scrollAnim, {
          toValue: containerWidth, // Move it back to the right (reset position)
          duration: 0, // No delay, instant reset
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1, // Infinite looping
      }
    ).start();
  };

  return (
    <View style={[styles.cardContainer, {backgroundColor: colors.cardPrimary}]}>
      <View style={[styles.cardDetail, {flex: 1}]}>
        <Image source={{uri: item.image }} style={styles.cardImage}/>
        <View style={{flex: 1, overflow: 'hidden', paddingHorizontal: spacing.md}}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
          <Animated.Text
            style={[
              styles.txtCard, 
              { 
                transform: [{ translateX: scrollAnim }]
              },
            ]}
            numberOfLines={1}
            // ellipsizeMode="clip"
            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
          >
            <Text style={[styles.txtCard, {color: colors.textSecondary}]}>{item.title} - {item.artist}</Text>
          </Animated.Text>
        </View>
      </View>
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {{Alert.alert("Note","play the preview for this song")}}} style={[styles.togglePlayCard, {backgroundColor: colors.togglePrimary}]}>
          <FontAwesome name={'play'} color={colors.iconSecondary} size={iconSizes.xm}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {{Alert.alert("Note","Open a modalize and show insight for this song besides the meaning behind it")}}} style={[styles.toggleCard]}>
          <MaterialCommunityIcons name={'dots-horizontal'} color={colors.togglePrimary} size={iconSizes.md}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CurrentlyPlayingTrack;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.sm,
    borderRadius: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardImage: {
    width: imageSizes.md,
    height: imageSizes.md,
    borderRadius: spacing.sm
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  togglePlayCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl,
    marginHorizontal: spacing.sm
  },
  toggleCard: {
    marginHorizontal: spacing.sm
  },
  txtCard: {
    fontWeight: 'bold',
    fontSize: fontSize.md,
     whiteSpace: 'nowrap',
  }
})