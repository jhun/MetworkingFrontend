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
import { showMessage, hideMessage } from "react-native-flash-message";
import LoadingApp from "../Screens/LoadingApp";
import api from "../Services/Axios";

const Cadastro = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueNome, onChangeNome] = useState("");
  const [valueEmail, onChangeEmail] = useState("");
  const [valueDescription, onChangeDescription] = useState("");
  const [valueCompany, onChangeCompany] = useState("");
  const [valueRole, onChangeRole] = useState("");
  const [valueSenha, onChangeSenha] = useState("");
  const [valueSenhaCofirmar, onChangeSenhaConfirmar] = React.useState("");

  const userCadastrar = (
    nome,
    email,
    description,
    company,
    role,
    senha,
    senhaConfirmar
  ) => {
    if (senha === senhaConfirmar) {
      setIsLoading(true);
      api
        .post("/api/v1/User", {
          name: nome,
          email: email.trim(),
          description: description,
          company: company,
          role: role,
          password: senha.trim(),
        })
        .then((res) => {
          if (res.status === 200) {
            api
              .put(`/api/v1/User/${res.data.data.id}/UpdateImage`, {
                imageUrl:
                  "https://livestreaming-demobucket-1tv84b35cym3j.s3.amazonaws.com/pic2.png",
              })
              .then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                  props.navigation.navigate("Cadastro Sucesso");
                }
              })
              .catch((error) => {
                setIsLoading(false);
                if (error.response["status"] === 400) {
                  props.navigation.navigate("Cadastro Sucesso");
                }
              });
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response["status"] === 400) {
            props.navigation.navigate("Cadastro Falhou");
          }
          showMessage({
            message: "Cadastro falhou. Tente novamente.",
            type: "danger",
          });
        });
    } else {
      setIsLoading(false);
      props.navigation.navigate("Cadastro Falhou");
      showMessage({
        message: "Cadastro falhou. Tente novamente.",
        type: "danger",
      });
    }
  };

  if (isLoading) {
    return <LoadingApp />;
  } else {
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
          placeholder="Description"
          onChangeText={(text) => onChangeDescription(text)}
          value={valueDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Company"
          onChangeText={(text) => onChangeCompany(text)}
          value={valueCompany}
        />
        <TextInput
          style={styles.input}
          placeholder="Role"
          onChangeText={(text) => onChangeRole(text)}
          value={valueRole}
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
            userCadastrar(
              valueNome,
              valueEmail,
              valueDescription,
              valueCompany,
              valueRole,
              valueSenha,
              valueSenhaCofirmar
            )
          }
        >
          <Text style={styles.cadastreseText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    borderWidth: 0.1,
    borderColor: "#222222",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: "70%",
    marginBottom: 10,
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
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
