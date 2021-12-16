import React, { useEffect } from "react";
import { createContext, useState } from "react";

const pokemonContext = createContext({
  allColors: {},
  fetchPokemonsWithLimitOffset(limit, offset) {},
  fetchIndividualPokemons(arr) {},
  setUserTypingCharacter(value) {},
  userTyping: false,
  allPokemonsData: {},
  filteredSearchData: [],
});

export const PokemonContextProvider = ({ children }) => {
  const maxPokemons = 898;
  const [allPokemonsData, setAllPokemonsData] = useState();
  const [filteredSearchData, setFilteredSearchData] = useState(["Something"]);

  useState();

  //Edit all the colors here
  const allColors = {
    backgroundColor: "#0D1323",
    textColor: "#C8CCDA",
    lightModeTextColor: "#0D1323",
    lightModeBackgroundColor: "#C8CCDA",
    types: {
      grass: { light: "#6AAD59", dark: "#508243" },
      fire: { light: "#D76B6B", dark: "#A74343" },
      water: { light: "#4C9AA5", dark: "#2A6B74" },
      electric: { light: "#DDB03D", dark: "#A67F19" },
      normal: { light: "#A8A778", dark: "#79784B" },
      ice: { light: "#91BCB9", dark: "#457471" },
      fighting: { light: "#B84B44", dark: "#78312C" },
      poison: { light: "#C05CC0", dark: "#793879" },
      ground: { light: "#99774C", dark: "#6D4F28" },
      flying: { light: "#9283AB", dark: "#63557A" },
      psychic: { light: "#E06B8E", dark: "#A8506A" },
      bug: { light: "#978655", dark: "#625737" },
      rock: { light: "#737373", dark: "#4B4B4B" },
      ghost: { light: "#705898", dark: "#493963" },
      dark: { light: "#463743", dark: "#2D242C" },
      dragon: { light: "#7F5CD6", dark: "#533C8B" },
      steel: { light: "#9D9398", dark: "#666063" },
      fairy: { light: "#D4939A", dark: "#8A6064" },
      unknown: { light: "#68A090", dark: "#44685E" },
    },
  };

  const fetchPokemonsWithLimitOffset = async (
    limit,
    offset,
    nextFetch = null
  ) => {
    let url;
    if (nextFetch) {
      url = nextFetch;
    } else {
      url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data) throw new Error("Something went wrong");

      return data;
    } catch (e) {
      return e.message;
    }
  };
  //Need array of results
  const fetchIndividualPokemons = async (arr) => {
    let dataArray = [];

    for (let item of arr.results) {
      let url = item.url;

      try {
        let response = await fetch(url);
        let data = await response.json();
        dataArray.push({
          id: data.order,
          type: data.types,
          name: data.species.name,
          uri: data.sprites.other["dream_world"]["front_default"],
          png: data.sprites.other["official-artwork"]["front_default"],
        });
      } catch (e) {
        return e.message;
      }
    }
    return dataArray;
  };

  const fetchIndividualFilteredPokemons = async (arr) => {
    let dataArray = [];

    for (let item of arr) {
      let url = item.url;

      try {
        let response = await fetch(url);
        let data = await response.json();
        dataArray.push({
          id: data.order,
          type: data.types,
          name: data.species.name,
          uri: data.sprites.other["dream_world"]["front_default"],
          png: data.sprites.other["official-artwork"]["front_default"],
        });
      } catch (e) {
        return e.message;
      }
    }
    return dataArray;
  };
  useEffect(() => {
    const fetchAllPokemonData = async () => {
      let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${maxPokemons}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data) throw new Error("Something went wrong");
        setAllPokemonsData(data.results);
      } catch (e) {
        return e.message;
      }
    };
    fetchAllPokemonData();
  }, []);

  const userSearchInputHandler = (value) => {
    if (!value) setFilteredSearchData(null);
    if (allPokemonsData && value) {
      setFilteredSearchData(
        allPokemonsData.filter((item) => item.name.startsWith(value))
      );
    }
  };

  const pokemonContextValue = {
    allColors: allColors,
    fetchPokemonsWithLimitOffset: fetchPokemonsWithLimitOffset,
    fetchIndividualPokemons: fetchIndividualPokemons,
    allPokemonsData: allPokemonsData,
    userSearchInputHandler: userSearchInputHandler,
    filteredSearchData: filteredSearchData,
    fetchIndividualFilteredPokemons: fetchIndividualFilteredPokemons,
  };

  return (
    <pokemonContext.Provider value={pokemonContextValue}>
      {children}
    </pokemonContext.Provider>
  );
};

export default pokemonContext;

// const allColors = {
//     backgroundColor: "#0D1323",
//     textColor: "#C8CCDA",
//     lightModeTextColor: "#0D1323",
//     lightModeBackgroundColor: "#C8CCDA",
//   };

// async function fetchTopHeadlinesAsyncAwait() {
//   let response = await fetch(TOP_STORIES);
//   let storyIds = await response.json();

//   for (let storyId of storyIds) {
//     console.log(storyId);
//     let storyDetailsURL = `someurl/er/tg/${storyId}.json?print=pretty`;
//     try {
//       let response = await fetch(storyDetailsURL);
//       let story = await response.json();
//       displayStory(story);
//     } catch (err) {
//       displayStory("An error occurred while fetching this story.");
//     }
//   }
// }
