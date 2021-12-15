import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchScreen from "./screens/SearchScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { PokemonContextProvider } from "./store/pokemon-context";
import ListingScreen from "./screens/ListingScreen";
export default function App() {
  const [allFontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });

  if (!allFontsLoaded) return <AppLoading />;
  return (
    <PokemonContextProvider>
      <ListingScreen />
    </PokemonContextProvider>
  );
}
