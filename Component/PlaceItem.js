import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import Colors from "../Constant/Colors";
import { deletePlace } from "../Utility/db";

const PlaceItem = (props) => {
  // async function deleteHandler() {
  //   Alert.alert(
  //     "Are you sure you want to delete this place?",
  //     "",
  //     [
  //       { text: "No", style: "default" },
  //       {
  //         text: "Yes",
  //         onPress: () => {
  //           deletePlace(props.placeId);
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // }
  // const deleteHandler = async () => {
  //   await deletePlace(props.id);
  // };

  return (
    <Pressable
      onPress={props.onSelect}
      style={styles.placeItem}
      // onLongPress={deleteHandler}
    >
      <Image
        style={styles.image}
        source={{
          // uri: "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
          uri: props.image,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    // paddingVertical: 15,
    // paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary500,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  image: {
    width: 80,
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#ccc",
    borderColor: Colors.accent500,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  title: {
    color: Colors.gray700,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    color: Colors.gray700,
    fontSize: 16,
  },
});

export default PlaceItem;
