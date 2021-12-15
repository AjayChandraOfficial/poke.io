import React from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import pokemonContext from "../../store/pokemon-context";
import { useContext } from "react";
export default function Bookmarks() {
  const pokemonCtx = useContext(pokemonContext);
  return (
    <View>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        activeOpacity={0.8}
      >
        <Foundation name="heart" size={24} color="#C92042" />
        <Text
          style={{
            fontFamily: "Rubik-Medium",
            fontSize: 18,
            color: pokemonCtx.allColors.textColor,
            marginLeft: 12,
          }}
        >
          Bookmarks
        </Text>
      </TouchableOpacity>
    </View>
  );
}
