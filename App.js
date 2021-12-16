import React from "react";
import SearchScreen from "./screens/SearchScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { PokemonContextProvider } from "./store/pokemon-context";
import ListingScreen from "./screens/ListingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
export default function App() {
  const [allFontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });

  if (!allFontsLoaded) return <AppLoading />;

  const Stack = createStackNavigator();
  return (
    <PokemonContextProvider>
      <NavigationContainer
        theme={{
          colors: {
            background: "#0D1323",
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        >
          <Stack.Screen name="Search Screen" component={SearchScreen} />
          <Stack.Screen name="ListingPage" component={ListingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PokemonContextProvider>
  );
}
