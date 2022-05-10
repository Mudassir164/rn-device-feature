import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import Colors from "../Constant/Colors";

const OutlineButton = ({ onPress, icon, children }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button]}>
      <Ionicons
        size={25}
        color={Colors.primary500}
        name={icon}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.primary500,
    padding: 4,
  },
  pressed: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: Colors.primary500,
  },
});
