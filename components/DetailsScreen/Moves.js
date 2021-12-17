import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import pokemonContext from "../../store/pokemon-context";
import { FlatList } from "react-native";
export default function Moves({ data }) {
  const pokemonCtx = useContext(pokemonContext);
  const filterString = (str) => {
    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return filterString(firstWord);
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };
  const renderItem = ({ item }) => (
    <Text
      style={{
        color: "white",
        fontFamily: "Rubik-Regular",
        fontSize: 15,
        backgroundColor:
          pokemonCtx.allColors.types[data.types[0].type.name]["light"],
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginBottom: 10,
        marginLeft: 10,
        textAlign: "left",
      }}
    >
      {filterString(item.move.name)}
    </Text>
  );
  return (
    <View
      style={{
        backgroundColor: pokemonCtx.allColors.backgroundColor,
        flex: 1,
        paddingHorizontal: 10,
        // paddingVertical: 40,
        paddingTop: 30,
        // alignItems: "flex-start",
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data.moves}
        renderItem={renderItem}
        keyExtractor={(item) => item.move.name}
        key={4}
        numColumns={4}
        horizontal={false}
        columnWrapperStyle={{
          justifyContent: "space-around",
          flexWrap: "wrap",
          flex: 1,
        }}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

// data=
