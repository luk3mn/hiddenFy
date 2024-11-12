import { StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import InsightScreen from '../screens/InsightScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useThemeColors } from '../hooks/useThemeColors';
import TokenService from '../service/TokenService';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Insight' component={InsightScreen} />
    </Stack.Navigator>
  );
}

const TabNavigation = () => {
  const colors = useThemeColors();
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={StackNavigation} 
        options={{ 
          headerShown: false,
          tabBarStyle: {backgroundColor: colors.background}
        }} 
      />
      <Tab.Screen name="Insight" component={InsightScreen}
        options={{ 
          headerShown: false,
          tabBarStyle: {backgroundColor: colors.background}
        }}
      />
    </Tab.Navigator>
  )
}

const MainNavigation = () => {
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    ;(async () => {
      const { token, isExpired } = await TokenService.getToken();
      setIsExpired(isExpired)
    })();
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isExpired ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Main" component={TabNavigation} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigation

const styles = StyleSheet.create({})