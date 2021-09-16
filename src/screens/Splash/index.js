import React from "react";
import { Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import logoImg from "assets/images/logo.png";
import { useWalletConnect } from "components/WalletConnect";
import Button from "elements/Button";
import GradientContainer from "elements/GradientContainer";

const Splash = ({ history }) => {
  const { createSession, killSession, session, signTransaction } =
    useWalletConnect();
      const goMain = () => {
    history.push("/main/home");
  };
  
  return (
    <GradientContainer style={styles.container} locations={[0, 0.7]}>
      <Image source={logoImg} style={styles.logoImg} resizeMode="contain" />
      <Button size="big" onPress={() => {}}>
        CONNECT WALLET
      </Button>
      <Button size="big" onPress={goMain} style={{ marginTop: 20 }}>
        CONNECT LATER
      </Button>
      <StatusBar style="auto" />
    </GradientContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImg: {
    width: 250,
    height: 300,
    marginBottom: 20,
  },
});

export default Splash;
