import React from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";

import logoImg from "assets/images/logo.png";
import IconButton from "elements/IconButton";

import Settings from "./Settings";
import NetworkAndCurrencySetting from "./NetworkAndCurrencySetting";

const Header = ({ toggleSidebar }) => {

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <IconButton 
        onPress={toggleSidebar}
        icon={{ name: "menu" }} 
        active />
      <Image source={logoImg} style={styles.logoImg} resizeMode="contain" />
      <View style={styles.settingGroup}>
        <NetworkAndCurrencySetting />
        <Settings />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    paddingBottom: 15,
  },
  logoImg: {
    height: 100,
    width: 120,
  },
  settingGroup: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default Header;
