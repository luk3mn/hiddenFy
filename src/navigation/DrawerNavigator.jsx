import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from './MainNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='DRAWER_HOME' component={StackNavigation}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})