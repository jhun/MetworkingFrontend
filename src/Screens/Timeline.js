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
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoadTimeline from "./LoadTimeline";
import CustomDrawer from "../Components/CustomDrawer";
import Home from "./Home";
import MetMe from "./MetMe";
import api from "../Services/Axios";

const Drawer = createDrawerNavigator();

const Timeline = (props, { route, navigation }) => {
  const { user } = props.route.params;
  return (
    <Drawer.Navigator
      initialRouteName="Met Timeline"
      drawerPosition="right"
      drawerStyle={{ width: "60%", backgroundColor: "#111111dd" }}
      drawerContentOptions={{
        activeTintColor: "#ffffff",
        activeBackgroundColor: "transparent",
        itemStyle: styles.listItem,
        labelStyle: styles.listItemLabel,
      }}
      drawerContent={(props) => <CustomDrawer {...props} user={user} />}
    >
      <Drawer.Screen
        name="Me"
        component={MetMe}
        initialParams={{ user: user }}
        options={{
          drawerLabel: "Me",
          drawerIcon: () => (
            <Icon
              size={22}
              name="account"
              type="material-community"
              color="#ffffff"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Met Timeline"
        component={LoadTimeline}
        initialParams={{ user: user, navigation }}
        options={{
          drawerLabel: "Met Timeline",
          drawerIcon: () => (
            <Icon
              size={22}
              name="format-list-bulleted"
              type="material"
              color="#ffffff"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Metworking"
        component={LoadTimeline}
        options={{
          drawerLabel: "My Metworking",
          drawerIcon: () => (
            <Icon size={22} name="bolt" type="material" color="#ffffff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Met Adds"
        component={LoadTimeline}
        options={{
          drawerLabel: "Met Adds",
          drawerIcon: () => (
            <Icon
              size={22}
              name="add-comment"
              type="material"
              color="#ffffff"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Met Map"
        component={LoadTimeline}
        options={{
          drawerLabel: "Met Map",
          drawerIcon: () => (
            <Icon
              size={22}
              name="map-outline"
              type="material-community"
              color="#ffffff"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Met Boosts"
        component={LoadTimeline}
        options={{
          drawerLabel: "Met Boosts",
          drawerIcon: () => (
            <Icon
              size={22}
              name="battery-charging"
              type="material-community"
              color="#ffffff"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={LoadTimeline}
        options={{
          drawerLabel: "Settings",
          drawerIcon: () => (
            <Icon size={22} name="settings" type="material" color="#ffffff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Home}
        options={{
          drawerLabel: "Logout",
          drawerIcon: () => (
            <Icon size={22} name="logout" type="material" color="#ffffff" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginVertical: 0,
    borderTopWidth: 0.15,
    borderTopColor: "#999999",
    padding: 0,
  },
  listItemLabel: {
    width: "150%",
    fontSize: 10,
    fontWeight: "normal",
    color: "#ffffff",
    textAlign: "left",
    textTransform: "uppercase",
    marginLeft: -20,
  },
});

export default Timeline;
