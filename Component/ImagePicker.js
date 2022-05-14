import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import Colors from "../Constant/Colors";
import OutlineButton from "../UI/OutlineButton";

const ImagePicker = ({ onTakeImage }) => {
  const [CameraPermissonInformation, requestPermission] =
    useCameraPermissions();
  const [PickedImage, setPickedImage] = useState(null);

  async function verifyPermissons() {
    if (CameraPermissonInformation.status === PermissionStatus.UNDETERMINED) {
      const PermissionResponce = await requestPermission();

      return PermissionResponce.granted;
    }
    if (CameraPermissonInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "You have denied the permission to access the camera. Please go to settings and allow the permission."
      );
      return false;
    }
    return true;
  }
  async function ImagePickerHandler() {
    const hasPermission = await verifyPermissons();

    if (!hasPermission) {
      return;
    }
    const pickImage = await launchCameraAsync({
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });

    if (!pickImage.cancelled) {
      setPickedImage(pickImage.uri);
      onTakeImage(pickImage.uri);
    }
  }

  let ImagePreview = (
    <Text style={styles.ImagePreviewText}>No Image Selected</Text>
  );
  if (PickedImage) {
    ImagePreview = (
      <Image style={styles.ImagePreview} source={{ uri: PickedImage }} />
    );
  }
  return (
    <View>
      <View style={styles.ImageContainer}>{ImagePreview}</View>
      <OutlineButton
        onPress={ImagePickerHandler}
        icon="ios-camera"
        children="Take Photo"
      />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  ImageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary500,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },

  ImagePreview: {
    width: "100%",
    height: "100%",
  },
  ImagePreviewText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
