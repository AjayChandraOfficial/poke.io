import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from "react-native";
import Bookmarks from "../components/SearchScreen/Bookmarks";
import BrandingLogo from "../components/SearchScreen/BrandingLogo";
import SearchBanner from "../components/SearchScreen/SearchBanner";
import RandomPokemon from "../components/SearchScreen/RandomPokemon";
import Entypo from "react-native-vector-icons/Entypo";
import { useContext } from "react";
import pokemonContext from "../store/pokemon-context";
import { TouchableOpacity } from "react-native";

export default function SearchScreen({ navigation }) {
  const pokemonCtx = useContext(pokemonContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: pokemonCtx.allColors.backgroundColor,
        paddingVertical: "20%",
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Bookmarks />
        <BrandingLogo />
      </View>
      <SearchBanner navigation={navigation} />
      <RandomPokemon />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BrowseAll");
        }}
        activeOpacity={0.8}
        style={{
          alignSelf: "center",
          // marginTop: 110,
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: 50,
        }}
      >
        <Text
          style={{
            color: pokemonCtx.allColors.textColor,
            fontFamily: "Rubik-Regular",
          }}
        >
          Browse all Pokemons
        </Text>
        <Entypo name="chevron-right" size={18} color="#C8CCDA" />
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}
