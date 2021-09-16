import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Linking } from "react-native";
import { useSelector } from "react-redux";

import SymbolFinder from "components/SymbolFinder";
import FadeModal from "components/FadeModal";
import Block from "elements/Block";
import COLORS from "constants/colors";

const HelpModal = () => {
  const network = useSelector((state) => state.favorites?.network || "bsc");
  const [token, setToken] = useState("");
  const [findResult, setFindResult] = useState("");

  useEffect(() => {
    if(token === "") return;
    if (network === "bsc") {
      setFindResult(`https://bscscan.com/address/${token?.address}/#code`);
    } else {
      setFindResult(`https://etherscan.io/address/${token?.address}/#code`);
    }
  }, [token])

  return (
    <FadeModal
      handler={(onOpen) => (
        <TouchableOpacity
          onPress={() => {
            setToken("");
            setFindResult("");
            onOpen();
          }}
        >
          <Text style={styles.helpText}>
            Need help to find the code?
          </Text>
        </TouchableOpacity>
      )}
      style={styles.modal}
    >
      {(onClose) => (
        <Block noIndicator>
          <Text style={styles.title}>
            Need help on to find the code?
          </Text>
          <SymbolFinder
            title="Enter token name / address"
            token={token}
            setCurrency={(currency) => {
              setToken(currency);
            }}
          />
          { (findResult !== "") && <>
            <Text style={styles.desc}>
              Click in the link bellow and copy the code in the first block. 
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(findResult)}
            >
              <Text style={styles.link}>
                {findResult}
              </Text>
            </TouchableOpacity>
            </>
          }
        </Block>
      )}
    </FadeModal>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  helpText: {
    color: COLORS.WHITE,
    fontSize: 15,
    marginBottom: 10,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 20,
    marginBottom: 20,
  },
  desc: {
    color: COLORS.GRAY,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  link: {
    color: COLORS.PRIMARY,
    fontSize: 12,
  }
});

export default HelpModal;