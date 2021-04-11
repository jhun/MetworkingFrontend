import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";

import { apiGeo } from "../Axios";

var user;

const LOCATION_TRACKING = "location-tracking";

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    apiGeo
      .post("/Geolocalizacao", {
        userId: user,
        dateTime: new Date(),
        latitude: lat,
        longitude: long,
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});

export const stopLocationTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
};

const startLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 60000,
    distanceInterval: 0,
    foregroundService: {
      notificationTitle: "Metworking",
      notificationBody: "Geolocalização ativada",
    },
    pausesUpdatesAutomatically: false,
  });
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TRACKING
  );

  console.log("tracking started?", hasStarted);
};

export const configGeoLocation = async (userId) => {
  user = userId;
  let res = await Permissions.askAsync(Permissions.LOCATION);
  if (res.status !== "granted") {
    console.log("Permission to access location was denied");
  } else {
    console.log("Permission to access location granted");
    startLocationTracking();
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
