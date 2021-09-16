import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { startCase } from "lodash";

import COLORS from "constants/colors";

const Button = ({ style, fontSize = 18, size = "normal", borderRadius, children, backgroundColor = COLORS.PRIMARY, ...props }) => {
  const borderRadiusStyle = StyleSheet.create(borderRadius ? {
    borderRadius
  } : {})
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <LinearGradient
        colors={[backgroundColor, COLORS.PRIMARY_LIGHT]}
        style={[
          styles.linearGradient,
          styles[`linearGradient${startCase(size)}`],
          borderRadiusStyle,
        ]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Text 
          style={[
            styles.text,
            {
              fontSize: fontSize,
            }
          ]}
        >{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Later on in your styles..
const styles = StyleSheet.create({
  button: {},
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
  },
  linearGradientBig: {
    paddingVertical: 20,
    borderRadius: 30,
  },
  text: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Button;
