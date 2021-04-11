import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  configGeoLocation,
  stopLocationTracking,
} from "../Services/GeoLocation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogged = async () => {
      if (logged) {
        const userIdStore = await AsyncStorage.getItem("@userId");
        configGeoLocation(JSON.parse(userIdStore));
      }
    };
    checkLogged();
  }, [logged]);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await AsyncStorage.getItem("@loggedin");
      if (res !== null) {
        setLogged(res);
      } else {
        setLogged(false);
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  const Login = async (userId) => {
    await AsyncStorage.setItem("@loggedin", JSON.stringify(true));
    await AsyncStorage.setItem("@userId", JSON.stringify(userId));
    setLogged(true);
  };

  const Logout = async () => {
    await AsyncStorage.clear();
    setLogged(false);
    stopLocationTracking();
  };

  return (
    <AuthContext.Provider value={{ logged, Login, Logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
