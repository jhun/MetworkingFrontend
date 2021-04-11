import React, { useEffect, useState, useContext } from "react";

import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  LogBox,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Icon } from "react-native-elements";

import Home from "../Screens/Home";
import Login from "../Screens/Login";
import LoginFail from "../Screens/LoginFail";
import Cadastro from "../Screens/Cadastro";
import CadastroSuccess from "../Screens/CadastroSuccess";
import CadastroFail from "../Screens/CadastroFail";
import CadastroUpdated from "../Screens/CadastroUpdated";
import CadastroUpdateFail from "../Screens/CadastroUpdateFail";
import Timeline from "../Screens/Timeline";
import Profile from "../Screens/Profile";

import MetworkingHeaderLogo from "../Components/MetworkingHeaderLogo";
import AuthContext from "../Store/Auth";

const Stack = createStackNavigator();

const headerStyle = {
  headerRight: () => <MetworkingHeaderLogo />,
  headerStyle: {
    backgroundColor: "#683d76",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "center",
};

export default function NavigationMetworking() {
  const { logged } = useContext(AuthContext);

  const NotLogged = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="float"
        animation="fade"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          ...headerStyle,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => <MetworkingHeaderLogo />,
            headerRight: () => {},
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />
        <Stack.Screen
          name="Login Falhou"
          component={LoginFail}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />
        <Stack.Screen
          name="Cadastro Falhou"
          component={CadastroFail}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />
        <Stack.Screen
          name="Cadastro Sucesso"
          component={CadastroSuccess}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />
      </Stack.Navigator>
    );
  };

  const Logged = () => {
    return (
      <Stack.Navigator
        headerMode="float"
        animation="fade"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          ...headerStyle,
        }}
      >
        <Stack.Screen
          name="Timeline"
          component={Timeline}
          options={({ navigation, route }) => ({
            headerTitle: (props) => <MetworkingHeaderLogo />,
            headerRight: (props) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <Icon
                  name="menu"
                  type="material"
                  size={26}
                  color="#ffffff"
                  style={styles.menu}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Cadastro Atualizado"
          component={CadastroUpdated}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />
        <Stack.Screen
          name="Atualização Cadastro Falhou"
          component={CadastroUpdateFail}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />

        <Stack.Screen
          name="Mate"
          component={Profile}
          options={({ navigation, route }) => ({
            title: "Metworking",
            headerRight: (props) => <MetworkingHeaderLogo />,
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>{logged ? Logged() : NotLogged()}</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
    marginRight: 15,
  },
});
