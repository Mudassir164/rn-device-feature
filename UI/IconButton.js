import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "react-native-vector-icons";

const IconButton = ({ name, size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 20 }}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
