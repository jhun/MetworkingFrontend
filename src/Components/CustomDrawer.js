import React, { useState, useEffect, useContext } from "react";
import { Text, Image, StyleSheet, SafeAreaView } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import api from "../Services/Axios";
import AuthContext from "../Store/Auth";

const CustomDrawer = (props) => {
  const { Logout, user } = useContext(AuthContext);
  const [pic, setPic] = useState(
    "https://livestreaming-demobucket-1tv84b35cym3j.s3.amazonaws.com/pic.png"
  );
  const [name, setName] = useState("");

  useEffect(() => {
    api
      .get(`/api/v1/User/${user}`)
      .then(function (response) {
        setPic(response.data.data.image);
        setName(response.data.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Image source={{ uri: pic }} style={styles.sideMenuProfileIcon} />
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "grey",
          marginTop: 15,
        }}
      >
        {name}
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="sair"
          onPress={() => Logout()}
          icon={() => (
            <Icon size={22} name="logout" type="material" color="#ffffff" />
          )}
          labelStyle={{
            fontSize: 10,
            color: "#ffffff",
            textAlign: "left",
            textTransform: "uppercase",
            marginLeft: -20,
          }}
        />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "grey",
          marginBottom: 30,
        }}
      >
        www.metworking.com
      </Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: 30,
  },
});

export default CustomDrawer;
