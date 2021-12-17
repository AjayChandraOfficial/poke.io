import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SvgUri } from "react-native-svg";
import { useContext, useEffect, useState } from "react";
import pokemonContext from "../../store/pokemon-context";

import { useNavigation } from "@react-navigation/native";

const PokemonCard = ({ data, index }) => {
  const pokemonCtx = useContext(pokemonContext);
  const navigation = useNavigation();
  const filterString = (str) => {
    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return firstWord;
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };
  // Add card animations here

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("DetailsScreen", { data: data });
      }}
      style={{
        width: "45%",
        height: 120,
        backgroundColor: data.type
          ? pokemonCtx.allColors.types[data.type[0].type.name]["light"]
          : pokemonCtx.allColors.textColor,
        borderRadius: 16,
        paddingTop: 30,
        marginTop: 80,
      }}
    >
      {data.uri !== null ? (
        <SvgUri
          width="100"
          height="100"
          uri={data.uri}
          style={{ position: "absolute", left: 20, top: -50 }}
        />
      ) : (
        <Image
          id={data.png}
          source={{ uri: data.png }}
          style={{
            width: 120,
            height: 120,
            position: "absolute",
            left: 15,
            top: -60,
          }}
        />
      )}
      <View
        style={{
          marginRight: 35,
          marginTop: 20,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Rubik-Regular",
            fontSize: 18,
          }}
        >
          {filterString(data.name)}
        </Text>
        <View
          style={{
            // marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {data.type.map((item, i) => (
              <Text
                key={data.id + Math.random()}
                style={{
                  color: "white",
                  fontFamily: "Rubik-Bold",
                  fontSize: 10,
                  paddingHorizontal: 7,
                  paddingVertical: 3,
                  borderRadius: 50,
                  marginTop: 5,
                  marginLeft: 2,
                  backgroundColor: data.type
                    ? pokemonCtx.allColors.types[data.type[0].type.name]["dark"]
                    : pokemonCtx.allColors.backgroundColor, //Change texxt color dynamiucally here
                }}
              >
                {filterString(item.type.name)}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;
