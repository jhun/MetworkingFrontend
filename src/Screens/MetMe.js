import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import LoadingApp from "../Screens/LoadingApp";
import api from "../Services/Axios";

const MetMe = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStatus, setStatus] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(
    "https://livestreaming-demobucket-1tv84b35cym3j.s3.amazonaws.com/pic2.png"
  );

  const { user } = props.route.params;
  useEffect(() => {
    let isMounted = true;

    api
      .get(`/api/v1/User/${user}`)
      .then(function (response) {
        if (isMounted) {
          setName(response.data.data.name);
          setEmail(response.data.data.email);
          setDescription(response.data.data.description);
          setCompany(response.data.data.company);
          setRole(response.data.data.role);
          setImage(response.data.data.image);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        if (isMounted) {
          console.log(error);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [isStatus]);

  const userAtualizar = (id, name, email, description, company, role) => {
    console.log(id, name, email, description, company, role);
    setIsLoading(true);
    api
      .put("/api/v1/User", {
        id: id,
        name: name,
        email: email.trim(),
        description: description,
        company: company,
        role: role,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          props.navigation.navigate("Cadastro Atualizado");
          setStatus(!isStatus);
          showMessage({
            message: "Cadastro Atualizado",
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response["status"] === 400) {
          props.navigation.navigate("Atualização Cadastro Falhou");
          setStatus(!isStatus);
          showMessage({
            message: "Atualização do cadastro falhou",
            type: "danger",
          });
        }
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingApp />;
  } else {
    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.pic} resizeMode="cover" />
        <Text style={styles.tituloText}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
        />
        <Text style={styles.tituloText}>E-mail</Text>
        <Text style={styles.inputOff}>{email}</Text>
        <Text style={styles.tituloText}>About</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
        />
        <Text style={styles.tituloText}>Company</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setCompany(text);
          }}
          value={company}
        />
        <Text style={styles.tituloText}>Role</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setRole(text);
          }}
          value={role}
        />
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => {
            userAtualizar(user, name, email, description, company, role);
          }}
        >
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pic: {
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 500,
  },
  tituloText: {
    width: "62%",
    fontSize: 14,
    textAlign: "left",
    color: "#222222",
    marginBottom: 2,
    marginTop: 0,
  },
  input: {
    borderWidth: 0.1,
    borderColor: "#222222",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: "70%",
    marginBottom: 5,
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
  },
  inputOff: {
    borderWidth: 0.1,
    borderColor: "#222222",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: "70%",
    marginBottom: 5,
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    color: "#cccccc",
  },
  updateBtn: {
    backgroundColor: "#fdb839",
    borderRadius: 50,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 20,
  },
  updateText: {
    color: "#55449b",
    textTransform: "uppercase",
  },
});
export default MetMe;
