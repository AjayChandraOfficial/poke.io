import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import About from "./About";
import Stats from "./Stats";
import Moves from "./Moves";
const Tab = createMaterialTopTabNavigator();
import { useContext } from "react";
import pokemonContext from "../../store/pokemon-context";

export default function DetailsNavigationComponent({ data }) {
  const pokemonCtx = useContext(pokemonContext);
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        width: "100%",
        height: 500,
        bottom: 0,
        elevation: 3,
        borderRadius: 10,
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarPressColor: pokemonCtx.allColors.backgroundColor,
          tabBarPressOpacity: 1,
          tabBarActiveTintColor: pokemonCtx.allColors.textColor,
          tabBarInactiveTintColor: pokemonCtx.allColors.textColor,
          tabBarLabelStyle: {
            fontSize: 17,
            fontFamily: "Rubik-SemiBold",
            color: pokemonCtx.allColors.textColor,
            marginVertical: 15,
            textTransform: "none",
          },
          tabBarContentContainerStyle: {
            marginTop: 20, //hange margin according to the need of image
          },
          tabBarStyle: {
            backgroundColor: pokemonCtx.allColors.backgroundColor,
            border: "none",
            shadowOpacity: 0,
            shadowColor: pokemonCtx.allColors.backgroundColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarIndicatorStyle: {
            backgroundColor:
              pokemonCtx.allColors.types[data.types[0].type.name]["light"],
            height: 3,
            width: "18%",
            left: "7%",
            borderRadius: 10,
            alignSelf: "center",
          },
        }}
      >
        <Tab.Screen name="About">
          {(props) => <About data={data} {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Stats">
          {(props) => <Stats data={data} {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Moves">
          {(props) => <Moves data={data} {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}
