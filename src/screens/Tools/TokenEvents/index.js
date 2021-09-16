import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import moment from "moment";

import COLORS from "constants/colors";
import Table from "components/Table";
import Block from "elements/Block";
import FavoriteButton from "components/FavoriteButton";
import { CONTRACT_EVENTS } from "queries/tools";
import PremiumButton from "components/PremiumButton";


const TokenEvents = () => {

  const premium = useSelector((state) => state.account?.lp?.premium);
  const { data, loading } = useQuery(CONTRACT_EVENTS, {
    variables: {
      limit: premium ? 30 : 5,
    },
  });

  const columns = [
    {
      field: "favorite",
      headerName: "",
      span: 0.3,
      render: (row) => <FavoriteButton currency={row.currency} />,
    },
    {
      field: "time",
      headerName: "Time",
      render: (row) => moment(row.unixtime * 1000).format("MM-DD HH:mm:ss"),
    },
    {
      headerName: "Event",
      field: "event",
    },
    {
      headerName: "Name",
      field: "name",
      render: ({ currency: { name, symbol } }) => (
        <View style={styles.nameSymbol}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
      ),
    },
  ];

  return (
    <Block 
      loading={loading}
      title="Token Events"
      rightComponent={ <PremiumButton style={{marginRight: 5}}/> }
    >
      <Table columns={columns} data={loading ? [] : data?.contractEvents} />
    </Block>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  iconButtons: {
    marginRight: 2,
    marginLeft: 1,
  },
  nameSymbol: {
    flexDirection: "column",
  },
  text: {
    color: COLORS.WHITE,
  },
  symbol: {
    color: COLORS.GRAY,
  },
  incDec: {
    flexDirection: "row",
    alignItems: "center",
  }
})
export default TokenEvents;
