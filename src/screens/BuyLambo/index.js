import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";

import SwapBlock from "components/SwapBlock";
import Block from "elements/Block";
import Indicator from "elements/Indicator";
import COLORS from "constants/colors";
import GradientContainer from "../../elements/GradientContainer";

const BuyLambo = () => {

  const lamboAddress = "0x2c7b396d17e3a5184d4901380836de7a72c5cba4";

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.block}>
          <Block
            noIndicator
          >
            <Text style={styles.blockTitle}>How to buy $LAMBO</Text>
            <Indicator />
            <Text style={styles.desc}>
              You can purchase LAMBO directly on this DApp simply by clicking on
              our token name, then using the SWAP feature below the chart.
              Alternatively, you can purchase LAMBO on PancakeSwap. Exchanges will
              be added shortly.
            </Text>
            <Text style={styles.blockTitle}>Contact</Text>
            <Indicator />
            <TouchableOpacity
              onPress={() => Linking.openURL(`https://bscscan.com/token/${lamboAddress}`)}
            >
              <GradientContainer
                colors={[COLORS.LIGHTPURPLE, COLORS.PRIMARY]}
                style={styles.contactWrapper}
                start={{x: 1, y: 1}}
              >
                <Text style={styles.contact}>{lamboAddress}</Text>
              </GradientContainer>
            </TouchableOpacity>
          </Block>
        </View>
        <View style={styles.block}>
          <SwapBlock />
        </View>
        <View style={styles.block}>
          <View style={{padding: 10}}>
            <Text style={styles.blockTitle}>Tokenomics</Text>
            <Indicator/>
          </View>
          <Block innerStyle={styles.tokenBlock}>
            <GradientContainer
              style={styles.percentageCircle}
              colors={[ COLORS.PRIMARY, COLORS.LIGHTPURPLE]}
            >
              <Text style={styles.percentage}>4%</Text>
            </GradientContainer>
            <Text style={[styles.desc, styles.textCenter]}>
              4% is distributed to holders from each network transaction.
            </Text>
          </Block>
          <Block innerStyle={styles.tokenBlock}>
            <GradientContainer
              style={styles.percentageCircle}
              colors={[ COLORS.PRIMARY, COLORS.LIGHTPURPLE]}
            >
              <Text style={styles.percentage}>2%</Text>
            </GradientContainer>
            <Text style={[styles.desc, styles.textCenter]}>
              There's a 2% fee on every transaction
            </Text>
          </Block>
          <Block innerStyle={styles.tokenBlock}>
            <GradientContainer
              style={styles.percentageCircle}
              colors={[ COLORS.PRIMARY, COLORS.LIGHTPURPLE]}
            >
              <Text style={styles.percentage}>4%</Text>
            </GradientContainer>
            <Text style={[styles.desc, styles.textCenter]}>
              4% is burned, reducing supply and increasing the token value.
            </Text>
          </Block>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  block: {
    marginBottom: 20,
  },
  blockTitle: {
    fontSize: 24,
    color: COLORS.WHITE,
    fontWeight: "bold",
  },
  desc: {
    padding: 10,
    fontSize: 16,
    color: COLORS.GRAY,
    lineHeight: 30,
    marginBottom: 10,
  },
  contactWrapper: {
    borderRadius: 30,
    marginBottom: 24,
    marginTop: 10,
  },
  contact: {
    color: COLORS.WHITE,
    fontSize: 12,
    textAlign: "center",
    padding: 8,
  },
  tokenBlock: {
    flexDirection: "column",
    alignItems: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  percentageCircle: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  percentage: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default BuyLambo;