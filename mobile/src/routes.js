import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import logo from "./assets/logo.png";
import Feed from "./pages/Feed";
import New from "./pages/New";

const Stack = createStackNavigator();

export default function Routes() {
  function Title() {
    return <Image source={logo} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="New"
        screenOptions={{
          headerTitleAlign: "center",
          headerTitle: (props) => <Title {...props} />,
          headerBackTitle: null,
          headerTintColor: "#000",
        }}
        mode="modal"
      >
        <Stack.Screen name="Home" component={Feed} />
        <Stack.Screen name="New" component={New} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
