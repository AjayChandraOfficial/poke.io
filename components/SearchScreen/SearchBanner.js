import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import pokemonContext from "../../store/pokemon-context";
import { useContext } from "react";
import { SharedElement } from "react-navigation-shared-element";

export default function SearchBanner({ navigation }) {
  const pokemonCtx = useContext(pokemonContext);
  const item = {
    id: "search",
  };

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
      <SharedElement id={item.id}>
        <View>
          <TextInput
            showSoftInputOnFocus={false}
            returnKeyType="search"
            spellCheck={false}
            selectionColor="#8C8C8C"
            placeholder="Search by name, ability"
            onFocus={() => navigation.push("ListingPage", { item })}
            style={{
              height: 40,
              borderWidth: 1,
              backgroundColor: "#C8CCDA",
              borderRadius: 60,
              paddingHorizontal: 40,
              fontSize: 14,
              fontFamily: "Rubik-Regular",
            }}
          />
          <Ionicons
            name="search-outline"
            size={20}
            color="#323232"
            style={{ position: "absolute", left: 10, top: 8 }}
          />
        </View>
      </SharedElement>
    </View>
  );
}
