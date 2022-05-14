import React, { useState, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../Constant/Colors";
import IconButton from "../UI/IconButton";

const MapScreen = ({ navigation, route }) => {
  const initialRegion = route.params && {
    latitude: route.params.lat,
    longitude: route.params.lng,
  };
  console.log(initialRegion);
  const [selectedLocation, setSelectedLocation] = useState(initialRegion);

  const region = {
    latitude: initialRegion ? initialRegion.lat : 37.78,
    longitude: initialRegion ? initialRegion.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationHandler(event) {
    if (initialRegion) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      latitude: lat,
      longitude: lng,
    });
  }
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location selected",
        "Please select a location on the map first!",
        [{ text: "Okay" }]
      );
      return;
    }
    navigation.navigate("Add Place", {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialRegion) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save"
          size={25}
          color={Colors.gray700}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialRegion]);
  return (
    <MapView
      style={styles.MapScreen}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title="Your Location"
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  MapScreen: {
    flex: 1,
  },
});

export default MapScreen;
