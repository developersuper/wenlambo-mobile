import React from "react";
import { StyleSheet } from "react-native";

import COLORS from "constants/colors";
import GradientContainer from "elements/GradientContainer";

const Indicator = () => {
  return (
    <GradientContainer
      style={styles.container}
      start={[0, 0]}
      end={[1, 0]}
      colors={[COLORS.PRIMARY, COLORS.SECONDARY_BG]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 2,
    flex: 0,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Indicator;
