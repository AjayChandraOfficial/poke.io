import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import pokemonContext from "../../store/pokemon-context";
export default function Stats({ data }) {
  const pokemonCtx = useContext(pokemonContext);

  const filterString = (str) => {
    if (str.includes("special")) {
      const lastWord = str.split("-")[1];
      return "Spl. " + filterString(lastWord);
    }

    if (str.includes("-")) {
      const firstWord = str.split("-")[0];
      return filterString(firstWord);
    }
    const firstLetter = str.split("")[0].toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  };

  const barFillCalculator = (value) => {
    let max = 120;
    if (value >= 115) return "100%";
    return `${Math.trunc((value / max) * 100)}%`;
  };
  const barFillColorCalculator = (value) => {
    if (value >= 100) return "#705898";
    if (value >= 60) return "#6AAD59";
    else return "#D76B6B";
  };
  return (
    <View
      style={{
        backgroundColor: pokemonCtx.allColors.backgroundColor,
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 25,
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
            {data.stats.map((item, i) => (
              <Text
                key={i}
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontFamily: "Rubik-Medium",
                  fontSize: 16,
                  marginTop: 18,
                }}
              >
                {filterString(item.stat.name)}
              </Text>
            ))}
          </View>

          {/* Results */}
          <View
            style={{
              alignItems: "flex-start",
              marginLeft: 28,
            }}
          >
            {data.stats.map((item, i) => (
              <Text
                key={i}
                style={{
                  color: pokemonCtx.allColors.textColor,
                  fontFamily: "Rubik-Regular",
                  fontSize: 16,
                  marginTop: 18,
                }}
              >
                {item["base_stat"]}
              </Text>
            ))}
          </View>

          {/* {bar} */}

          <View
            style={{
              alignItems: "flex-start",
              marginLeft: 10,
              width: "45%",
            }}
          >
            {data.stats.map((item, i) => (
              <View
                key={i}
                style={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#CCCCCC",
                  marginTop: 19,
                  borderRadius: 50,
                  position: "relative",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    // Dynamic widht here
                    width: barFillCalculator(item["base_stat"]),
                    backgroundColor: barFillColorCalculator(item["base_stat"]),
                    // marginTop: 19,
                    borderRadius: 50,
                    borderTopRightRadius:
                      barFillCalculator(item["base_stat"]) === "100%" ? 50 : 0,
                    borderBottomRightRadius:
                      barFillCalculator(item["base_stat"]) === "100%" ? 50 : 0,
                  }}
                ></View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
