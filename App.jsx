import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigation from "./src/navigation/StackNavigation";
import DrawerNavigator from "./src/navigation/DrawerNavigator";


const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StackNavigation/>
        {/* <DrawerNavigator/> */}
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;