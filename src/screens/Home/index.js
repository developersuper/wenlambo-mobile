import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Route, Redirect } from "react-router-native";

import Footer from "./components/Footer";
import Chart from "./Chart";
import Wallet from "./Wallet";
import Swap from "./Swap"

const Home = ({ match, history }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.main}>
        <Route path={`${match.url}/`}>
          <Redirect to={`${match.url}/chart`} />
        </Route>
        <Route path={`${match.url}/chart`} component={Chart} />
        <Route path={`${match.url}/swap`} component={Swap} />
        <Route path={`${match.url}/wallet`} component={Wallet} />
      </ScrollView>
      <Footer history={history} match={match} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  main: {
    flex: 1,
    width: "100%",
  },
  logoImg: {
    width: 250,
    height: 300,
    marginBottom: 20,
  },
});

export default Home;
