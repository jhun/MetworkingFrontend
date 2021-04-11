import React, { useState, useEffect, useContext } from "react";
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
import Interests from "./Interests";
import Metworking from "./Metworking";
import Solicitacoes from "./Solicitacoes";
import SolicitacoesEnviadas from "./SolicitacoesEnviadas";
import MetMapa from "./MetMapa";
import Boost from "./Boost";
import AuthContext from "../Store/Auth";

const Drawer = createDrawerNavigator();

const Timeline = (props, { route, navigation }) => {
  const { user } = useContext(AuthContext);
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
          drawerLabel: "Perfil",
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
        name="Interests"
        component={Interests}
        initialParams={{ user: user }}
        options={{
          drawerLabel: "Meus Interesses",
          drawerIcon: () => (
            <Icon
              size={22}
              name="playlist-add-check"
              type="material"
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
          drawerLabel: "Linha do tempo",
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
        component={Metworking}
        initialParams={{ user: user, navigation }}
        options={{
          drawerLabel: "Meu Metworking",
          drawerIcon: () => (
            <Icon size={22} name="bolt" type="material" color="#ffffff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Met Received"
        component={Solicitacoes}
        initialParams={{ user: user, navigation }}
        options={{
          drawerLabel: "Solicitações Recebidas",
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
        name="Met Sent"
        component={SolicitacoesEnviadas}
        initialParams={{ user: user, navigation }}
        options={{
          drawerLabel: "Solicitações Enviadas",
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
        component={MetMapa}
        options={{
          drawerLabel: "Met Mapa",
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
        component={Boost}
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
        component={Boost}
        options={{
          drawerLabel: "Configurações",
          drawerIcon: () => (
            <Icon size={22} name="settings" type="material" color="#ffffff" />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={Home}
        options={{
          drawerLabel: "Sair",
          drawerIcon: () => (
            <Icon size={22} name="logout" type="material" color="#ffffff" />
          ),
        }}
      /> */}
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
