import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useContext } from "react";
import pokemonContext from "../store/pokemon-context";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Content from "../components/FiltersScreen/Content";
import { useState } from "react";
export default function FiltersScreen() {
  const pokemonCtx = useContext(pokemonContext);
  const [pressedDone, setPressedDone] = useState(false);
  const PressedDoneHandler = (value) => {
    setPressedDone(value);
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 60 }}>
      <Header PressedDoneHandler={PressedDoneHandler} />
      <Content
        pressedDone={pressedDone}
        PressedDoneHandler={PressedDoneHandler}
      />
    </View>
  );
}

const Header = ({ PressedDoneHandler }) => {
  const pokemonCtx = useContext(pokemonContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
        // alignSelf: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ListingPage");
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Entypo
          name="chevron-thin-left"
          size={19}
          color={pokemonCtx.allColors.textColor}
        />
        <Text
          style={{
            color: pokemonCtx.allColors.textColor,
            fontFamily: "Rubik-Regular",
            fontSize: 19,
            marginLeft: 12,
          }}
        >
          Filters
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => PressedDoneHandler(true)}
      >
        <Text
          style={{
            color: pokemonCtx.allColors.textColor,
            fontFamily: "Rubik-Regular",
            fontSize: 15,
            marginRight: 12,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            backgroundColor: "#635BAB",
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};
