import React from "react";
import SearchScreen from "./screens/SearchScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { PokemonContextProvider } from "./store/pokemon-context";
import ListingScreen from "./screens/ListingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import DetailsScreen from "./screens/DetailsScreen";
import FiltersScreen from "./screens/FiltersScreen";
export default function App() {
  const [allFontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });

  if (!allFontsLoaded) return <AppLoading />;

  const Stack = createSharedElementStackNavigator();

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
          }}
          // initialRouteName="Search Screen"
        >
          <Stack.Screen
            name="Search Screen"
            component={SearchScreen}
            options={{ ...TransitionPresets.FadeFromBottomAndroid }}
          />
          <Stack.Screen
            name="ListingPage"
            component={ListingScreen}
            options={{ ...TransitionPresets.FadeFromBottomAndroid }}
            // sharedElements={(route) => {
            //   return [route.params.item.id];
            // }}
          />
          <Stack.Screen
            name="FiltersScreen"
            component={FiltersScreen}
            options={{ ...TransitionPresets.FadeFromBottomAndroid }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ ...TransitionPresets.SlideFromRightIOS }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PokemonContextProvider>
  );
}
