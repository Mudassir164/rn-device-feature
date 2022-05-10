import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ Places }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={Places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          onSelect={() => {
            navigation.navigate("Place Details", {
              placeId: item.id,
            });
          }}
          image={item.image}
          name={item.name}
          address={item.address}
        />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({});
