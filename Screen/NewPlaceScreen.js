import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useCallback } from "react";
import Colors from "../Constant/Colors";
import ImagePicker from "../Component/ImagePicker";
import LocationPicker from "../Component/LocationPicker";
import Place from "../Models/Place";
import { InsertPlaces } from "../Utility/db";

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const ongetText = (text) => {
    setTitle(text);
  };
  const takeImageHandler = (image) => {
    setImage(image);
  };
  const pickedLocationHandler = useCallback((location) => {
    setLocation(location);
  }, []);
  const savePlaceHandler = async () => {
    if (!title || !image || !location) {
      alert("Please fill all the fields");
      return;
    }
    const place = new Place(title, image, location);
    const check = await InsertPlaces(place);

    navigation.navigate("All Places", {
      place: place,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.input} onChangeText={ongetText} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickedLocation={pickedLocationHandler} />
      <View style={{ padding: 30 }}>
        <Button
          title="Save Place"
          onPress={savePlaceHandler}
          color={Colors.primary500}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray700,
    padding: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,

    color: Colors.primary500,
  },
  input: {
    backgroundColor: Colors.primary500,
    color: Colors.gray700,
    fontSize: 18,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    // margin: 10,
  },
  SavePlace: {
    margin: 20,
    backgroundColor: Colors.primary500,
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
  },
});
