import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import COLORS from "constants/colors";
import Icon from "elements/Icon";

const IconButton = ({ active, icon, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Icon
        color={active ? icon.color ? icon.color : COLORS.PRIMARY : COLORS.GRAY}
        name={icon?.name}
        type={icon?.type}
        size={icon?.size || 40}
        img={icon?.img}
      />
    </TouchableOpacity>
  );
};

// Later on in your styles..
const styles = StyleSheet.create({
  button: {},
});

export default IconButton;
