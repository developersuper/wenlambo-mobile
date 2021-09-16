import React from "react";
import { StyleSheet } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { NativeRouter, Route } from "react-router-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import WalletConnectProvider from "components/WalletConnect";
import Main from "components/MainApp";
import apolloClient from "config/createApolloClient";
import store, { persistor } from "config/store";
import Splash from "screens/Splash";

export default function App() {
  return (
    <WalletConnectProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={apolloClient}>
            <NativeRouter>
              <Route exact path="/" component={Splash} />
              <Route path="/main" component={Main} />
            </NativeRouter>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </WalletConnectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
