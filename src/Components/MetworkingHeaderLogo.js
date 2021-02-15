import React from "react";
import { View, Image } from "react-native";

const MetworkingHeaderLogo = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={require("../../assets/logo-metworking.png")}
        style={{
          width: 64,
          height: 40,
          marginRight: 20,
        }}
      />
    </View>
  );
};

export default MetworkingHeaderLogo;
