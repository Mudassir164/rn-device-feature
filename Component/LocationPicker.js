import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import OutlineButton from "../UI/OutlineButton";
import Colors from "../Constant/Colors";
// import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

const LocationPicker = () => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermission() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const PermissionResponce = await requestPermission();

      return PermissionResponce.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "You have denied the permission to access the camera. Please go to settings and allow the permission."
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
  }
  function PickOnMapHandler() {}
  return (
    <View>
      <View style={styles.LocationContainer}></View>
      <View style={styles.LocationButtonContainer}>
        <OutlineButton onPress={getLocationHandler} icon="location">
          Locate user
        </OutlineButton>
        <OutlineButton onPress={PickOnMapHandler} icon="map">
          Pick on map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  LocationContainer: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary500,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  LocationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
