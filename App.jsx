import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigation from "./src/navigation/MainNavigation";
import { ThemeProvider } from "./src/contexts/ThemeContext";


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