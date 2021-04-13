import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import LoadingApp from "../Screens/LoadingApp";
import { useIsFocused } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import api from "../Services/Axios";

const Interests = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [isStatus, setStatus] = useState(true);

  const [listaInteresses, setListaInteresses] = useState("");

  const { user } = props.route.params;

  const Interesse = ({ id, name, checkedOut }) => {
    const [checked, toggleChecked] = useState(checkedOut);
    return (
      <CheckBox
        title={name}
        checked={checked}
        onPress={() => {
          // toggleChecked(!checked);
          setIsLoading(true);
          checkAtualizar(user, id, !checked);
        }}
      />
    );
  };

  const renderItem = ({ item }) => (
    <Interesse id={item.id} name={item.name} checkedOut={item.checked} />
  );

  const checkAtualizar = (idUser, idInteresse, checked) => {
    if (checked) {
      api
        .post("/api/v1/UserInterest", null, {
          params: {
            userId: idUser,
            interestId: idInteresse,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log("Interesse adicionado");
            setStatus(!isStatus);
            showMessage({
              message: "Interesse adicionado",
            });
          }
        })
        .catch((error) => {
          if (error.response["status"] === 400) {
            console.log("Inclusão Interesse Falhou");
            setStatus(!isStatus);
          }
          showMessage({
            message: "Inclusão Interesse Falhou",
            type: "danger",
          });
        });
    } else {
      api
        .delete(`/api/v1/UserInterest/User/${idUser}/Interest/${idInteresse}`)
        .then((res) => {
          if (res.status === 200) {
            // console.log("Interesse excluído");
            setStatus(!isStatus);
            showMessage({
              message: "Interesse excluído",
            });
          }
        })
        .catch((error) => {
          if (error.response["status"] === 400) {
            console.log("Exclusão de interesse falhou");
            showMessage({
              message: "Exclusão de interesse Falhou",
              type: "danger",
            });
          }
        });
    }
  };

  useEffect(() => {
    let isMounted = true;
    let list;
    let result;
    api
      .get("/api/v1/Interest")
      .then(function (response) {
        if (isMounted) {
          list = response.data.data;
          list.sort((a, b) => (a.name > b.name ? 1 : -1));
          // console.log(list);
          api
            .get(`/api/v1/UserInterest/User/${user}`)
            .then(function (response) {
              if (isMounted) {
                let listUserInterest = response.data.data.interests;
                // console.log(listUserInterest);
                result = list.map(function (el) {
                  var o = Object.assign({}, el);
                  let isChecked = false;
                  for (let i = 0; i < listUserInterest.length; i++) {
                    if (listUserInterest[i].id == el.id) {
                      isChecked = true;
                      break;
                    }
                  }
                  o.checked = isChecked;
                  return o;
                });
                setListaInteresses(result);
                setIsLoading(false);
                // showMessage({
                //   message: "Lista de interesses carregada.",
                //   type: "success",
                // });
              }
            })
            .catch(function (error) {
              if (isMounted) {
                console.log(error);
                setIsLoading(false);
                showMessage({
                  message: "Erro ao carregar seus interesses.",
                  type: "danger",
                });
              }
            });
        }
      })
      .catch(function (error) {
        if (isMounted) {
          console.log(error);
          setIsLoading(false);
          showMessage({
            message: "Erro ao carregar lista de interesses.",
            type: "danger",
          });
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
        <FlatList
          data={listaInteresses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatView}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  flatView: {
    width: "100%",
    backgroundColor: "white",
  },
  pic: {
    marginTop: 0,
    width: "40%",
    height: "30%",
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
export default Interests;
