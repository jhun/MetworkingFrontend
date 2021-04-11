import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../Services/Axios";

import AuthContext from "../Store/Auth";

const Login = () => {
  const [valueEmail, onChangeEmail] = useState("");
  const [valueSenha, onChangeSenha] = useState("");

  const { Login, user, setUser } = useContext(AuthContext);

  const userLogin = (email, senha) => {
    api
      .post("/api/v1/User/Authenticate", {
        userEmail: email,
        password: senha,
      })
      .then(async (res) => {
        if (res.status === 200) {
          console.log("logado");
          setUser(res.data.data.userId);
          console.log("usuario: ", res.data.data.userId);
          Login(res.data.data.userId);
          // props.navigation.navigate("Timeline", { user: res.data.data.userId });
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response["status"] === 400) {
          props.navigation.navigate("Login Falhou");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/banner-login.png")}
        style={{ width: "90%", height: "30%" }}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => onChangeEmail(text)}
        value={valueEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => onChangeSenha(text)}
        value={valueSenha}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => userLogin(valueEmail, valueSenha)}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cadastreseBtn}
        onPress={() => props.navigation.navigate("Cadastro")}
      >
        <Text style={styles.cadastreseText}>CADASTRE-SE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.esqueciBtn}>
        <Text style={styles.esqueciText}>Esqueci minha senha</Text>
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
  header: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
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
    marginTop: 20,
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

export default Login;
