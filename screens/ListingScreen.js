import React from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import SearchBanner from "../components/ListingScreen/SearchBanner";
import { useContext, useEffect, useState } from "react";
import PokemonCards from "../components/ListingScreen/PokemonCards";
import pokemonContext from "../store/pokemon-context";
export default function ListingScreen(props) {
  const pokemonCtx = useContext(pokemonContext);

  // useEffect(() => {
  //   if (pokemonCtx.filteredSearchData) {
  //     const loadData = async () => {
  //       try {
  //         setLoading(true);

  //         const individualData =
  //           await pokemonCtx.fetchIndividualFilteredPokemons(
  //             pokemonCtx.filteredSearchData
  //           );
  //         // console.log(individualData);
  //         setLoading(false);
  //         if (individualData) {
  //           setFilteredSearchData(individualData);
  //         }
  //       } catch (e) {
  //         console.log(e.message);
  //         setHasError(true);
  //       }
  //     };
  //     loadData();
  //   }
  // }, [pokemonCtx.filteredSearchData]);

  // console.log(filteredSearchData);
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: "20%",
        paddingHorizontal: 20, //Change page's horizontal padding here
        backgroundColor: pokemonCtx.allColors.backgroundColor,
      }}
    >
      <SearchBanner item={props.route.params.item} />
      <View style={{ marginTop: 20 }}>
        <PokemonCards />
      </View>
      <StatusBar style="light" />
    </View>
  );
}
