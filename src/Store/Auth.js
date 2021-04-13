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
        const userIdStore = await AsyncStorage.getItem("@userId");
        setUser(JSON.parse(userIdStore));
        setLogged(res);
      } else {
        setLogged(false);
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  const LoginMet = async (userId) => {
    await AsyncStorage.setItem("@loggedin", JSON.stringify(true));
    await AsyncStorage.setItem("@userId", JSON.stringify(userId));
    setUser(userId);
    setLogged(true);
  };

  const Logout = async () => {
    await AsyncStorage.clear();
    setLogged(false);
    stopLocationTracking();
  };

  return (
    <AuthContext.Provider
      value={{ loading, logged, LoginMet, Logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
