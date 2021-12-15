import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

//When user starts typin change the screen using navigation.navigate, Test by passing route value and then using it in the other compoent, use shared stacks screen navigator as
export default function SearchBanner() {
  return (
    <View style={{ marginTop: 120 }}>
      <Text
        style={{
          fontFamily: "Rubik-Medium",
          fontSize: 18,
          color: "#C8CCDA",
          marginVertical: 12,
        }}
      >
        Search Pokemon
      </Text>
      <View>
        <TextInput
          spellCheck={false}
          selectionColor="#8C8C8C"
          placeholder="Search by name, ability"
          style={{
            height: 40,

            borderWidth: 1,
            backgroundColor: "#C8CCDA",
            borderRadius: 60,
            paddingHorizontal: 40,
          }}
        />

        <Ionicons
          name="search-outline"
          size={20}
          color="#323232"
          style={{ position: "absolute", left: 10, top: 9 }}
        />
      </View>
    </View>
  );
}
