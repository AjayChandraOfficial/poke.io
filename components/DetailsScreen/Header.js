import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import pokemonContext from "../../store/pokemon-context";
import { useContext } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
export default function Header({ data }) {
  const navigation = useNavigation();
  const pokemonCtx = useContext(pokemonContext);
  const filterString = (str) => {
    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return firstWord;
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };
  return (
    <View
      style={{
        elevation: 2,
        //Set zindex for ios and elevation for Android
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Entypo name="chevron-thin-left" size={19} color="white" />
        <Text
          style={{
            color: "white",
            fontFamily: "Rubik-Regular",
            fontSize: 19,
            marginLeft: 12,
          }}
        >
          {filterString(data.name)}
        </Text>
      </TouchableOpacity>
      {/* //Filled heart is ant designs heart */}
      <View style={{ marginRight: 18 }}>
        <AntDesign name="hearto" size={24} color={"white"} />
      </View>
    </View>
  );
}
