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

const CadastroSuccess = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.banner}
        source={require("../../assets/banner-cadastro-success.png")}
        resizeMode="contain"
      />
      <Text style={styles.header}>HORA DE DECOLAR!</Text>
      <Text style={styles.description}>Cadastro feito com sucesso!</Text>
      <Text style={styles.description}>É hora de sair por aí e dar Match</Text>
      <Text style={styles.description}>nas suas metas profissionais!</Text>
      <TouchableOpacity
        style={styles.cadastreseBtn}
        onPress={() => props.navigation.navigate("Login")}
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

export default CadastroSuccess;
