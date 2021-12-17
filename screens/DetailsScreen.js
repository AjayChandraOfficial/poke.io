import React, { useEffect, useState } from "react";
import { SvgUri } from "react-native-svg";
import LottieView from "lottie-react-native";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/DetailsScreen/Header";
import Error from "../components/ListingScreen/Error";
import { useContext } from "react";
import Circles from "../components/DetailsScreen/Circles";
import pokemonContext from "../store/pokemon-context";
import DetailsNavigationComponent from "../components/DetailsScreen/DetailsNavigationComponent";
export default function DetailsScreen({ route }) {
  const pokemonCtx = useContext(pokemonContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      try {
        if (!unmounted) {
          setIsLoading(true);
          const dataResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${route.params.data.name}/`
          );
          const jsonData = await dataResponse.json();
          if (!dataResponse) throw new Error("Something went wrong");
          setData(jsonData);
          setIsLoading(false);
        }
      } catch (e) {
        setHasError(true);
      }
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={require("../assets/animations/lf30_editor_gtcrnw7k.json")}
          autoPlay
          loop
          style={
            {
              // height: 100,
              // width: 100,
              // transform: [{ translateX: -100 }],
            }
          }
        />
        <Text
          style={{
            // transform: [{ translateX: -100 }],
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
  if (!isLoading && !hasError) {
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
        {route.params.data.uri !== null ? (
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
            source={{ uri: route.params.data.png }}
            style={{
              width: 240,
              height: 240,
              position: "absolute",
              transform: [{ translateX: -100 }],
              elevation: 4,
              left: "50%",
              top: "15%",
              shadowColor: "rgba(0,0,0,0)",
            }}
            resizeMode="contain"
          />
        )}
        <DetailsNavigationComponent data={data} />
        <StatusBar style="light" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, marginTop: 180 }}>
        <Error />
      </View>
    );
  }
}
