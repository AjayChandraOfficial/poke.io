import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import SearchBanner from "../components/ListingScreen/SearchBanner";
import { useContext, useEffect, useState } from "react";
import PokemonCards from "../components/ListingScreen/PokemonCards";
import pokemonContext from "../store/pokemon-context";
export default function ListingScreen(props) {
  const pokemonCtx = useContext(pokemonContext);
  const [filteredData, setFilteredData] = useState();
  const [isloadingSearchData, setIsLoadingSearchData] = useState(false);
  const filteredDataHandler = (data = undefined) => {
    setFilteredData(data);
  };
  const isLoadingSearchHandler = (value) => {
    setIsLoadingSearchData(value);
  };
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: "20%",
        paddingHorizontal: 20, //Change page's horizontal padding here
        backgroundColor: pokemonCtx.allColors.backgroundColor,
      }}
    >
      <SearchBanner
        navigation={props.navigation}
        filteredDataHandler={filteredDataHandler}
        isLoadingSearchHandler={isLoadingSearchHandler}
      />

      <View style={{ marginTop: 20 }}>
        <PokemonCards
          filteredData={filteredData}
          isloadingSearchData={isloadingSearchData}
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
}
