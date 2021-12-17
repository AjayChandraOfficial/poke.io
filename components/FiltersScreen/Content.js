import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import pokemonContext from "../../store/pokemon-context";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import * as Animatable from "react-native-animatable";

import PokeioLogoSvg from "../SearchScreen/PokeioLogoSvg";

export default function Content({ pressedDone, PressedDoneHandler }) {
  const [allFiters, setAllFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [typeCheckedData, setTypeCheckedData] = useState([]);
  const [eggCheckedData, setEggCheckedData] = useState([]);
  const [generationCheckedData, setGenerationCheckedData] = useState([]);
  const [colorCheckedData, setColorCheckedData] = useState([]);
  const [habitatCheckedData, setHabitatCheckedData] = useState([]);
  const [shapeCheckedData, setShapeCheckedData] = useState([]);
  const [filteredPageData, setFilteredPageData] = useState();
  const [filteredPagePokemonDataLoading, setFilteredPagePokemonDataLoading] =
    useState();
  const navigation = useNavigation();
  const categories = [
    "type",
    "egg-group",
    "generation",
    "pokemon-color",
    "pokemon-habitat",
    "pokemon-shape",
  ];
  useEffect(() => {
    let unmounted = false;
    const fetchTypes = async (categories) => {
      try {
        if (!unmounted) {
          setIsLoading(true);
          let dataArr = [];
          for (let item of categories) {
            let response = await fetch(`https://pokeapi.co/api/v2/${item}`);
            let data = await response.json();
            dataArr.push(data);
          }
          setAllFilters(dataArr);
          setIsLoading(false);
          if (dataArr.length === 0) throw new Error("Error occured");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchTypes(categories);

    return () => {
      unmounted = true;
    };
  }, []);

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
  const MakeObjectFromFiltersData = () => {
    return [
      {
        url: "https://pokeapi.co/api/v2/type/",
        selectedData: typeCheckedData,
        filterType: "pokemon",
        tag: "type",
      },
      {
        url: "https://pokeapi.co/api/v2/egg-group/",
        selectedData: eggCheckedData,
        filterType: "pokemon_species",
        tag: "egg",
      },
      {
        url: "https://pokeapi.co/api/v2/generation/",
        selectedData: generationCheckedData,
        filterType: "pokemon_species",
        tag: "generation",
      },
      {
        url: "https://pokeapi.co/api/v2/pokemon-color/",
        selectedData: colorCheckedData,
        filterType: "pokemon_species",
        tag: "color",
      },
      {
        url: "https://pokeapi.co/api/v2/pokemon-habitat/",
        selectedData: habitatCheckedData,
        filterType: "pokemon_species",
        tag: "habitat",
      },
      {
        url: "https://pokeapi.co/api/v2/pokemon-shape/",
        selectedData: shapeCheckedData,
        filterType: "pokemon_species",
        tag: "shape",
      },
    ];
  };

  // if (pressedDone) {
  //   pokemonCtx.getFilteredPagePokemonData(MakeObjectFromFiltersData());
  // }
  useEffect(() => {
    if (filteredPageData)
      navigation.navigate("FiltersResultScreen", {
        filteredPageData: filteredPageData,
      });
  }, [filteredPageData]);
  useEffect(() => {
    if (pressedDone) {
      const fetchFiltered = async () => {
        PressedDoneHandler(false);
        try {
          // setFilteredPagePokemonDataLoading(true);
          const filteredData = await pokemonCtx.getFilteredPagePokemonData(
            MakeObjectFromFiltersData()
          );
          const filteredDataMoreInfo =
            await pokemonCtx.fetchIndividualFilteredPokemons(filteredData);
          // setFilteredPagePokemonDataLoading(false);
          setFilteredPageData(filteredDataMoreInfo);
        } catch (e) {
          console.log(e.message);
        }
      };
      fetchFiltered();
    }
  }, [pressedDone]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={require("../../assets/animations/lf30_editor_gtcrnw7k.json")}
          autoPlay
          loop
        />
        <Text
          style={{
            color: pokemonCtx.allColors.textColor,
            fontFamily: "Rubik-SemiBold",
            fontSize: 16,
            marginTop: 80,
          }}
        >
          Loading
        </Text>
      </View>
    );
  }

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
                    onPress={(isChecked) => {
                      isChecked
                        ? setTypeCheckedData((prevState) => [
                            ...prevState,
                            { name: item.name },
                          ])
                        : setTypeCheckedData((prevState) => {
                            return prevState.filter(
                              (pItem) => pItem.name !== item.name
                            );
                          });
                    }}
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
                    onPress={(isChecked) => {
                      isChecked
                        ? setGenerationCheckedData((prevState) => [
                            ...prevState,
                            { name: item.name },
                          ])
                        : setGenerationCheckedData((prevState) => {
                            return prevState.filter(
                              (pItem) => pItem.name !== item.name
                            );
                          });
                    }}
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
                    onPress={(isChecked) => {
                      isChecked
                        ? setHabitatCheckedData((prevState) => [
                            ...prevState,
                            { name: item.name },
                          ])
                        : setHabitatCheckedData((prevState) => {
                            return prevState.filter(
                              (pItem) => pItem.name !== item.name
                            );
                          });
                    }}
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
                    onPress={(isChecked) => {
                      isChecked
                        ? setEggCheckedData((prevState) => [
                            ...prevState,
                            { name: item.name },
                          ])
                        : setEggCheckedData((prevState) => {
                            return prevState.filter(
                              (pItem) => pItem.name !== item.name
                            );
                          });
                    }}
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
                allFiters[3].results.map((item) => (
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
                    onPress={(isChecked) => {
                      isChecked
                        ? setColorCheckedData((prevState) => [
                            ...prevState,
                            { name: item.name },
                          ])
                        : setColorCheckedData((prevState) => {
                            return prevState.filter(
                              (pItem) => pItem.name !== item.name
                            );
                          });
                    }}
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
                    onPress={(isChecked) => {
                      isChecked
                        ? setShapeCheckedData((prevState) => [
                            ...prevState,
                            { name: item.name },
                          ])
                        : setShapeCheckedData((prevState) => {
                            return prevState.filter(
                              (pItem) => pItem.name !== item.name
                            );
                          });
                    }}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
