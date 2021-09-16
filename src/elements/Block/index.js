import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { compact } from "lodash";

import COLORS from "constants/colors";
import Indicator from "elements/Indicator";
import LoadingIndicator from "elements/LoadingIndicator";

const Block = ({ title, noIndicator, style, innerStyle, noPadding, children, loading, rightComponent = null }) => {
  return (
    <View style={[styles.container, style]}>
      <View
        style={compact([styles.block, noPadding && styles.containerNoPadding, innerStyle])}
      >
        <View style={styles.topContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {rightComponent}
        </View>
        {!noIndicator && <Indicator />}
        {loading && (
          <View style={styles.loadingWrapper}>
            <LoadingIndicator />
          </View>
        )}
        {children}
      </View>
    </View>
  );
};

// Later on in your styles..
const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
  },
  block: {
    padding: 20,
    backgroundColor: COLORS.SECONDARY_BG,
    width: "100%",
    borderRadius: 20,
  },
  containerNoPadding: {
    padding: 0,
  },
  title: {
    color: COLORS.GRAY,
    fontSize: 20,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loadingWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    zIndex: 100,
  },
});

export default Block;
