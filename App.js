// In App.js in a new project

import React, { useContext, useEffect } from "react";
import NavigationMetworking from "./src/Navigation";
import FlashMessage from "react-native-flash-message";

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
import { AuthProvider } from "./src/Store/Auth";

LogBox.ignoreLogs(["Remote debugger"]);

function App() {
  return (
    <AuthProvider>
      <NavigationMetworking></NavigationMetworking>
      <FlashMessage position="top" />
    </AuthProvider>
  );
}

export default App;
