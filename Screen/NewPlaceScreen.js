import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React from "react";
import Colors from "../Constant/Colors";
import ImagePicker from "../Component/ImagePicker";
import LocationPicker from "../Component/LocationPicker";

const NewPlaceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.input} />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray700,
    padding: 10,
  },
  title: {
    fontSize: 18,

    color: Colors.primary500,
  },
  input: {
    backgroundColor: Colors.primary700,
    color: Colors.gray700,
    fontSize: 18,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    // margin: 10,
  },
});
