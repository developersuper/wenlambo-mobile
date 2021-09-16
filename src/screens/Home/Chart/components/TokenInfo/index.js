import React from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import currencyFormatter from "currency-formatter";

import COLORS from "constants/colors";
import Block from "elements/Block";
import Button from "elements/Button";
import { TOKEN_INFO } from "queries/history";

const TokenInfo = ({ currency = {} }) => {
  const { address, name, symbol } = currency;
  const { data, loading } = useQuery(TOKEN_INFO, {
    variables: {
      address,
    },
  });
  const openExternal = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  return (
    <Block style={styles.container} loading={loading} title="Token Info">
      <View style={styles.infoWrapper}>
        <Text style={styles.subTitle}>Name</Text>
        <Text style={styles.info}>
          {name} ({symbol})
        </Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.subTitle}>Price</Text>
        <Text style={styles.info}>
          {currencyFormatter.format(data?.tokenInfo?.price || 0, {
            locale: "en-US",
            precision: (`${data?.tokenInfo?.price}`.split(".")[1] || "0")
              .length,
          })}
        </Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.subTitle}>Total Supply</Text>
        <Text style={styles.info}>
          {currencyFormatter.format(data?.tokenInfo?.totalSupply || 0, {
            locale: "en-US",
            format: "%v",
          })}
        </Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.subTitle}>Market Cap</Text>
        <Text style={styles.info}>
          {currencyFormatter.format(data?.tokenInfo?.marketCap || 0, {
            locale: "en-US",
          })}
        </Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.subTitle}>Total tx</Text>
        <Text style={styles.info}>
          {currencyFormatter.format(data?.tokenInfo?.transfers || 0, {
            locale: "en-US",
            format: "%v",
            precision: 0,
          })}
        </Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.subTitle}>Liquidity</Text>
        <Text style={styles.info}>
          {currencyFormatter.format(data?.tokenInfo?.totalLiquidityBNB || 0, {
            locale: "en-US",
            format: "%v",
          })}{" "}
          BNB (
          {currencyFormatter.format(data?.tokenInfo?.totalLiquidityUSD || 0, {
            locale: "en-US",
          })}
          )
        </Text>
      </View>
      <Button
        onPress={() => openExternal(`https://bscscan.com/token/${address}`)}
        style={styles.button}
      >
        Transactions
      </Button>
      <Button
        onPress={() =>
          openExternal(`https://bscscan.com/address/${address}#code`)
        }
        style={styles.button}
      >
        Contract
      </Button>
      <Button
        onPress={() =>
          openExternal(`https://bscscan.com/token/${address}#balances`)
        }
        style={styles.button}
      >
        Holders
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  infoWrapper: {
    padding: 5,
  },
  subTitle: {
    color: COLORS.GRAY,
    fontSize: 18,
    textAlign: "center",
  },
  info: {
    color: COLORS.WHITE,
    fontSize: 16,
    textAlign: "center",
    marginTop: 3,
  },
  button: {
    marginTop: 10,
  },
});

export default TokenInfo;
