import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "react-router-native";

import COLORS from "constants/colors";
import IconButton from "elements/IconButton";

const items = [
  { path: "chart", icon: { name: "equalizer" } },
  { path: "swap", icon: { name: "swap-horizontal-circle" } },
  { path: "wallet", icon: { name: "account-balance-wallet" } },
];

const Footer = ({ history, match }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <IconButton
          icon={item.icon}
          active={history.location.pathname === `${match.url}/${item.path}`}
          style={styles.button}
          key={item.path}
          onPress={() => {
            history.replace(`${match.url}/${item.path}`);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.SECONDARY_BG,
    width: "100%",
    paddingHorizontal: 50,
  },
  button: {
    padding: 20,
  },
});

export default Footer;
