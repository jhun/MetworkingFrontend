import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import LoadingApp from "../Screens/LoadingApp";
import { useIsFocused } from "@react-navigation/native";
import { Card, Icon } from "react-native-elements";
import api from "../Services/Axios";
import { apiMatch } from "../Services/Axios";

import AuthContext from "../Store/Auth";

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
  const [isLoading, setIsLoading] = useState(true);
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState(null);
  const isFocused = useIsFocused();
  const [isStatus, setStatus] = useState(true);
  const changeStatus = () => {
    console.log("mudando");
    setStatus(!isStatus);
  };
  const { user } = useContext(AuthContext);
  const [listaUsuarios, setListaUsuarios] = useState("");
  const renderItem = ({ item }) => (
    <Cartao
      mudaStatus={changeStatus}
      navigation={props.navigation}
      idUser={user}
      idFriend={item.user.id}
      name={item.user.name}
      role={item.user.role}
      company={item.user.company}
      image={item.user.image}
    />
  );

  useEffect(() => {
    let isMounted = true;
    let listFriends;
    apiMatch
      .get(`/api/v1/PedidoMatch/enviados/${user}`)
      .then(function (response) {
        if (isMounted) {
          // console.log(response.data.data);
          console.log("tem pedido solicitacao enviado");
          listFriends = response.data.data.pedidos;
          setListaUsuarios(listFriends);
          setSolicitacoesPendentes(true);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        if (isMounted) {
          console.log("Não tem pedido solicitacao enviado");
          listFriends = {};
          setListaUsuarios(listFriends);
          setSolicitacoesPendentes(false);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  if (isLoading) {
    return <LoadingApp />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {solicitacoesPendentes ? (
          <FlatList
            data={listaUsuarios}
            renderItem={renderItem}
            keyExtractor={(item) => item.user.id}
            style={styles.flatView}
          />
        ) : (
          <Text style={styles.header}>
            Não existem solicitações{"\n"} enviadas pendentes
          </Text>
        )}
      </SafeAreaView>
    );
  }
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
