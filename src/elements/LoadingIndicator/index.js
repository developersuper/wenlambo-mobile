import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";

import COLORS from "constants/colors";

const LoadingIndicator = () => {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setAngle((angle) => angle + 0.2);
    }, 50);
    return () => clearInterval(timeInterval);
  }, []);
  return (
    <ProgressCircle
      style={styles.indicator}
      progress={1}
      progressColor={COLORS.PRIMARY}
      startAngle={angle}
      endAngle={angle + Math.PI}
    />
  );
};

const styles = StyleSheet.create({
  indicator: { height: 100, width: 100 },
});

export default LoadingIndicator;
