import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import PokemonCard from "../ListingScreen/PokemonCard";
import * as Animatable from "react-native-animatable";
import { useContext } from "react";
import PokeioLogoSvg from "../SearchScreen/PokeioLogoSvg";
import pokemonContext from "../../store/pokemon-context";
import { useNavigation } from "@react-navigation/native";
export default function FiltersResultScreen({ route }) {
  const pokemonCtx = useContext(pokemonContext);
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return <PokemonCard data={item} index={index} key={item.id} />;
  };
  if (route.params.filteredPageData.length === 0) {
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
            Results
          </Text>
        </TouchableOpacity>
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
            Please try again with different filters!
          </Text>
        </Animatable.View>
      </>
    );
  }
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
          paddingBottom: 10,
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
          Results
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          // paddingTop: "20%",
          paddingHorizontal: 20, //Change page's horizontal padding here
          backgroundColor: "#0D1323",
        }}
      >
        {route.params.filteredPageData && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={route.params.filteredPageData}
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
