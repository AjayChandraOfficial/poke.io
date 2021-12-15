import React from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import SearchBanner from "../components/ListingScreen/SearchBanner";
import { useContext } from "react";
import PokemonCards from "../components/ListingScreen/PokemonCards";
import pokemonContext from "../store/pokemon-context";
export default function ListingScreen() {
  const pokemonCtx = useContext(pokemonContext);
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: "20%",
        paddingHorizontal: 20, //Change page's horizontal padding here
        backgroundColor: pokemonCtx.allColors.backgroundColor,
      }}
    >
      <SearchBanner />
      <View style={{ marginTop: 20 }}>
        <PokemonCards />
      </View>
      <StatusBar style="light" />
    </View>
  );
}
