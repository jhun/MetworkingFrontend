import React from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const MetMapa = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Image
          source={require("../../assets/map.png")}
          style={{
            flex: 1,
            width: 500,
            height: 300,
            alignContent: "center",
            alignSelf: "center",
          }}
          resizeMode="contain"
        />

        <Image
          source={require("../../assets/mapa4.png")}
          style={{ flex: 1, alignContent: "center", alignSelf: "center" }}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#6a56a5",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },

  startText: {
    color: "white",
  },
});

export default MetMapa;
