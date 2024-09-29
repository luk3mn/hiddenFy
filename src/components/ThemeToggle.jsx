import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '../contexts/ThemeContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const ThemeToggle = ({ size, color }) => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  return (
    <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
      <FontAwesome6 name={isDarkMode ? 'toggle-on' : 'toggle-off'} size={size} color={color}/>
    </TouchableOpacity>
  )
}

export default ThemeToggle

const styles = StyleSheet.create({})