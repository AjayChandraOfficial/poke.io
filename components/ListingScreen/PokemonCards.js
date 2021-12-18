import React from "react";
import { View, Text, FlatList } from "react-native";
import { useContext, useEffect, useState } from "react";
import pokemonContext from "../../store/pokemon-context";
import * as Animatable from "react-native-animatable";
import PokemonCard from "./PokemonCard";
import Error from "./Error";
import NoPokemonsFound from "./NoPokemonsFound";
import LottieView from "lottie-react-native";
export default function PokemonCards(props) {
  const pokemonCtx = useContext(pokemonContext);
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [hasError, setHasError] = useState(false);
  const [nextFetch, setNextFetch] = useState();
  const [loadingMoreData, setLoadingMoreData] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      try {
        if (!unmounted) {
          setIsLoading(true);
          const data = await pokemonCtx.fetchPokemonsWithLimitOffset(10, 0);
          setNextFetch(data.next);
          if (data.results.length === 0)
            throw new Error("Something went wrong");
          const individualData = await pokemonCtx.fetchIndividualPokemons(data);
          setIsLoading(false);
          if (individualData) {
            setPokemonData(individualData);
          }
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
        {(isLoading || props.isloadingSearchData) && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <LottieView
              source={require("../../assets/animations/lf30_editor_gtcrnw7k.json")}
              autoPlay
              loop
              style={{
                height: 100,
                width: 100,
              }}
            />
          </View>
        )}
        {hasError && <Error />}
        {!isLoading &&
          pokemonData &&
          !hasError &&
          !props.filteredData &&
          !props.isloadingSearchData && (
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
        {props.filteredData &&
          props.filteredData.length >= 1 &&
          !props.isloadingSearchData && (
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
          <NoPokemonsFound />
        )}
      </View>
      {/* Add Loading Animation here */}
      {loadingMoreData && (
        <Animatable.Text
          animation="bounceIn"
          style={{
            position: "absolute",
            left: "36%",
            bottom: 30,
            color: "white",
            fontFamily: "Rubik-SemiBold",
            fontSize: 16,
            // transform: [{ translateX: 100 }],
          }}
        >
          Loading...
        </Animatable.Text>
      )}
    </>
  );
}

// Add touhable opacity in Pokemon card
