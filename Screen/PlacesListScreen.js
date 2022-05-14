import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import PlacesList from "../Component/PlacesList";
import IconButton from "../UI/IconButton";
import Colors from "../Constant/Colors";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../Utility/db";

const place = [
  {
    id: "1",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
    name: "Lasagna",
    address: "123,123,123",
  },
  {
    id: "2",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
    name: "Lasagna",
    address: "123,123,123",
  },
  {
    id: "3",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
    name: "Lasagna",
    address: "123,123,123",
  },
];

const PlacesListScreen = ({ navigation, route }) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function LoadPlace() {
      const places = await fetchPlaces();
      setPlaces(places);
    }
    if (isFocused) {
      LoadPlace();
      // setPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            name="ios-add"
            size={30}
            color={Colors.gray700}
            onPress={() => {
              navigation.navigate("Add Place");
            }}
          />
        );
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <PlacesList Places={places} />
    </View>
  );
};

export default PlacesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray700,
    padding: 5,
  },
});
