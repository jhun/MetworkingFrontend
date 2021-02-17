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
import api from "../Services/Axios";

const Cadastro = (props) => {
  const [valueNome, onChangeNome] = React.useState("");
  const [valueEmail, onChangeEmail] = React.useState("");
  const [valueSenha, onChangeSenha] = React.useState("");
  const [valueSenhaCofirmar, onChangeSenhaConfirmar] = React.useState("");

  const userCadastrar = (nome, email, senha, senhaConfirmar) => {
    if (senha === senhaConfirmar) {
      api
        .post("/api/v1/User", {
          name: nome,
          email: email,
          password: senha,
        })
        .then((res) => {
          if (res.status === 200) {
            props.navigation.navigate("Cadastro Sucesso");
          }
        })
        .catch((error) => {
          if (error.response["status"] === 400) {
            props.navigation.navigate("Cadastro Falhou");
          }
        });
    } else {
      props.navigation.navigate("Cadastro Falhou");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/banner-cadastro.png")}
        style={{ width: "90%", height: "30%" }}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => onChangeNome(text)}
        value={valueNome}
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        onChangeText={(text) => onChangeSenhaConfirmar(text)}
        value={valueSenhaCofirmar}
      />
      <TouchableOpacity
        style={styles.cadastreseBtn}
        onPress={() =>
          userCadastrar(valueNome, valueEmail, valueSenha, valueSenhaCofirmar)
        }
      >
        <Text style={styles.cadastreseText}>CADASTRAR</Text>
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

export default Cadastro;
