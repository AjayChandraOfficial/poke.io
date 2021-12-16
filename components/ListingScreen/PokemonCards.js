import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SvgUri } from "react-native-svg";
import { useContext, useEffect, useState } from "react";
import pokemonContext from "../../store/pokemon-context";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import PokeioLogoSvg from "../SearchScreen/PokeioLogoSvg";
export default function PokemonCards(props) {
  const pokemonCtx = useContext(pokemonContext);
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [hasError, setHasError] = useState(false);
  const [nextFetch, setNextFetch] = useState();
  const [loadingMoreData, setLoadingMoreData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await pokemonCtx.fetchPokemonsWithLimitOffset(10, 0);
        setNextFetch(data.next);
        if (data.results.length === 0) throw new Error("Something went wrong");
        const individualData = await pokemonCtx.fetchIndividualPokemons(data);
        setIsLoading(false);
        if (individualData) {
          setPokemonData(individualData);
        }
      } catch (e) {
        setHasError(true);
      }
    };
    fetchData();
  }, []);

  const loadMoreData = async () => {
    try {
      setLoadingMoreData(true);
      const data = await pokemonCtx.fetchPokemonsWithLimitOffset(
        10,
        1000,
        nextFetch
      );
      setNextFetch(data.next);
      // if (data.results.length === 0) throw new Error("Something went wrong");
      const individualData = await pokemonCtx.fetchIndividualPokemons(data);
      setLoadingMoreData(false);
      if (individualData) {
        setPokemonData((prevData) => [...prevData, ...individualData]);
      }
    } catch (e) {
      console.log(e.message);
      setHasError(true);
    }
  };

  const renderItem = ({ item, index }) => {
    return <PokemonCard data={item} index={index} key={item.id} />;
  };
  const transformedData = () => {
    if (!props.filteredData) return;
    return props.filteredData.length > 20
      ? props.filteredData.slice(0, 20)
      : props.filteredData;
  };

  return (
    <>
      <View>
        {hasError && <Error>Something went wrong, Please try again</Error>}
        {!isLoading && pokemonData && !hasError && !props.filteredData && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pokemonData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            key={2}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 80 }}
            onEndReachedThreshold={0}
            onEndReached={({ distanceFromEnd }) => {
              if (loadingMoreData === false) {
                loadMoreData();
              }
            }}
            removeClippedSubviews={true}
            // ListFooterComponent={() => moreDataLoaderComponent()}
          />
        )}
        {/* {pokemonCtx.filteredSearchData && (
          <Text style={{ color: "white" }}>Filtered Data foes here</Text> // ListFooterComponent={() => moreDataLoaderComponent()}
        )} */}

        {props.filteredData && props.filteredData.length >= 1 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={transformedData()}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            key={2}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 80 }}
            onEndReachedThreshold={0}
          />
        )}
        {props.filteredData && props.filteredData.length === 0 && (
          <Animatable.View
            animation="bounceIn"
            style={{ width: "100%", alignItems: "center", marginTop: 130 }}
          >
            <PokeioLogoSvg />
            <Text
              style={{
                color: pokemonCtx.allColors.textColor,
                fontFamily: "Rubik-SemiBold",
                fontSize: 16,
                marginTop: 23,
              }}
            >
              No Pokemons found
            </Text>
          </Animatable.View>
        )}
      </View>
      {/* Add Loading Animation here */}
      {loadingMoreData && (
        <Text
          style={{
            position: "absolute",
            left: 30,
            bottom: 25,
            color: "white",
            fontFamily: "Rubik-SemiBold",
            fontSize: 16,
            transform: [{ translateX: 100 }],
          }}
        >
          Loading...
        </Text>
      )}
    </>
  );
}

// Add touhable opacity in Pokemon card

const PokemonCard = ({ data, index }) => {
  const pokemonCtx = useContext(pokemonContext);
  const filterString = (str) => {
    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return firstWord;
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };
  // Add card animations here

  return (
    <Animatable.View
      style={{
        width: "45%",
        height: 120,
        backgroundColor: data.type
          ? pokemonCtx.allColors.types[data.type[0].type.name]["light"]
          : pokemonCtx.allColors.textColor,
        borderRadius: 16,
        paddingTop: 30,
        marginTop: 80,
      }}
    >
      {data.uri !== null ? (
        <SvgUri
          width="100"
          height="100"
          uri={data.uri}
          style={{ position: "absolute", left: 20, top: -50 }}
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
      <View
        style={{
          marginRight: 35,
          marginTop: 20,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ color: "white", fontFamily: "Rubik-Regular", fontSize: 18 }}
        >
          {filterString(data.name)}
        </Text>
        <View
          style={{
            // marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {data.type.map((item, i) => (
              <Text
                key={data.id + Math.random()}
                style={{
                  color: "white",
                  fontFamily: "Rubik-Bold",
                  fontSize: 10,
                  paddingHorizontal: 7,
                  paddingVertical: 3,
                  borderRadius: 50,
                  marginTop: 5,
                  marginLeft: 2,
                  backgroundColor: data.type
                    ? pokemonCtx.allColors.types[data.type[0].type.name]["dark"]
                    : pokemonCtx.allColors.backgroundColor, //Change texxt color dynamiucally here
                }}
              >
                {filterString(item.type.name)}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Animatable.View>
  );
};

const Error = () => {
  const pokemonCtx = useContext(pokemonContext);
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
