import React from "react";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import pokemonContext from "../../store/pokemon-context";
import { useContext, useRef, useEffect } from "react";
import { useState } from "react";

export default function SearchBanner({
  item,
  navigation,
  filteredDataHandler,
  isLoadingSearchHandler,
}) {
  const pokemonCtx = useContext(pokemonContext);

  const [userInputValue, setuserInputValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!userInputValue) filteredDataHandler();

    inputThrottleTimer = setTimeout(() => {
      if (userInputValue) {
        const filteredArrayDataFromAllPokemons =
          pokemonCtx.filterDataFromAllPokemons(userInputValue);

        const loadData = async () => {
          try {
            isLoadingSearchHandler(true);
            const individualData =
              await pokemonCtx.fetchIndividualFilteredPokemons(
                filteredArrayDataFromAllPokemons
              );
            isLoadingSearchHandler(false);
            filteredDataHandler(individualData);
          } catch (e) {
            setHasError(true);
          }
        };
        loadData();
      }
    }, 400);

    return () => clearTimeout(inputThrottleTimer);
  }, [userInputValue]);
  // useEffect(() => {
  //   pokemonCtx.filterDataToArray(userInputValue);
  // }, [userInputValue]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View>
          <TextInput
            // value={userInputValue}
            returnKeyType="search"
            autoFocus={true}
            ref={inputRef}
            spellCheck={false}
            selectionColor="#8C8C8C"
            onChangeText={setuserInputValue}
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
            size={21}
            color="#323232"
            style={{ position: "absolute", left: 10, top: 8 }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("FiltersScreen");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-end",
              marginTop: 17,
              marginRight: 15,
            }}
          >
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
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
