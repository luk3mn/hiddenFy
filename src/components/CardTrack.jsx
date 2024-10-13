import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useThemeColors } from '../hooks/useThemeColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iconSizes, imageSizes, spacing } from '../constants/dimensions';

const CardTrack = ({ item, index }) => {
  const colors = useThemeColors();
  
  // const track = item.item;
  console.log("CARD........: ", item)

  return (
    <View style={[styles.cardContainer, {backgroundColor: colors.cardPrimary}]}>
      <Image
        style={{borderRadius: spacing.sm}}
        source={{ uri: item.image }}
        width={imageSizes.lg}
        height={imageSizes.lg}
      />
      <View style={styles.cardDetail}>
        <Text style={[{fontWeight: 'bold', color: colors.textPrimary}]}>{item.title}</Text>
        <Text style={[{color: colors.textPrimary}]}>{item.artist}</Text>
      </View>
      <View>
        <Text style={[{fontWeight: 'bold', color: colors.textPrimary}]}>Album</Text>
        <Text style={[{color: colors.textPrimary}]}>{item.album}</Text>
      </View>

      <TouchableOpacity style={[styles.toggleCard, {backgroundColor: colors.togglePrimary}]}>
        <FontAwesome name={'play'} color={colors.iconSecondary} size={iconSizes.xm}/>
      </TouchableOpacity>

    </View>
  )
}

export default CardTrack

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm
    // flex: 1,
    // backgroundColor: colo
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  toggleCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: spacing.xl
  }
})