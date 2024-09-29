import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity>
        <FontAwesome6 name={'toggle-off'}/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
})