import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "constants/colors";
import Icon from "elements/Icon";

const BigButton = ({ style, icon, children, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {icon && (
        <Icon
          color={icon?.color || COLORS.PRIMARY}
          name={icon?.name}
          type={icon?.type}
          size={30}
        />
      )}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

// Later on in your styles..
const styles = StyleSheet.create({
  button: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default BigButton;
