import React, { useState, useEffect } from "react";
import { Text, Image, StyleSheet, SafeAreaView } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import api from "../Services/Axios";

const CustomDrawer = (props) => {
  const user = props.user;
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
