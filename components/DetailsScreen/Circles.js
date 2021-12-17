import React from "react";
import { View, Text } from "react-native";

export default function Circles() {
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: "-6%",
          left: "-15%",
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 200,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "30%",
          right: "-15%",
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 200,
        }}
      />
    </>
  );
}
