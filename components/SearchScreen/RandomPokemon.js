import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import SkeletonContent from "react-native-skeleton-content";
// Fetch a random pokemon using Math.random() for id between 1-1000
export default function RandomPokemon() {
  const [isLoading, setIsLoading] = useState(true);
  const [randomPokemondData, setRandomPokemonData] = useState();
  const fetchRandomPokemon = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 801)}`
    );
    const data = await response.json();

    if (data.sprites.other["dream_world"]["front_default"] === null) {
      fetchRandomPokemon();
    }
    setRandomPokemonData(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchRandomPokemon();
  }, []);
  return (
    <>
      <Text
        style={{
          fontFamily: "Rubik-Medium",
          fontSize: 18,
          color: "#C8CCDA",
          marginBottom: 12,
          marginTop: 130,
        }}
      >
        Random Pokemon
      </Text>
      {isLoading && (
        <SkeletonContent
          boneColor="#475057"
          highlightColor="#576169"
          containerStyle={{
            flex: 1,
            width: "100%",
            height: 120,
            borderRadius: 15,
          }}
          animationDirection="horizontalLeft"
          layout={[
            // long line
            {
              width: 220,
              height: 120,
              width: "100%",
              borderRadius: 16,
              marginVertical: 12,
            },
          ]}
        ></SkeletonContent>
      )}
      {!isLoading && (
        <View>
          <TouchableOpacity activeOpacity={0.9}>
            <PokemonCard data={randomPokemondData} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const PokemonCard = ({ data }) => {
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
        width: "100%",
        height: 120,
        backgroundColor: "#4C9AA5", //Change background color according to the type of pokemon
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "flex-end",

        marginVertical: 12,
      }}
    >
      {/* Change URL and text from API */}
      {/* {data.sprites.other["dream_world"]["front_default"] && (
        <SvgUri
          width="150"
          height="150"
          uri="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/72.svg"
          style={{ position: "absolute", left: -15, top: -20 }}
        />
      )} */}
      <SvgUri
        width="150"
        height="150"
        uri={data.sprites.other["dream_world"]["front_default"]}
        style={{ position: "absolute", left: -15, top: -20 }}
      />
      <View style={{ marginRight: 35, marginTop: 20, alignItems: "center" }}>
        <Text
          style={{ color: "white", fontFamily: "Rubik-Regular", fontSize: 26 }}
        >
          {filterString(data.species.name)}
        </Text>
        <View
          style={{
            // marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontFamily: "Rubik-Bold",
                fontSize: 12,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 50,
                marginTop: 5,
                backgroundColor: "#2A6B74",
              }}
            >
              {filterString(data.types[0].type.name)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
