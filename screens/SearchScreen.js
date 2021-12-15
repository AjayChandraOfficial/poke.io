import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import Bookmarks from "../components/SearchScreen/Bookmarks";
import BrandingLogo from "../components/SearchScreen/BrandingLogo";
import SearchBanner from "../components/SearchScreen/SearchBanner";
import RandomPokemon from "../components/SearchScreen/RandomPokemon";
import Entypo from "react-native-vector-icons/Entypo";
export default function SearchScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0D1323",
        paddingVertical: "20%",
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          //   justifyContent: "space-evenly",
        }}
      >
        <Bookmarks />
        <BrandingLogo />
      </View>
      <SearchBanner />
      <RandomPokemon />
      <View
        style={{
          alignSelf: "center",
          marginTop: 110,
          flexDirection: "row",
          alignItems: "center",
          //   position: "absolute",
          //   bottom: 50,
        }}
      >
        <Text
          style={{
            color: "#C8CCDA",
            fontFamily: "Rubik-Regular",
          }}
        >
          Browse all Pokemons
        </Text>
        <Entypo name="chevron-right" size={18} color="#C8CCDA" />
      </View>
      <StatusBar style="light" />
    </View>
  );
}
