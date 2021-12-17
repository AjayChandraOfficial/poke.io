import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import NoPokemonsFound from "../components/ListingScreen/NoPokemonsFound";
import Entypo from "react-native-vector-icons/Entypo";
import PokemonCard from "../components/ListingScreen/PokemonCard";
import { useContext } from "react";
import pokemonContext from "../store/pokemon-context";
import { useNavigation } from "@react-navigation/native";
export default function BookmarkScreen() {
  const pokemonCtx = useContext(pokemonContext);

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let unmounted = false;

    const getData = async () => {
      try {
        if (!unmounted) {
          setIsLoading(true);
          await pokemonCtx.getAllOfflineData();
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getData();
    return () => {
      unmounted = true;
    };
  }, []);
  //   return <Text>Something</Text>;
  const renderItem = ({ item, index }) => {
    return <PokemonCard data={item} index={index} key={item.id} />;
  };
  if (isLoading) return <Text>Loading</Text>;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "15%",
          marginLeft: 10,
        }}
      >
        <Entypo name="chevron-thin-left" size={19} color="#C8CCDA" />
        <Text
          style={{
            color: "#C8CCDA",
            fontFamily: "Rubik-Regular",
            fontSize: 19,
            marginLeft: 12,
          }}
        >
          Bookmarks
        </Text>
      </TouchableOpacity>
      {!isLoading &&
        (pokemonCtx.allofflineData === null ||
          !pokemonCtx.allofflineData.length) && <NoPokemonsFound />}
      <View
        style={{
          flex: 1,
          // paddingTop: "20%",
          paddingHorizontal: 20, //Change page's horizontal padding here
          backgroundColor: "#0D1323",
        }}
      >
        {pokemonCtx.allofflineData && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pokemonCtx.allofflineData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            key={2}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>
    </>
  );
}

{
  // TODO : Render Bookmarks card using offline data
  /* <FlatList
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
/> */
}

// TODO : If no data then print error page
