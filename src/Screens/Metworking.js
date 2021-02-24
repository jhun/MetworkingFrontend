import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Card, Icon } from "react-native-elements";
import api from "../Services/Axios";
import { apiMatch } from "../Services/Axios";

const screenWidth = (Dimensions.get("window").width * 100) / 100;

const Cartao = ({
  mudaStatus,
  navigation,
  idUser,
  idFriend,
  name,
  role,
  company,
  image,
}) => (
  <Card containerStyle={styles.card}>
    <Card.Image style={styles.foto} source={{ uri: image }}></Card.Image>
    <Text style={styles.header}>{name}</Text>
    <Text style={styles.cargo}>{role}</Text>
    <Text style={styles.empresa}>{company}</Text>

    <TouchableOpacity style={styles.vermais}>
      <Text
        style={styles.vermaisTitle}
        onPress={() => {
          mudaStatus();
          navigation.navigate("Mate", {
            otherUserId: idFriend,
            userId: idUser,
          });
        }}
      >
        ver perfil
      </Text>
    </TouchableOpacity>
  </Card>
);

const Metworking = (props) => {
  const [metEfetivado, setMetEfetivado] = useState(null);
  const isFocused = useIsFocused();
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
      idUser={user}
      idFriend={item.id}
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
        console.log("Tem lista geral");
        let list = response.data.data;
        apiMatch
          .get(`/api/v1/Match/${user}`)
          .then(function (response) {
            console.log("Tem Matches");
            let listFriends = response.data.data.matches;
            let listCleanUser = list.filter((x) => {
              return x.id != user;
            });

            listCleanUser = listCleanUser.filter((y) => {
              for (let i = 0; i < listFriends.length; i++) {
                if (y.id == listFriends[i].idAmigo) {
                  return true;
                }
              }
            });

            console.log("#########");
            console.log(listCleanUser);
            setListaUsuarios(listCleanUser);
            setMetEfetivado(true);
          })
          .catch(function (error) {
            console.log("Não tem Matches");
            let listCleanUser = {};
            setListaUsuarios(listCleanUser);
            setMetEfetivado(false);
          });
      })
      .catch(function (error) {
        console.log("Não tem lista geral");
      });
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {metEfetivado ? (
        <FlatList
          data={listaUsuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatView}
        />
      ) : (
        <Text style={styles.header}>
          Não existem Mets ainda.{"\n"}Bora fazer Mets!
        </Text>
      )}
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
    fontSize: 15,
    color: "#6a56a5",
    marginTop: 50,
    lineHeight: 25,
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
});

export default Metworking;
