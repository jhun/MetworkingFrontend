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
    <TouchableOpacity
      style={styles.reject}
      onPress={() => {
        mudaStatus();
        console.log("rejeitado");
        // navigation.navigate("Mate", {
        //   otherUserId: idFriend,
        //   userId: idUser,
        // });
      }}
    >
      <Icon size={40} name="close" type="material" color="#cc0088" />
    </TouchableOpacity>
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
    <TouchableOpacity
      style={styles.accept}
      onPress={() => {
        apiMatch
          .post(`/api/v1/PedidoMatch`, {
            idUserSolicitante: idUser,
            idUserAprovador: idFriend,
          })
          .then(function (response) {
            mudaStatus();
            console.log("pedido enviado");
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
    >
      <Icon size={40} name="bolt" type="material" color="#ffcc33" />
    </TouchableOpacity>
  </Card>
);

const LoadTimeline = (props) => {
  const isFocused = useIsFocused();
  const [isStatus, setStatus] = useState(true);
  const changeStatus = () => {
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
    console.log("###################################");
    api
      .get("/api/v1/User")
      .then(function (response) {
        console.log("Tem lista geral");
        let list = response.data.data;
        let listCleanUser;
        apiMatch
          .get(`/api/v1/Match/${user}`)
          .then(function (response) {
            console.log("Tem Match");
            let listFriends = response.data.data.matches;
            listCleanUser = list.filter((x) => {
              return x.id != user;
            });
            for (let i = 0; i < listFriends.length; i++) {
              listCleanUser = listCleanUser.filter((x) => {
                return x.id != listFriends[i].idAmigo;
              });
            }
            apiMatch
              .get(`/api/v1/PedidoMatch/enviados/${user}`)
              .then(function (response) {
                console.log("Tem pedidos enviados");
                let listUsersInvited = response.data.data.pedidos;
                for (let i = 0; i < listUsersInvited.length; i++) {
                  listCleanUser = listCleanUser.filter((x) => {
                    return x.id != listUsersInvited[i].idUser;
                  });
                }
                apiMatch
                  .get(`/api/v1/PedidoMatch/recebidos/${user}`)
                  .then(function (response) {
                    console.log("Tem pedidos recebidos");
                    let listUsersReceived = response.data.data.pedidos;
                    for (let i = 0; i < listUsersReceived.length; i++) {
                      listCleanUser = listCleanUser.filter((x) => {
                        return x.id != listUsersReceived[i].idUser;
                      });
                    }
                    setListaUsuarios(listCleanUser);
                  })
                  .catch(function (error) {
                    console.log("Não tem pedidos recebidos");
                    setListaUsuarios(listCleanUser);
                  });
              })
              .catch(function (error) {
                console.log("Não tem pedidos enviados");
                apiMatch
                  .get(`/api/v1/PedidoMatch/recebidos/${user}`)
                  .then(function (response) {
                    console.log("Tem Pedidos recebidos");
                    let listUsersReceived = response.data.data.pedidos;
                    for (let i = 0; i < listUsersReceived.length; i++) {
                      listCleanUser = listCleanUser.filter((x) => {
                        return x.id != listUsersReceived[i].idUser;
                      });
                    }
                    setListaUsuarios(listCleanUser);
                  })
                  .catch(function (error) {
                    console.log("Não tem Pedidos recebidos");
                    setListaUsuarios(listCleanUser);
                  });
              });
          })
          .catch(function (error) {
            console.log("Não tem Match");
            listCleanUser = list.filter((x) => {
              return x.id != user;
            });
            apiMatch
              .get(`/api/v1/PedidoMatch/enviados/${user}`)
              .then(function (response) {
                console.log("Tem pedidos enviados");
                let listUsersInvited = response.data.data.pedidos;
                for (let i = 0; i < listUsersInvited.length; i++) {
                  listCleanUser = listCleanUser.filter((x) => {
                    return x.id != listUsersInvited[i].idUser;
                  });
                }
                apiMatch
                  .get(`/api/v1/PedidoMatch/recebidos/${user}`)
                  .then(function (response) {
                    console.log("Tem pedidos recebidos");
                    let listUsersReceived = response.data.data.pedidos;
                    for (let i = 0; i < listUsersReceived.length; i++) {
                      listCleanUser = listCleanUser.filter((x) => {
                        return x.id != listUsersReceived[i].idUser;
                      });
                    }
                    setListaUsuarios(listCleanUser);
                  })
                  .catch(function (error) {
                    console.log("Não Tem pedidos recebidos");
                    setListaUsuarios(listCleanUser);
                  });
              })
              .catch(function (error) {
                console.log("Não tem pedidos enviados");
                // console.log(error.response.data.errors.data);
                apiMatch
                  .get(`/api/v1/PedidoMatch/recebidos/${user}`)
                  .then(function (response) {
                    console.log("Tem pedidos recebidos");
                    let listUsersReceived = response.data.data.pedidos;
                    for (let i = 0; i < listUsersReceived.length; i++) {
                      listCleanUser = listCleanUser.filter((x) => {
                        return x.id != listUsersReceived[i].idUser;
                      });
                    }
                    setListaUsuarios(listCleanUser);
                  })
                  .catch(function (error) {
                    console.log("Não Tem pedidos recebidos");
                    // console.log(error.response.data.errors.data);
                    setListaUsuarios(listCleanUser);
                  });
              });
          });
      })
      .catch(function (error) {
        console.log("Não tem lista geral");
      });
  }, [isFocused, isStatus]);

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
