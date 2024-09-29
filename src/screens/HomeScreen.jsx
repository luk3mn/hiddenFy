import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemeToggle from '../components/ThemeToggle'
import { useThemeColors } from '../hooks/useThemeColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { iconSizes, spacing } from '../constants/dimensions';

const HomeScreen = () => {
  const colors = useThemeColors();
  
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