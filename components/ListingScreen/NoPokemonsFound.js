import React from "react";
import { Text } from "react-native";
import * as Animatable from "react-native-animatable";
import PokeioLogoSvg from "../SearchScreen/PokeioLogoSvg";
import pokemonContext from "../../store/pokemon-context";
import { useContext } from "react";
export default function NoPokemonsFound() {
  const pokemonCtx = useContext(pokemonContext);
  return (
    <Animatable.View
      animation="bounceIn"
      style={{ width: "100%", alignItems: "center", marginTop: 130 }}
    >
      <PokeioLogoSvg />
      <Text
        style={{
          color: pokemonCtx.allColors.textColor,
          fontFamily: "Rubik-SemiBold",
          fontSize: 16,
          marginTop: 23,
        }}
      >
        No Pokemons found
      </Text>
    </Animatable.View>
  );
}
