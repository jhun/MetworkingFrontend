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

// function HomeScreen({ navigation, route }) {
//   React.useEffect(() => {
//     if (route.params?.post) {
//       // Post updated, do something with `route.params.post`
//       // For example, send the post to the server
//     }
//   }, [route.params?.post]);

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         title="Create post"
//         onPress={() =>
//           navigation.navigate("CreatePost", { name: "Post screen" })
//         }
//       />
//       <Button
//         title="Update the title"
//         onPress={() => navigation.setOptions({ title: "Updated!" })}
//       />
//       <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
//     </View>
//   );
// }

// function CreatePostScreen({ navigation, route }) {
//   const [postText, setPostText] = React.useState("");

//   return (
//     <>
//       <TextInput
//         multiline
//         placeholder="What's on your mind?"
//         style={{ height: 200, padding: 10, backgroundColor: "white" }}
//         value={postText}
//         onChangeText={setPostText}
//       />
//       <Button
//         title="Done"
//         onPress={() => {
//           // Pass params back to home screen
//           navigation.navigate("Home", { post: postText });
//         }}
//       />
//     </>
//   );
// }

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
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
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
