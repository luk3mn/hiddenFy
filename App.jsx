import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigation from "./src/navigation/StackNavigation";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { Text, useColorScheme, View } from "react-native";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import HomeScreen from "./src/screens/HomeScreen";


const App = () => {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <StackNavigation/>
          {/* <DrawerNavigator/> */}
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

export default App;