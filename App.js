// In App.js in a new project

import * as React from "react";
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

import MetworkingHeaderLogo from "./src/Components/MetworkingHeaderLogo";

import Home from "./src/Screens/Home";
import Login from "./src/Screens/Login";
import LoginFail from "./src/Screens/LoginFail";
import Cadastro from "./src/Screens/Cadastro";
import CadastroSuccess from "./src/Screens/CadastroSuccess";
import CadastroFail from "./src/Screens/CadastroFail";
import CadastroUpdated from "./src/Screens/CadastroUpdated";
import CadastroUpdateFail from "./src/Screens/CadastroUpdateFail";
import Timeline from "./src/Screens/Timeline";
import Profile from "./src/Screens/Profile";

LogBox.ignoreLogs(["Remote debugger"]);

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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
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
          name="Mate"
          component={Profile}
          options={({ navigation, route }) => ({
            title: "Metworking",
            headerRight: (props) => <MetworkingHeaderLogo />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
    marginRight: 15,
  },
});

export default App;
