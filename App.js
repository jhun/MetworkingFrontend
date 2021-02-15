// In App.js in a new project

import * as React from "react";
import { Text, TextInput, View, Button, Image, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import MetworkingHeaderLogo from "./src/Components/MetworkingHeaderLogo";

import Home from "./src/Screens/Home";
import Login from "./src/Screens/Login";
import LoginFail from "./src/Screens/LoginFail";
import Cadastro from "./src/Screens/Cadastro";
import CadastroSuccess from "./src/Screens/CadastroSuccess";
import CadastroFail from "./src/Screens/CadastroFail";

import Timeline from "./src/Screens/Timeline";

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
          name="Timeline"
          component={Timeline}
          options={{
            headerRight: () => <MetworkingHeaderLogo />,
          }}
        />

        {/* <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
