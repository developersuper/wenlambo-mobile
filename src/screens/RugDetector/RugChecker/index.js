import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";
import currencyFormatter from "currency-formatter";
import moment from "moment";

import Block from "elements/Block";
import SymbolFinder from "components/SymbolFinder";
import { DEV_ACTIVITIES } from "queries/tools";
import { TOKEN_INFO } from "queries/history";
import HelpButton from "components/HelpButton";
import Table from "components/Table";

const RugChecker = () => {
  const premium = useSelector((state) => state.account?.lp?.premium);
  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(DEV_ACTIVITIES, {
    skip: !token?.address,
    variables: {
      token: token?.address,
    },
  });
  const { data: info, loading: infoLoading } = useQuery(TOKEN_INFO, {
    skip: !token?.address,
    variables: {
      address: token?.address,
    },
  });
  const totalSupply = info?.tokenInfo?.totalSupply || 0;
  let filtered = (loading ? [] : data?.devActivities)?.filter(
    ({ contractType, currency: { symbol } }) => {
      if (["BNB", "Cake-LP", token?.symbol].indexOf(symbol) === -1) {
        return false;
      }
      return true;
    }
  );

  const columns = [
    {
      field: "date",
      headerName: "Date",
      render: ({ time }) => (
        <>
          <Text>{moment(time).format("YYYY-MM-DD")}</Text>
          {moment(time).format("hh:mm:ss A")}
        </>
      ),
    },
    {
      field: "token",
      headerName: "Token",
      render: ({ currency: { symbol } }) => symbol,
    },
    {
      field: "amount",
      headerName: "Amount",
      render: ({ amount, currency }) => {
        return (
          <>
            <Text>
              {currencyFormatter.format(amount, {
                locale: "en-US",
                format: "%v",
              })}
            </Text>
            <Text variant="caption" color="textSecondary">
              {Boolean(totalSupply) &&
                currency?.address === token?.address &&
                `${((amount * 100) / totalSupply).toFixed(4)}%`}
            </Text>
          </>
        );
      },
    },
    {
      field: "receiver",
      headerName: "Receiver",
      render: ({ address }) => address,
    },
    {
      field: "action",
      headerName: "Action",
      render: ({ address, contractType, currency, amount }) => {
        if (
          address === "0x0000000000000000000000000000000000000000" ||
          address === "0x000000000000000000000000000000000000dead"
        ) {
          return "Send to burn";
        } else if (!contractType) {
          return "Send to wallet";
        } else if (contractType === "Generic") {
          if (currency.symbol === "BNB") {
            return `Buy ${token?.symbol}`;
          } else {
            return "Send to contract";
          }
        } else if (contractType === "DEX") {
          if (currency.symbol === "Cake-LP") {
            return "Remove LP";
          } else if (
            currency.symbol === token?.symbol &&
            amount < totalSupply
          ) {
            return `Sell ${token?.symbol}`;
          }
          return "Create LP";
        }
        return "";
      },
    },
  ];

  return (
    <Block 
      loading={loading}
      title="Rug Checker"
      rightComponent={
        <HelpButton
          text="The Rug Checker pull’s up the developers wallet to see their transaction history. If they are splitting tokens into various other wallets, this is considered a red flag."
        />
      }
    >
      <SymbolFinder 
        setCurrency={(token) => {
          if (!premium) {
            setOpen(true);
          } else {
            setToken(token);
          }
        }}
        currency={token}
        title="Enter token name / address..."
      />
      <Table columns={columns} data={filtered || []} />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 500,
  },
});

export default RugChecker;