import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const LoadingApp = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.banner}
        source={require("../../assets/splash.png")}
        resizeMode="contain"
      />
      <Text style={styles.header}>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    height: "100%",
    marginTop: 0,
  },
  header: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    color: "#683d76",
    marginBottom: 10,
    marginTop: 30,
  },
  description: {
    fontSize: 12,
    color: "#fff",
    padding: 5,
  },
  input: {
    borderWidth: 0,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: "80%",
    height: 40,
    marginBottom: 20,
    padding: 10,
  },
  loginBtn: {
    backgroundColor: "#fdb839",
    borderRadius: 50,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 50,
  },
  loginText: {
    color: "#55449b",
  },
  cadastreseBtn: {
    backgroundColor: "#55449b",
    borderRadius: 50,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 50,
  },
  cadastreseText: {
    color: "#fff",
  },
  esqueciBtn: {
    borderRadius: 50,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 10,
  },
  esqueciText: {
    fontSize: 12,
    color: "#fff",
  },
});

export default LoadingApp;
