import React, { useEffect, useState } from "react";
import { SvgUri } from "react-native-svg";

import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/DetailsScreen/Header";
import { data } from "../components/DetailsScreen/data";
import { useContext } from "react";
import Circles from "../components/DetailsScreen/Circles";
import pokemonContext from "../store/pokemon-context";
import DetailsNavigationComponent from "../components/DetailsScreen/DetailsNavigationComponent";
export default function DetailsScreen({ route }) {
  const pokemonCtx = useContext(pokemonContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const dataResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${route.params.name}/`
        );
        const jsonData = await dataResponse.json();
        if (!dataResponse) throw new Error("Something went wrong");
        setData(jsonData);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  if (!isLoading) {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: "15%",

          backgroundColor:
            pokemonCtx.allColors.types[data.types[0].type.name]["light"],
        }}
      >
        <Circles />
        <Header data={data} />
        {data.sprites.other["dream_world"]["front_default"] !== null ? (
          <SvgUri
            width="200"
            height="200"
            uri={data.sprites.other["dream_world"]["front_default"]}
            style={{
              position: "absolute",
              left: "50%",
              top: "20%",
              transform: [{ translateX: -100 }],
              elevation: 4,
              borderTopWidth: 0,
              shadowColor: "rgba(0,0,0,0)",
            }}
          />
        ) : (
          <Image
            source={{ uri: data.png }}
            style={{
              width: 120,
              height: 120,
              position: "absolute",
              left: 15,
              top: -60,
            }}
          />
        )}
        <DetailsNavigationComponent data={data} />
        <StatusBar style="light" />
      </View>
    );
  } else {
    return <Text>Loading</Text>;
  }
}
