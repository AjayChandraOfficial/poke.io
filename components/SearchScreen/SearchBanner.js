import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import pokemonContext from "../../store/pokemon-context";
import { useContext } from "react";
import { useEffect } from "react";
//When user starts typin change the screen using navigation.navigate, Test by passing route value and then using it in the other compoent, use shared stacks screen navigator as

//Autfocus still needs to be implemented
export default function SearchBanner({ navigation }) {
  const pokemonCtx = useContext(pokemonContext);

  return (
    <View style={{ marginTop: 120 }}>
      <Text
        style={{
          fontFamily: "Rubik-Medium",
          fontSize: 18,
          color: pokemonCtx.allColors.textColor,
          marginVertical: 12,
        }}
      >
        Search Pokemon
      </Text>
      <View>
        <TextInput
          showSoftInputOnFocus={false}
          spellCheck={false}
          selectionColor="#8C8C8C"
          placeholder="Search by name, ability"
          onFocus={() => navigation.navigate("ListingPage")}
          style={{
            height: 40,
            borderWidth: 1,
            backgroundColor: "#C8CCDA",
            borderRadius: 60,
            paddingHorizontal: 40,
          }}
        />

        <Ionicons
          name="search-outline"
          size={20}
          color="#323232"
          style={{ position: "absolute", left: 10, top: 9 }}
        />
      </View>
    </View>
  );
}
