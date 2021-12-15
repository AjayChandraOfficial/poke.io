import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import pokemonContext from "../../store/pokemon-context";
import { useContext } from "react";

export default function SearchBanner() {
  const pokemonCtx = useContext(pokemonContext);

  return (
    <View>
      <View>
        <TextInput
          autoFocus={true}
          spellCheck={false}
          selectionColor="#8C8C8C"
          placeholder="Search by name, ability"
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-end",
          marginTop: 17,
          marginRight: 15,
        }}
      >
        {/* Add touchable opacity and navigate to filters page on Press */}
        <Text
          style={{
            color: pokemonCtx.allColors.textColor,
            fontFamily: "Rubik-Regular",
            fontSize: 16,
            marginRight: 10,
          }}
        >
          Filters
        </Text>
        <Foundation
          name="filter"
          size={20}
          color={pokemonCtx.allColors.textColor}
        />
      </View>
    </View>
  );
}
