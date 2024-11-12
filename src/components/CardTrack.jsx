import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useThemeColors } from '../hooks/useThemeColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iconSizes, imageSizes, spacing } from '../constants/dimensions';
import { useNavigation } from '@react-navigation/native';

const CardTrack = ({ item, index }) => {
  const navigation = useNavigation();
  const colors = useThemeColors();
  
  // const track = item.item;
  console.log("CARD............: ", item)

  return (
    <View style={[styles.cardContainer, {backgroundColor: colors.cardPrimary}]}>
      <View style={styles.cardDetailWrapper}>
        <Image
          style={{borderRadius: spacing.sm}}
          source={{ uri: item.image }}
          width={imageSizes.lg}
          height={imageSizes.lg}
        />
        <View style={{marginLeft: spacing.sm}}>
          <Text style={[{fontWeight: 'bold', color: colors.textSecondary}]}>{item.title}</Text>
          <Text style={[{color: colors.textSecondary}]}>{item.artist}</Text>
        </View>
      </View>
      {/* <View>
        <Text style={[{fontWeight: 'bold', color: colors.textSecondary}]}>Album</Text>
        <Text style={[{color: colors.textSecondary}]}>{item.album}</Text>
      </View> */}

      <TouchableOpacity onPress={() => navigation.navigate('Insight')} style={[styles.toggleCard, {backgroundColor: colors.togglePrimary}]}>
        <FontAwesome name={'play'} color={colors.iconSecondary} size={iconSizes.xm}/>
      </TouchableOpacity>

    </View>
  )
}

export default CardTrack

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm
  },
  cardDetailWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl
  }
})