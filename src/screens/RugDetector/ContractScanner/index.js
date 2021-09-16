import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useLazyQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";

import { RUGPULL } from "queries/tools";
import COLORS from "constants/colors";
import Block from "elements/Block";
import GradientContainer from "elements/GradientContainer";
import HelpModal from "./HelpModal";
import PremiumButton from "components/PremiumButton";
import PremiumAlert from "components/PremiumAlert";

const getDate = () => {
  let today = new Date();
  const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const month =
    today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const year = today.getFullYear();
  const seconds =
    today.getSeconds().toString().length == 1
      ? "0" + today.getSeconds()
      : today.getSeconds();
  const minutes =
    today.getMinutes().toString().length == 1
      ? "0" + today.getMinutes()
      : today.getMinutes();
  const hours =
    today.getHours().toString().length == 1
      ? "0" + today.getHours()
      : today.getHours();
  const ampm = today.getHours() >= 12 ? "PM" : "AM";
  today = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  return today;
};

const Results = ({ scanned, passed, transferFunction, result })=> {
  return (
    <View style={styles.scannerResults}>
      <Text style={{color: "#038bff"}}>Scan started at: {getDate()}</Text>
      <Text style={{color: "#bd59bd"}}>Scanning contract...</Text>
      <Text style={{color: "lightblue"}}>
        <Text style={{colors: "lightblue"}}>Functions: </Text>
        {scanned} functions were scanned in this smart contract.
      </Text>
      <Text style={{color: "lightgreen"}}>
        <Text style={{color: "#bd59bd"}}>Functions: </Text>
        {passed} functions were found on our whitelist and follow safety
        pattern.
      </Text>
      {scanned - passed > 0 && (
        <Text style={{color: "lightyellow"}}>
          <Text style={{color: "#bd59bd"}}>Functions: </Text>
          {scanned - passed} functions were not found in our whitelist.
        </Text>
      )}
      <Text style={styles.func}>
        <Text style={{color: "#bd59bd"}}>Transfer functions: </Text>
        The transfer function is {transferFunction ? "" : "not "}secure and uses
        all safety pattern.
      </Text>
      <Text style={{color: "yellow"}}>
        <Text style={{color: "#bd59bd"}}>Result: </Text>
        {result ? (
          <Text style={{color: "yellow"}}>
            {scanned - passed === 0 ? "Passed." : "Passed but attention."}
          </Text>
        ) : (
          <Text style={{color: "red"}}>Not passed.</Text>
        )}
      </Text>
    </View>
  );
}

const ContractScanner = () => {
  const premium = useSelector((state) => state.account?.lp?.premium);
  // const premium = true;
  const [openPremium, setOpenPremium] = useState(false);

  const [contract, setContract] = useState("");
  const bottomRef = useRef();
  const [getScanResult, { loading, data }] = useLazyQuery(RUGPULL, {
    fetchPolicy: "network-only",
  });

  const scrollToBottom = () => {
  };
  const handleScan = () => {
    getScanResult({ variables: { contract } });
  };

  useEffect(() => {
    scrollToBottom();
    console.log(data);
  }, [data]);

  return (
    <Block
      title="Contract Scanner"
      loading={loading}
      rightComponent={<PremiumButton style={{marginRight: 5}}/> }
    >
      <PremiumAlert 
        visible={openPremium}
        setVisible={setOpenPremium}
      />
      <HelpModal />
      <View style={styles.inputWrapper}>
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={12}
            style={styles.input}
            placeholderTextColor={COLORS.GRAY}
            placeholder="Paste a solidity contract here..."
            onChangeText={(value) => setContract(value)}
          />
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (premium) {
            handleScan();
          } else {
            setOpenPremium(true);
          }
        }}      
      >
        <GradientContainer
          colors={[COLORS.LIGHTPURPLE, COLORS.PRIMARY]}
          style={styles.buttonWrapper}
          start={{x: 1, y: 1}}
        >
          <Text style={styles.button}>SCAN</Text>
        </GradientContainer>
      </TouchableOpacity>
    {data && (
      <Results
        scanned={data.rugPull.totalFunctions}
        passed={data.rugPull.whitelistFunctions}
        transferFunction={data.rugPull.transferSafe}
        result={data.rugPull.transferSafe}
      />
    )}
    <View ref={bottomRef}></View>
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    color: COLORS.WHITE,
    textAlignVertical: "top",
  },
  inputWrapper: {
    height: 270,
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    marginBottom: 20,
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 20,
    padding: 8,
  },
  button: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
  scannerResults: {
    marginTop: 50,
  },
  func: {
    color: "lightgreen",
    marginTop: 20,
    marginBottom: 20,
  }
});

export default ContractScanner;


