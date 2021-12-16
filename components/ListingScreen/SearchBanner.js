import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import pokemonContext from "../../store/pokemon-context";
import { useContext, useRef, useEffect } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { useState } from "react";

export default function SearchBanner({ item }) {
  const pokemonCtx = useContext(pokemonContext);
  const [userInputValue, setuserInputValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    pokemonCtx.userSearchInputHandler(userInputValue);
  }, [userInputValue]);
  return (
    <View>
      <SharedElement id={item.id}>
        <View>
          <TextInput
            value={userInputValue}
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
      </SharedElement>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-end",
          marginTop: 17,
          marginRight: 15,
        }}
      >
        {/* Add touchable opacity and navigate to filters page on Press */}
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
    </View>
  );
}
