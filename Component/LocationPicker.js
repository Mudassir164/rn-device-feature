import { StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import OutlineButton from "../UI/OutlineButton";
import Colors from "../Constant/Colors";
// import MapboxGL from "@react-native-mapbox-gl/maps";

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview, getPlaces } from "../Utility/Location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const LocationPicker = ({ onPickedLocation }) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [Pickedlocation, setPickedLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const mapedPickedLocation = route.params && {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  };

  // ...........................//.............................

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

  // ...........................//.............................

  useEffect(() => {
    if (isFocused && route.params) {
      const mapedPickedLocation = route.params && {
        lat: route.params.latitude,
        lng: route.params.longitude,
      };
    }
    setPickedLocation(mapedPickedLocation);
  }, [isFocused, route]);

  // ...........................//.............................

  useEffect(() => {
    async function handleLocation() {
      if (Pickedlocation) {
        const address = await getPlaces(
          Pickedlocation.latitude,
          Pickedlocation.longitude
        );

        onPickedLocation({ ...Pickedlocation, address: address });
      }
    }
    handleLocation();
  }, [Pickedlocation, onPickedLocation]);

  // ...........................//.............................

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }
  // ...........................//.............................

  function PickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = (
    <Text style={styles.mapText}>No Location is set here</Text>
  );
  if (Pickedlocation) {
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(Pickedlocation.lat, Pickedlocation.lng),
        }}
        style={styles.mapPreview}
      />
    );
  }
  return (
    <View>
      <View style={styles.LocationContainer}>{locationPreview}</View>
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
    overflow: "hidden",
    borderRadius: 10,
  },
  LocationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  Map: {
    width: "100%",
    height: "100%",
  },
  mapText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    height: "100%",
  },
});
