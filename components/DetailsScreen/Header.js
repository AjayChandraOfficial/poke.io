import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useContext } from "react";
import pokemonContext from "../../store/pokemon-context";
export default function Header({ data }) {
  const pokemonCtx = useContext(pokemonContext);
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState();
  const filterString = (str) => {
    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return firstWord;
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };

  const bookMarkAddHandler = async () => {
    try {
      const jsonValue = JSON.stringify({
        id: data.order,
        type: data.types,
        name: data.species.name,
        uri: data.sprites.other["dream_world"]["front_default"],
        png: data.sprites.other["official-artwork"]["front_default"],
      });
      await AsyncStorage.setItem(`${data.species.name}`, jsonValue);
      setBookmarked(true);
    } catch (e) {
      console.log(e.message);
    }
  };
  const bookMarkRemoveHandler = async () => {
    try {
      setBookmarked(false);
      await AsyncStorage.removeItem(`${data.species.name}`);
      pokemonCtx.removeOfflineDataHandler();
    } catch (e) {
      // remove error
      console.log("unable to remove");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const parsedData = await pokemonCtx.getOfflineData(
          `${data.species.name}`
        );
        if (parsedData)
          if (parsedData.name === data.name) {
            setBookmarked(true);
          }
      } catch (e) {
        console.log(e.message);
      }
    };
    getData();
  }, []);

  return (
    <View
      style={{
        elevation: 2,

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
        {!bookmarked && (
          <TouchableOpacity onPress={bookMarkAddHandler}>
            <AntDesign name="hearto" size={24} color={"white"} />
          </TouchableOpacity>
        )}
        {bookmarked && (
          <TouchableOpacity onPress={bookMarkRemoveHandler}>
            <AntDesign name="heart" size={24} color={"white"} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
