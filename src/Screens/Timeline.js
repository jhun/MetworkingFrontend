import React from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Timeline = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TIMELINE</Text>
      <Text style={styles.description}>I'm in.</Text>
      <Text style={styles.description}>I'm in.</Text>
      <Text style={styles.description}>I'm in.</Text>
      {/* <TouchableOpacity
        style={styles.startBtn}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={styles.startText}>COMEÇAR</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#6a56a5",
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

export default Timeline;
