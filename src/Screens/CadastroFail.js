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

const CadastroFail = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.banner}
        source={require("../../assets/banner-login-fail.png")}
        resizeMode="contain"
      />
      <Text style={styles.header}>OPA! PERAÍ...</Text>
      <Text style={styles.description}>Alguma coisa deu errada.</Text>
      <Text style={styles.description}>E-mail ou Senha não deu Match...</Text>
      <Text style={styles.description}>Tenta de novo... Agora vai!</Text>
      <TouchableOpacity
        style={styles.cadastreseBtn}
        onPress={() => props.navigation.navigate("Cadastro")}
      >
        <Text style={styles.cadastreseText}>VAMO LÁ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#683d76",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "90%",
    height: "30%",
    marginTop: -50,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
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

export default CadastroFail;
