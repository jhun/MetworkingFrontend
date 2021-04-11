import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import api from "../Services/Axios";
import { apiMatch } from "../Services/Axios";

const Profile = (props, { route, navigation }) => {
  const isFocused = useIsFocused();
  const [isStatus, setStatus] = useState(true);
  const { userId } = props.route.params;
  const { otherUserId } = props.route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(
    "https://livestreaming-demobucket-1tv84b35cym3j.s3.amazonaws.com/pic2.png"
  );

  const [display, setDisplay] = useState("none");
  const [isMet, setIsMet] = useState(null);
  const [buttonsAccept, setButtonsAccept] = useState(null);
  const [buttonsAdd, setButtonsAdd] = useState(null);
  const [buttonChat, setButtonChat] = useState(null);

  let iSentInvite = false;
  let iReceivedInvite = false;

  const mudaStatus = () => {
    console.log("mudando");
    setStatus(!isStatus);
  };

  const styles = StyleSheet.create({
    container: {
      display: display,
      width: "100%",
      flex: 1,
      backgroundColor: "#fdb839",
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
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#683d76",
      marginBottom: 4,
      marginTop: 0,
    },
    input: {
      borderWidth: 0,
      borderColor: "#222222",
      backgroundColor: "#333333",
      color: "#ffffff",
      borderRadius: 20,
      width: "70%",
      marginBottom: 5,
      padding: 5,
      paddingRight: 15,
      paddingLeft: 15,
      textAlign: "center",
    },
    chatBtn: {
      backgroundColor: "#683d76",
      borderRadius: 50,
      padding: 10,
      width: "30%",
      alignItems: "center",
      marginTop: 30,
    },
    updateText: {
      color: "#ffffff",
      textTransform: "uppercase",
    },
    reject: {
      position: "absolute",
      backgroundColor: "#444444",
      borderRadius: 70,
      width: 100,
      height: 100,
      left: "50%",
      bottom: 50,
      transform: [{ translateX: -130 }],
      paddingTop: 9,
    },
    accept: {
      position: "absolute",
      backgroundColor: "#444444",
      borderRadius: 70,
      width: 100,
      height: 100,
      left: "50%",
      bottom: 50,
      transform: [{ translateX: 35 }],
      paddingTop: 9,
    },
  });

  useEffect(() => {
    let isMounted = true;
    api
      .get(`/api/v1/User/${otherUserId}`)
      .then(function (response) {
        if (isMounted) {
          setName(response.data.data.name);
          setEmail(response.data.data.email);
          setDescription(response.data.data.description);
          setCompany(response.data.data.company);
          setRole(response.data.data.role);
          setImage(response.data.data.image);
          apiMatch
            .get(`/api/v1/Match/isMatch/${userId}/${otherUserId}`)
            .then(function (response) {
              if (isMounted) {
                if (response.data.data.isMatch) {
                  setButtonChat(false);
                  setButtonsAccept(true);
                  setButtonsAdd(true);
                  setDisplay("flex");
                } else {
                  apiMatch
                    .get(`/api/v1/PedidoMatch/enviados/${userId}`)
                    .then(function (response) {
                      if (isMounted) {
                        let usuarios = response.data.data.pedidos;
                        for (let i = 0; i < usuarios.length; i++) {
                          if (usuarios[i].idUser == otherUserId) {
                            setButtonChat(true);
                            setButtonsAccept(true);
                            setButtonsAdd(true);
                            iSentInvite = true;
                            setDisplay("flex");
                            console.log("i sent");
                            break;
                          } else {
                            setButtonChat(true);
                            setButtonsAccept(true);
                            setButtonsAdd(false);
                            iSentInvite = false;
                            setDisplay("flex");
                            console.log("i didnt send");
                          }
                        }
                        if (!iSentInvite) {
                          apiMatch
                            .get(`/api/v1/PedidoMatch/recebidos/${userId}`)
                            .then(function (response) {
                              if (isMounted) {
                                let usuarios = response.data.data.pedidos;
                                for (let i = 0; i < usuarios.length; i++) {
                                  if (usuarios[i].idUser == otherUserId) {
                                    setButtonChat(true);
                                    setButtonsAccept(false);
                                    setButtonsAdd(true);
                                    iReceivedInvite = true;
                                    setDisplay("flex");
                                    console.log("i received");
                                    break;
                                  } else {
                                    setButtonChat(true);
                                    setButtonsAccept(true);
                                    setButtonsAdd(false);
                                    iReceivedInvite = false;
                                    setDisplay("flex");
                                    console.log("i didnt receive");
                                  }
                                }
                              }
                            })
                            .catch(function (error) {
                              console.log(error.response.data);
                              setButtonChat(true);
                              setButtonsAccept(true);
                              setButtonsAdd(false);
                              iReceivedInvite = false;
                              console.log("i didnt receive");
                              setDisplay("flex");
                            });
                        }
                      }
                    })
                    .catch(function (error) {
                      setButtonChat(true);
                      setButtonsAccept(true);
                      setButtonsAdd(false);
                      iSentInvite = false;
                      setDisplay("flex");
                      if (!iSentInvite) {
                        apiMatch
                          .get(`/api/v1/PedidoMatch/recebidos/${userId}`)
                          .then(function (response) {
                            if (isMounted) {
                              let usuarios = response.data.data.pedidos;
                              for (let i = 0; i < usuarios.length; i++) {
                                if (usuarios[i].idUser == otherUserId) {
                                  setButtonChat(true);
                                  setButtonsAccept(false);
                                  setButtonsAdd(true);
                                  iReceivedInvite = true;
                                  setDisplay("flex");
                                  console.log("i received");
                                  break;
                                } else {
                                  setButtonChat(true);
                                  setButtonsAccept(true);
                                  setButtonsAdd(false);
                                  iReceivedInvite = false;
                                  setDisplay("flex");
                                  console.log("i didnt receive");
                                }
                              }
                            }
                          })
                          .catch(function (error) {
                            console.log(error.response.data);
                            setButtonChat(true);
                            setButtonsAccept(true);
                            setButtonsAdd(false);
                            iReceivedInvite = false;
                            console.log("i didnt receive");
                            setDisplay("flex");
                          });
                      }
                    });
                }
              }
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    return () => {
      isMounted = false;
    };
  }, [isFocused, isStatus]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.pic} resizeMode="cover" />
      <Text style={styles.tituloText}>Name</Text>
      <Text style={styles.input}>{name}</Text>
      <Text style={styles.tituloText}>About</Text>
      <Text style={styles.input}>{description}</Text>
      <Text style={styles.tituloText}>Company</Text>
      <Text style={styles.input}>{company}</Text>
      <Text style={styles.tituloText}>Role</Text>
      <Text style={styles.input}>{role}</Text>
      {!buttonChat ? (
        <TouchableOpacity
          disabled={buttonChat}
          style={styles.chatBtn}
          onPress={() => {}}
        >
          <Text style={styles.updateText}>CHAT</Text>
        </TouchableOpacity>
      ) : null}
      {!buttonsAdd ? (
        <TouchableOpacity
          disabled={buttonsAdd}
          style={styles.reject}
          onPress={() => {
            apiMatch
              .put(`/api/v1/PedidoMatch/rejeitar`, null, {
                params: {
                  IdUserSolicitante: otherUserId,
                  idUserAprovador: userId,
                },
              })
              .then(function (response) {
                props.naviganavigation.goBack();
                mudaStatus();
                console.log("pedido rejeitado");
              })
              .catch(function (error) {
                console.log(error.response.data);
              });
          }}
        >
          <Icon size={80} name="close" type="material" color="#cc0088" />
        </TouchableOpacity>
      ) : null}
      {!buttonsAdd ? (
        <TouchableOpacity
          disabled={buttonsAdd}
          style={styles.accept}
          onPress={() => {
            apiMatch
              .post(`/api/v1/PedidoMatch`, {
                IdUserSolicitante: userId,
                idUserAprovador: otherUserId,
              })
              .then(function (response) {
                props.navigation.goBack();
                mudaStatus();
                console.log("pedido enviado");
              })
              .catch(function (error) {
                console.log(error.response);
              });
          }}
        >
          <Icon size={80} name="bolt" type="material" color="#ffcc33" />
        </TouchableOpacity>
      ) : null}
      {!buttonsAccept ? (
        <TouchableOpacity
          disabled={buttonsAccept}
          style={styles.reject}
          onPress={() => {
            apiMatch
              .put(`/api/v1/PedidoMatch/rejeitar`, null, {
                params: {
                  IdUserSolicitante: otherUserId,
                  idUserAprovador: userId,
                },
              })
              .then(function (response) {
                props.navigation.goBack();
                mudaStatus();
                console.log("pedido rejeitado");
              })
              .catch(function (error) {
                console.log(error.response.data);
              });
          }}
        >
          <Icon size={80} name="close" type="material" color="#cc0088" />
        </TouchableOpacity>
      ) : null}
      {!buttonsAccept ? (
        <TouchableOpacity
          disabled={buttonsAccept}
          style={styles.accept}
          onPress={() => {
            apiMatch
              .put(`/api/v1/PedidoMatch/aceitar`, null, {
                params: {
                  IdUserSolicitante: otherUserId,
                  idUserAprovador: userId,
                },
              })
              .then(function (response) {
                props.navigation.goBack();
                mudaStatus();
                console.log("pedido aceito");
              })
              .catch(function (error) {
                console.log(error.response);
              });
          }}
        >
          <Icon size={80} name="bolt" type="material" color="#ffcc33" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Profile;
