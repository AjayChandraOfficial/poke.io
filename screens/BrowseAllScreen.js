import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import PokemonCards from "../components/ListingScreen/PokemonCards";
import pokemonContext from "../store/pokemon-context";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
export default function BrowseAllScreen() {
  const pokemonCtx = useContext(pokemonContext);
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "15%",
          marginLeft: 15,
        }}
      >
        <Entypo name="chevron-thin-left" size={19} color="#C8CCDA" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          paddingTop: "7%",
          paddingHorizontal: 20, //Change page's horizontal padding here
          backgroundColor: pokemonCtx.allColors.backgroundColor,
        }}
      >
        <View>
          <PokemonCards />
        </View>
        <StatusBar style="light" />
      </View>
    </>
  );
}
