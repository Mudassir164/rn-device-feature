import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../Constant/Colors";
import OutlineButton from "../UI/OutlineButton";
import { fetchDetails } from "../Utility/db";

const PlaceDetailScreen = ({ route, navigation }) => {
  const { placeId } = route.params;
  const [LoadFetchPlace, setLoadFetchPlace] = React.useState({});

  React.useEffect(() => {
    async function LoadFetchPlaceData() {
      const place = await fetchDetails(placeId);
      setLoadFetchPlace(place);
      navigation.setOptions({
        title: place.name,
      });
    }
    LoadFetchPlaceData();
  }, [placeId, setLoadFetchPlace, navigation]);

  function ViewMapScreenHandler() {
    navigation.navigate("Map", {
      lat: LoadFetchPlace.location.lat,
      lng: LoadFetchPlace.location.lng,
    });
  }

  return (
    <View style={styles.Container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: LoadFetchPlace.image }} style={styles.image} />
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{LoadFetchPlace.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <OutlineButton icon="map" onPress={ViewMapScreenHandler}>
          View on Map
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.gray700,
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  addressContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
  },
  address: {
    fontSize: 16,
    color: Colors.primary500,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlaceDetailScreen;
