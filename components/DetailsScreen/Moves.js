import React from "react";
import { View, Text } from "react-native";
import { useContext } from "react";
import pokemonContext from "../../store/pokemon-context";
export default function Moves() {
  const pokemonCtx = useContext(pokemonContext);
  return (
    <View
      style={{ backgroundColor: pokemonCtx.allColors.backgroundColor, flex: 1 }}
    >
      <Text style={{ color: pokemonCtx.allColors.textColor }}>Moves</Text>
    </View>
  );
}
