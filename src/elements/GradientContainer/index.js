import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "constants/colors";

const GradientContainer = ({
  style,
  children,
  colors,
  locations,
  start,
  ...props
}) => {
  return (
    <LinearGradient
      colors={colors || [COLORS.PRIMARY_BG, COLORS.BLACK]}
      style={[styles.linearGradient, style]}
      locations={locations || [0, 1]}
      start={start}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default GradientContainer;
