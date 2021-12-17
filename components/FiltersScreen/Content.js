import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import pokemonContext from "../../store/pokemon-context";

import BouncyCheckbox from "react-native-bouncy-checkbox";
export default function Content() {
  const [allFiters, setAllFilters] = useState(null);
  const categories = [
    "type",
    "egg-group",
    "generation",
    "pokemon-color",
    "pokemon-habitat",
    "pokemon-shape",
  ];
  useEffect(() => {
    const fetchTypes = async (categories) => {
      try {
        let dataArr = [];
        for (let item of categories) {
          let response = await fetch(`https://pokeapi.co/api/v2/${item}`);
          let data = await response.json();
          dataArr.push(data);
        }
        setAllFilters(dataArr);
        // const eggResponse = await fetch("https://pokeapi.co/api/v2/");
        // const eggData = await response.json();
        // const natureResponse = await fetch("https://pokeapi.co/api/v2/");
        // const natureData = await response.json();

        // const colorResponse = await fetch("https://pokeapi.co/api/v2/");
        // const colorData = await response.json();
        // const habitatResponse = await fetch("https://pokeapi.co/api/v2/");
        // const habitatData = await response.json();
        // const shapeResponse = await fetch("https://pokeapi.co/api/v2/");
        // const shapeData = await response.json();
        // const colorData = await response.json();
        if (dataArr.length === 0) throw new Error("Error occured");
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchTypes(categories);
  }, []);
  useEffect(() => {
    if (allFiters) console.log(allFiters);
  }, [allFiters]);
  const pokemonCtx = useContext(pokemonContext);
  const filterString = (str) => {
    if (str.startsWith("generation")) {
      const last = str.split("-")[1].toUpperCase();
      return "Gen. " + last;
    }
    if (str.startsWith("no-")) {
      return "No Eggs";
    }
    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return filterString(firstWord);
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };

  return (
    <View style={{ paddingHorizontal: 10, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Left View */}
          <View>
            <View>
              <Text
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontSize: 22,
                  fontFamily: "Rubik-Regular",
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                Type
              </Text>
              {allFiters &&
                allFiters[0].results.map((item) => (
                  <BouncyCheckbox
                    key={item.name}
                    size={20}
                    fillColor={pokemonCtx.allColors.types[item.name]["light"]}
                    unfillColor={pokemonCtx.allColors.textColor}
                    text={filterString(item.name)}
                    iconStyle={{
                      borderColor: pokemonCtx.allColors.backgroundColor,
                      marginTop: 14,
                      //   marginRight: 0,
                    }}
                    textStyle={{
                      marginLeft: 0,
                      color: pokemonCtx.allColors.textColor,
                      fontFamily: "Rubik-Regular",
                      textDecorationLine: "none",
                      fontSize: 17,
                      marginTop: 14,
                    }}
                    onPress={(isChecked) => {}}
                  />
                ))}
            </View>
            <View>
              <Text
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontSize: 22,
                  fontFamily: "Rubik-Regular",
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                Generation
              </Text>
              {allFiters &&
                allFiters[2].results.map((item) => (
                  <BouncyCheckbox
                    key={item.name}
                    size={20}
                    fillColor={pokemonCtx.allColors.types.grass.light}
                    unfillColor={pokemonCtx.allColors.textColor}
                    text={filterString(item.name)}
                    iconStyle={{
                      borderColor: pokemonCtx.allColors.backgroundColor,
                      marginTop: 14,
                      //   marginRight: 0,
                    }}
                    textStyle={{
                      marginLeft: 0,
                      color: pokemonCtx.allColors.textColor,
                      fontFamily: "Rubik-Regular",
                      textDecorationLine: "none",
                      fontSize: 17,
                      marginTop: 14,
                    }}
                    onPress={(isChecked) => {}}
                  />
                ))}
            </View>
            <View>
              <Text
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontSize: 22,
                  fontFamily: "Rubik-Regular",
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                Habitat
              </Text>
              {allFiters &&
                allFiters[4].results.map((item) => (
                  <BouncyCheckbox
                    key={item.name}
                    size={20}
                    fillColor={pokemonCtx.allColors.types.grass.light}
                    unfillColor={pokemonCtx.allColors.textColor}
                    text={filterString(item.name)}
                    iconStyle={{
                      borderColor: pokemonCtx.allColors.backgroundColor,
                      marginTop: 14,
                      //   marginRight: 0,
                    }}
                    textStyle={{
                      marginLeft: 0,
                      color: pokemonCtx.allColors.textColor,
                      fontFamily: "Rubik-Regular",
                      textDecorationLine: "none",
                      fontSize: 17,
                      marginTop: 14,
                    }}
                    onPress={(isChecked) => {}}
                  />
                ))}
            </View>
          </View>

          {/* RightView */}
          <View>
            <View>
              <Text
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontSize: 22,
                  fontFamily: "Rubik-Regular",
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                Egg Group
              </Text>
              {allFiters &&
                allFiters[1].results.map((item) => (
                  <BouncyCheckbox
                    key={item.name}
                    size={20}
                    fillColor={pokemonCtx.allColors.types.grass.light}
                    unfillColor={pokemonCtx.allColors.textColor}
                    text={filterString(item.name)}
                    iconStyle={{
                      borderColor: pokemonCtx.allColors.backgroundColor,
                      marginTop: 14,
                      //   marginRight: 0,
                    }}
                    textStyle={{
                      marginLeft: 0,
                      color: pokemonCtx.allColors.textColor,
                      fontFamily: "Rubik-Regular",
                      textDecorationLine: "none",
                      fontSize: 17,
                      marginTop: 14,
                    }}
                    onPress={(isChecked) => {}}
                  />
                ))}
            </View>
            <View>
              <Text
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontSize: 22,
                  fontFamily: "Rubik-Regular",
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                Color
              </Text>
              {allFiters &&
                allFiters[4].results.map((item) => (
                  <BouncyCheckbox
                    key={item.name}
                    size={20}
                    fillColor={pokemonCtx.allColors.types.grass.light}
                    unfillColor={pokemonCtx.allColors.textColor}
                    text={filterString(item.name)}
                    iconStyle={{
                      borderColor: pokemonCtx.allColors.backgroundColor,
                      marginTop: 14,
                      //   marginRight: 0,
                    }}
                    textStyle={{
                      marginLeft: 0,
                      color: pokemonCtx.allColors.textColor,
                      fontFamily: "Rubik-Regular",
                      textDecorationLine: "none",
                      fontSize: 17,
                      marginTop: 14,
                    }}
                    onPress={(isChecked) => {}}
                  />
                ))}
            </View>
            <View>
              <Text
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontSize: 22,
                  fontFamily: "Rubik-Regular",
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                Shape
              </Text>
              {allFiters &&
                allFiters[5].results.map((item) => (
                  <BouncyCheckbox
                    key={item.name}
                    size={20}
                    fillColor={pokemonCtx.allColors.types.grass.light}
                    unfillColor={pokemonCtx.allColors.textColor}
                    text={filterString(item.name)}
                    iconStyle={{
                      borderColor: pokemonCtx.allColors.backgroundColor,
                      marginTop: 14,
                      //   marginRight: 0,
                    }}
                    textStyle={{
                      marginLeft: 0,
                      color: pokemonCtx.allColors.textColor,
                      fontFamily: "Rubik-Regular",
                      textDecorationLine: "none",
                      fontSize: 17,
                      marginTop: 14,
                    }}
                    onPress={(isChecked) => {}}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
