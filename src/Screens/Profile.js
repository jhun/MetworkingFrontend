import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import api from "../Services/Axios";

const Profile = (props) => {
  const { otherUserId } = props.route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(
    "https://livestreaming-demobucket-1tv84b35cym3j.s3.amazonaws.com/pic2.png"
  );

  useEffect(() => {
    api
      .get(`/api/v1/User/${otherUserId}`)
      .then(function (response) {
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setDescription(response.data.data.description);
        setCompany(response.data.data.company);
        setRole(response.data.data.role);
        setImage(response.data.data.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.pic} resizeMode="contain" />
      <Text style={styles.tituloText}>Name</Text>
      <Text style={styles.input}>{name}</Text>
      <Text style={styles.tituloText}>About</Text>
      <Text style={styles.input}>{description}</Text>
      <Text style={styles.tituloText}>Company</Text>
      <Text style={styles.input}>{company}</Text>
      <Text style={styles.tituloText}>Role</Text>
      <Text style={styles.input}>{role}</Text>
      <TouchableOpacity style={styles.chatBtn} onPress={() => {}}>
        <Text style={styles.updateText}>CHAT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reject}>
        <Icon size={80} name="close" type="material" color="#cc0088" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.accept}>
        <Icon size={80} name="bolt" type="material" color="#ffcc33" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fdb839",
    alignItems: "center",
    justifyContent: "flex-start",
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
    display: "none",
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
    top: 500,
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
    top: 500,
    transform: [{ translateX: 35 }],
    paddingTop: 9,
  },
});
export default Profile;
