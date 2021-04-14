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
  loading,
  mudaStatus,
  navigation,
  idUser,
  idFriend,
  name,
  role,
  company,
  image,
  deletarUsuario,
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
        showMessage({
          message: "Usuário (vai ser) rejeitado.",
          type: "danger",
        });
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
        loading(true);
        apiMatch
          .post(`/api/v1/PedidoMatch`, {
            idUserSolicitante: idUser,
            idUserAprovador: idFriend,
          })
          .then(function (response) {
            // mudaStatus();
            deletarUsuario(idFriend);
            console.log("pedido enviado");
            loading(false);
            showMessage({
              message: "Solicitação enviada.",
            });
          })
          .catch(function (error) {
            console.log(error);
            loading(false);
            showMessage({
              message: "Erro ao enviar a solicitação. Tente novamente.",
              type: "danger",
            });
          });
      }}
    >
      <Icon size={40} name="bolt" type="material" color="#ffcc33" />
    </TouchableOpacity>
  </Card>
);

const LoadTimeline = (props) => {
  const isFocused = useIsFocused();
  const [metExists, setMetExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatus, setStatus] = useState(true);
  const { user } = useContext(AuthContext);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const changeStatus = () => {
    setStatus(!isStatus);
  };

  const renderItem = ({ item }) => (
    <Cartao
      loading={setIsLoading}
      mudaStatus={changeStatus}
      navigation={props.navigation}
      idUser={user}
      idFriend={item.id}
      name={item.name}
      role={item.role}
      company={item.company}
      image={item.image}
      deletarUsuario={removerUsuarioLista}
    />
  );

  const removerUsuarioLista = (idUser) => {
    const novaLista = listaUsuarios.filter((item) => {
      return item.id !== idUser;
    });
    setListaUsuarios(novaLista);
    if (novaLista.length == 0) {
      setMetExists(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    console.log("###################################");
    console.log(user);
    api
      .get(`/api/v1/User/Timeline/${user}`)
      .then(function (response) {
        if (isMounted) {
          console.log("Tem lista geral");
          let list = response.data.data;
          if (list.length === 0) {
            setMetExists(false);
          } else {
            setMetExists(true);
          }
          setListaUsuarios(list);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        if (isMounted) {
          console.log("Não tem lista geral");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isStatus, isFocused]);

  return (
    <>
      {isLoading ? <LoadingApp /> : null}
      <SafeAreaView style={styles.container}>
        {metExists ? (
          <FlatList
            data={listaUsuarios}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatView}
          />
        ) : (
          <Text style={styles.header}>
            Não existem Cruzamentos ainda.{"\n"}Bora procurar outros Mets!
          </Text>
        )}
      </SafeAreaView>
    </>
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

export default LoadTimeline;
