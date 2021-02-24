import React from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Boost = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Image
          source={require("../../assets/boost.png")}
          style={{
            flex: 1,
            width: 800,
            height: 1047,
            alignContent: "center",
            alignSelf: "center",
          }}
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
  description: {
    fontSize: 12,
    color: "gray",
    padding: 5,
  },
  startBtn: {
    backgroundColor: "#55449b",
    borderRadius: 50,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 50,
  },
  startText: {
    color: "white",
  },
});

export default Boost;
