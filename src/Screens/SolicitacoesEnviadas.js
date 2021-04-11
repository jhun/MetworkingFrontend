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

const SolicitacoesEnviadas = (props, { navigation }) => {
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState(null);
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
    let isMounted = true;
    api
      .get("/api/v1/User")
      .then(function (response) {
        if (isMounted) {
          console.log("Tem lista geral");
          let list = response.data.data;
          apiMatch
            .get(`/api/v1/PedidoMatch/enviados/${user}`)
            .then(function (response) {
              if (isMounted) {
                // console.log(response.data.data);
                console.log("tem pedido solicitacao enviado");
                let listFriends = response.data.data.pedidos;
                let listCleanUser = list.filter((x) => {
                  return x.id != user;
                });

                listCleanUser = listCleanUser.filter((x) => {
                  for (let i = 0; i < listFriends.length; i++) {
                    if (x.id == listFriends[i].idUser) {
                      return true;
                    }
                  }
                });
                setListaUsuarios(listCleanUser);
                setSolicitacoesPendentes(true);
              }
            })
            .catch(function (error) {
              console.log("Não tem pedido solicitacao enviado");
              let listCleanUser = {};
              setListaUsuarios(listCleanUser);
              setSolicitacoesPendentes(false);
            });
        }
      })
      .catch(function (error) {
        console.log("Não tem lista geral");
      });
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {solicitacoesPendentes ? (
        <FlatList
          data={listaUsuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatView}
        />
      ) : (
        <Text style={styles.header}>
          Não existem solicitações{"\n"} enviadas pendentes
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

export default SolicitacoesEnviadas;
