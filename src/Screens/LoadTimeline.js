import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import api from "../Services/Axios";

const screenWidth = (Dimensions.get("window").width * 100) / 100;

const Cartao = ({ mudaStatus, navigation, id, name, role, company, image }) => (
  <Card containerStyle={styles.card}>
    <Card.Image style={styles.foto} source={{ uri: image }}></Card.Image>
    <Text style={styles.header}>{name}</Text>
    <Text style={styles.cargo}>{role}</Text>
    <Text style={styles.empresa}>{company}</Text>
    <TouchableOpacity style={styles.reject}>
      <Icon size={40} name="close" type="material" color="#cc0088" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.vermais}>
      <Text
        style={styles.vermaisTitle}
        onPress={() => {
          mudaStatus();
          navigation.navigate("Mate", { otherUserId: id });
        }}
      >
        ver perfil
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.accept}>
      <Icon size={40} name="bolt" type="material" color="#ffcc33" />
    </TouchableOpacity>
  </Card>
);

const LoadTimeline = (props) => {
  const [isStatus, setStatus] = useState(true);
  const changeStatus = () => {
    console.log("mudando");
    setStatus(!isStatus);
  };
  const { user } = props.route.params;
  const [listaUsuarios, setListaUsuarios] = useState("");
  const renderItem = ({ item }) => (
    <Cartao
      mudaStatus={changeStatus}
      navigation={props.navigation}
      id={item.id}
      name={item.name}
      role={item.role}
      company={item.company}
      image={item.image}
    />
  );

  useEffect(() => {
    api
      .get("/api/v1/User")
      .then(function (response) {
        let list = response.data.data;
        var lists = list.filter((x) => {
          return x.id != user;
        });
        setListaUsuarios(lists);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listaUsuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatView: {
    width: "100%",
    backgroundColor: "white",
  },
  card: {
    padding: 0,
    borderRadius: 20,
    backgroundColor: "#222222",
  },
  foto: {
    padding: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: screenWidth,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
    //   backgroundColor: "#aaff00",
    resizeMode: "cover",
  },
  header: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    textAlign: "center",
    textTransform: "uppercase",
  },
  cargo: {
    fontSize: 14,
    color: "gray",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
    textAlign: "center",
    textTransform: "capitalize",
  },
  empresa: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "#6a56a5",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  vermais: {
    backgroundColor: "#6a56a5",
    borderRadius: 50,
    width: 100,
    height: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 35,
  },
  vermaisTitle: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    textTransform: "uppercase",
    marginTop: "auto",
    marginBottom: "auto",
  },
  reject: {
    position: "absolute",
    backgroundColor: "#444444",
    borderRadius: 70,
    width: 60,
    height: 60,
    left: "50%",
    transform: [{ translateX: -140 }],
    bottom: 17,
    paddingTop: 9,
  },
  accept: {
    position: "absolute",
    backgroundColor: "#444444",
    borderRadius: 70,
    width: 60,
    height: 60,
    left: "50%",
    transform: [{ translateX: 85 }],
    bottom: 17,
    paddingTop: 9,
  },
});

export default LoadTimeline;
