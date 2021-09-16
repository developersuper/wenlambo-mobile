import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { WebView } from "react-native-webview";


import Block from "elements/Block";

const TradingView = ({ currency }) => {
  return (
    <Block style={styles.container} noPadding noIndicator>
      <WebView
        source={{
          uri: `https://www.wen-lambo.app/trading-view?currency=${currency.address}`,
        }}
        style={styles.webview}
        scalesPageToFit={false}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  webview: {
    width: "100%",
    height: 500,
  },
});

export default TradingView;
