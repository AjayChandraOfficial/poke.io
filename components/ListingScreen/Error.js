import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import pokemonContext from "../../store/pokemon-context";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
const Error = () => {
  const pokemonCtx = useContext(pokemonContext);
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center", marginTop: 100 }}>
      <LottieView
        source={require("../../assets/animations/38213-error.json")}
        autoPlay
        loop
        style={{ height: 100, width: 100 }}
      />

      <Text
        style={{
          color: pokemonCtx.allColors.textColor,
          fontSize: 16,
          fontFamily: "Rubik-Regular",
        }}
      >
        Something went wrong,Please try again
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        activeOpacity={0.7}
        style={{
          backgroundColor: pokemonCtx.allColors.textColor,
          borderRadius: 7,
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            // marginTop: 15,
            color: pokemonCtx.allColors.backgroundColor,
            fontSize: 14,
            fontFamily: "Rubik-Regular",
          }}
        >
          Refresh
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;
