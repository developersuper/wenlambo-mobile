import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";

import COLORS from "constants/colors";
import Indicator from "elements/Indicator";
import Button from "elements/Button";
import TextInput1 from "elements/TextInput1";
import { bnbAddress, ethAddress } from "constants/addresses";
import { QUOTE_PRICE } from "queries/history";

const percentages = [25, 50, 75, 100];

const TransactionForm = ({
  title,
}) => {
  const network = useSelector((state) => state.favorites?.network);
  const { address, symbol } = useSelector((state) => state.current?.currency);
  let accountAddress = useSelector((state) => state.account?.address);
  const [inAmount, setInAmount] = useState(0);
  const [outAmount, setOutAmount] = useState(0);

  const mainAddress = network === "bsc" ? bnbAddress : ethAddress;
  const mainSymbol = network === "bsc" ? "BNB" : "ETH";
  const accountBalances = useSelector((state) => state.account?.balances);
  const { data, loading, error } = useQuery(QUOTE_PRICE, {
    variables: {
      from: address,
      to: mainAddress,
    },
    skip: !address,
  });
  let [quotePrice, decimals] = data?.quotePrice?.split(":") || [];

  useEffect(() => {
    if (quotePrice) {
      title === "Buy" ? setOutAmount(1 / quotePrice) : setOutAmount(quotePrice);
    }
  }, [quotePrice, loading, error]);

  const format18 = (number) =>{
    return number && `${number}`.indexOf("e-") !== -1
      ? Number(number).toFixed(18)
      : number;
  }
  return (
    <View style={styles.container}>
      <View style={styles.topTextView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.balance}>
          Balance: {title === "Buy" ? 
          `${accountBalances[mainAddress] || "-"} ${mainSymbol}` : 
          `${accountBalances[address] || "-"} ${symbol}`}
        </Text>
      </View>
       <Indicator loading={loading} />
       <TextInput1
          style={styles.input}
          label={`From ${title === "Buy" ? mainSymbol : symbol }`}
          value={format18(inAmount).toString()}
          onChangeText={(text) => {
            if(isNaN(text)) return;
            const value = Number(text);
            if(title === "Buy"){
              setInAmount(text);
              setOutAmount(value === 0 ? 0 : value / quotePrice);
            } else {
              setInAmount(value);
              setOutAmount(value * quotePrice);
            }
          }}
        />
      <View style={styles.table}>
        <Text style={[styles.tableItem, styles.borderRight]}>25%</Text>
        <Text style={[styles.tableItem, styles.borderRight]}>50%</Text>
        <Text style={[styles.tableItem, styles.borderRight]}>75%</Text>
        <Text style={[styles.tableItem]}>100%</Text>
      </View>
      <TextInput1
        // defaultValue = {"0"}
        label={`To ${title === "Buy" ? symbol : mainSymbol}`}
        value={format18(outAmount).toString()}
        keyboardType="numeric"
        onChangeText={(text) => {
          if(isNaN(text)) return;
          const value = Number(text);
          if(title === "Buy"){
            setInAmount(value * quotePrice);
            setOutAmount(value);
          }else {
            setInAmount(value === 0 ? 0 : value / quotePrice);
            setOutAmount(value);
          }
        }}
      />
      <Button 
        borderRadius={4}
        style={styles.button}
        backgroundColor={title === "Sell" ? COLORS.PINK : COLORS.PRIMARY}
      >
        SWAP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  topTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },  
  title: {
    color: COLORS.WHITE,
    fontSize: 25,
    fontWeight: 'bold',
  },
  balance: {
    color: COLORS.WHITE,
    fontSize: 18,
  },  
  table: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: COLORS.GRAY,
    borderRadius: 4,
    flexDirection:"row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableItem: {
    flex: 1,
    textAlign: "center",
    color: COLORS.GRAY,
    padding: 10,
    fontSize: 20,
  },
  borderRight: {
    borderRightWidth: 0.5,
    borderRightColor: COLORS.GRAY,
  },
  inputLabel: {
    color: COLORS.WHITE,
  },
  button: {
    marginTop: 10,
    borderRadius: 1,
  }
});

export default TransactionForm;
