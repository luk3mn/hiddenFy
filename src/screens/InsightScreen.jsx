import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeColors } from '../hooks/useThemeColors'

const InsightScreen = () => {
  const colors = useThemeColors();

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Text style={{color: colors.textPrimary}}>Play the song preview while Gemini provide insight about this song</Text>
    </View>
  )
}

export default InsightScreen

const styles = StyleSheet.create({})