// https://pokeapi.co/api/v2/pokemon-species/{id} Extract color, egg_groups, habitat,generation,
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import pokemonContext from "../../store/pokemon-context";
import { useState, useEffect } from "react";
export default function About({ data }) {
  const pokemonCtx = useContext(pokemonContext);

  const [eggInfoDataAPI, setEggInfoDataAPI] = useState();
  const [eggInfoData, setEggInfoData] = useState();

  const filterString = (str) => {
    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return filterString(firstWord);
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };
  const arrayExtractor = (arr) => {
    let str = [];
    let twoArr = arr.slice(0, 2);
    for (const item of twoArr) {
      let a = filterString(item.ability.name);
      str.push(a);
    }
    return str.join(", ");
  };
  const eggExtractor = (arr) => {
    if (arr === null || arr.length === 0) return "No Eggs";

    let str = [];
    for (const item of arr) {
      let a = filterString(item.name);

      str.push(a);
    }
    return str.join(", ");
  };
  const intialHeadings = ["Species", "Height", "Weight", "Abilities"];
  const initialHeadingsResult = [
    filterString(data.species.name),
    `${data.height} cm`,
    `${data.weight} kg`,
    arrayExtractor(data.abilities),
  ];
  const eggInfoHeadings = ["Egg Groups", "Shape", "Generation", "Color"];
  useEffect(() => {
    const fetchData = async () => {
      let unmounted = false;
      try {
        if (!unmounted) {
          const dataResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`
          );
          const jsonData = await dataResponse.json();
          if (!dataResponse) throw new Error("Something went wrong");
          setEggInfoDataAPI(jsonData);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (eggInfoDataAPI)
      setEggInfoData([
        {
          value: eggExtractor(eggInfoDataAPI["egg_groups"]),
        },
        {
          value: eggInfoDataAPI.shape
            ? filterString(eggInfoDataAPI.shape.name)
            : "Unknown",
        },
        {
          value: eggInfoDataAPI.generation
            ? `${filterString(
                eggInfoDataAPI.generation.name
              )}-${eggInfoDataAPI.generation.name.split("-")[1].toUpperCase()}`
            : "Unknown",
        },
        {
          value: eggInfoDataAPI.color
            ? filterString(eggInfoDataAPI.color.name)
            : "Unknown",
        },
      ]);
  }, [eggInfoDataAPI]);
  return (
    <View
      style={{
        backgroundColor: pokemonCtx.allColors.backgroundColor,
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 10,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {/* HEadings */}
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {intialHeadings.map((item, i) => (
              <Text
                key={i}
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontFamily: "Rubik-Medium",
                  fontSize: 16,
                  marginTop: 18,
                }}
              >
                {item}
              </Text>
            ))}
          </View>

          {/* Results */}
          <View
            style={{
              alignItems: "flex-start",
              marginLeft: 40,
            }}
          >
            {initialHeadingsResult.map((item, i) => (
              <Text
                key={i}
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontFamily: "Rubik-Regular",
                  fontSize: 16,
                  marginTop: 18,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
        <Text
          style={{
            color: pokemonCtx.allColors.textColor,
            fontSize: 22,
            fontFamily: "Rubik-SemiBold",
            marginTop: 40,
          }}
        >
          More Info
        </Text>
        <View style={{ flexDirection: "row" }}>
          {/* HEadings */}
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {eggInfoHeadings.map((item, i) => (
              <Text
                key={i}
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontFamily: "Rubik-Medium",
                  fontSize: 16,
                  marginTop: 18,
                }}
              >
                {item}
              </Text>
            ))}
          </View>

          {/* Results */}
          <View
            style={{
              alignItems: "flex-start",
              marginLeft: 19,
            }}
          >
            {eggInfoData &&
              eggInfoData.map((item, i) => (
                <Text
                  key={i}
                  style={{
                    color: pokemonCtx.allColors.textColor,
                    fontFamily: "Rubik-Regular",
                    fontSize: 16,
                    marginTop: 18,
                  }}
                >
                  {item.value}
                </Text>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
{
  /* <Text
style={{
  color: pokemonCtx.allColors.textColor,
  fontFamily: "Rubik-Regular",
  fontSize: 14,
}}
>
{filterString(data.name)}
</Text> */
}
