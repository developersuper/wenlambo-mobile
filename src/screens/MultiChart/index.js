import React, { useState } from "react";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from "react-native";

import { TRENDS } from "queries/history";
import COLORS from "constants/colors";

import SingleChart from "./SingleChart";

const MultiChart = () => {
  const premium = useSelector((state) => state.account?.lp?.premium);
  const { data, loading } = useQuery(TRENDS, {
    variables: {
      since: moment().add(-1, "months").format("YYYY-MM-DD"),
      limit: premium ? 18 : 8,
    },
  });

  if(loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {data?.trends?.slice(0,5)?.map((trend, index) => (
          <SingleChart 
            defaultCurreny={trend} 
            chartId={index} 
            key={trend.address}
          />
        ))}
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {

  },
  loading: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default MultiChart;