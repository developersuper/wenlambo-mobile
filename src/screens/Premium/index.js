import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text, Linking, TouchableOpacity, Image, ScrollView } from "react-native";
import currencyFormatter from "currency-formatter";

import Indicator from "elements/Indicator";
import COLORS from "constants/colors";
import GradientContainer from "elements/GradientContainer";
import LPCircleImg from "assets/images/lp-circle.png";
import StarCircleImg from "assets/images/star-circle-icon.png";
import LPAdImg from "assets/images/lp-ad.png";
import RocketImg from "assets/images/rocket.png";
import ArrowImg from "assets/images/arrow.png";
import PremiumImg from "assets/images/premium.png";

const pancakeLPUrl =
  "https://exchange.pancakeswap.finance/#/add/BNB/0x2c7b396d17e3a5184d4901380836de7a72c5cba4";
const premiumFeatures = [
  {
    title: "Dashboard",
    features: [
      "Diamond wallets (up to 50 wallets)",
      "Extended trade history (50 transactions)",
      "Transaction alerts (show whales & bots)",
      "Choose ANY currency (USD, GBP, JPY, EUR, ZAR)",
      "Hide Ads (hides all ads on the DApp)",
    ],
  },
  {
    title: "Multichart",
    features: ["18 charts visible"],
  },
  {
    title: "Tools",
    right: true,
    features: [
      "Additional top gainers (view 30 variants)",
      "Additional top losers (view 30 variants)",
      "Additional token events (view 30 variants)",
      "Rug Detector (scan contract details for flaw)",
      "Additional new tools will be premium by default",
    ],
  },
  {
    title: "Phone App",
    right: true,
    features: ["Access to premium phone features (iOS & Android)"],
  },
];

const Premium = () => {

  const lp = useSelector((state) => state.account?.lp);
  const premium = lp?.premium;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            Premium Features
          </Text>
          <Indicator />
          <View style={styles.descView}>
            <Text style={styles.desc}>
              TIER 1 - BASIC features are FREE to ACCESS without holding any LAMBO Token.
            </Text>
            <Text style={styles.desc}>
              TIER 2 - Upgrade to Premium by hodling $150 of LAMBO/BNB LP.
            </Text>
          </View>
        </View>
        <View>
          <GradientContainer colors={[COLORS.LIGHTPURPLE, COLORS.PRIMARY]} style={styles.lpHoldingWrapper}>
            <Image 
              source={LPCircleImg} 
            />
            <Text style={styles.usdValue}>
              {currencyFormatter.format(lp?.usdValue || 0, {
                locale: "en-US",
                precision: 0,
              })}
            </Text>
            <Text style={styles.percentage}>
              {currencyFormatter.format(lp?.percentage || 0, {
                locale: "en-US",
                format: "%v%",
                precision: 3,
              })}
            </Text>
            <Text style={styles.label}>LAMBO-BNB LP</Text>
          </GradientContainer>
        </View>
        <View style={styles.featureBlock}>
          <Image 
            source={StarCircleImg} 
            style={styles.image} 
            resizeMode="contain"
          />
          <Text style={styles.text}>
            Earn liquidy pool rewards when you hold LAMBO-BNB LP as well as
            getting Premium features on the DApp and Mobile App.
          </Text>
        </View>
        <View style={styles.featureBlock}>
          <Image 
            source={RocketImg} 
            style={styles.image} 
            resizeMode="contain"
          />
          <Text style={styles.text}>
            Earn trading fees from the trades that happen in the pool,
            proportional to the share of the total liquidity provided.
          </Text>
        </View>
        <View style={styles.featureBlock}>
          <Image 
            source={ArrowImg} 
            style={styles.image} 
            resizeMode="contain"
          />
          <Text style={styles.text}>
            Future features for Premium users include our Mobile App, Wallet,
            LamboSwap, Staking, NFT, DEX and more Tools.
          </Text>
        </View>
        <GradientContainer
          colors={[COLORS.LIGHTPURPLE, COLORS.PRIMARY]}
          style={styles.unlockWrapper}
          start={{x: 1, y: 1}}
        >
          <View style={styles.unlock}>
            <Image 
              source={PremiumImg}
              resizeMode="contain"
              style={styles.premiumImg}
            />
            <Text style={styles.unlockTitle}>UNLOCK</Text>
            <Text style={styles.unlockSubTitle}>Premium Access</Text>
            <Text style={styles.unlockDesc}>
              by holding{" "}<Text style={styles.textGold}>$150</Text>{" "}worth of{" "}
                <Text
                  onPress={() => Linking.openURL(pancakeLPUrl)}
                  style={styles.link}
                >
                  LAMBO/BNB LP
                </Text>
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(pancakeLPUrl)}
            >
              <Text style={styles.unlockButton}>GET SUBSCRIPTION NOW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featurBlock}>
            {premiumFeatures
              .map(({ title, features }) => (
                <View style={styles.featuresList} key={title}>
                  <Text style={[styles.featuresTitle, styles.colorPurple]}>{title}</Text>
                  {features.map((feature) => (
                    <View style={styles.featureListItem} key={feature}>
                      <Text style={styles.featureText}>✓{"  "}</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>
        </GradientContainer>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
  descView: {
    padding: 10,
  },
  desc: {
    fontSize: 17,
    color: COLORS.WHITE,
    marginBottom: 20,
  },
  pancakeLpLink: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  lpHoldingWrapper: {
    borderRadius: 30,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  usdValue: {
    color: COLORS.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    position: "absolute",
    top: 55,
  },
  percentage: {
    fontSize: 13,
    color: COLORS.WHITE,
    position: "absolute",
    top: 100,
  },
  label: {
    marginTop: 10,
    color: COLORS.WHITE,
    fontSize: 15
  },
  featureBlock: {
    backgroundColor: COLORS.SECONDARY_BG,
    borderRadius: 30,
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  image: {
    width: 89, 
    height: 80,
  },
  text: {
    color: COLORS.GRAY,
    lineHeight: 20,
    marginTop: 20,
    textAlign: "center"
  },
  feature: {
    flexDirection: "column",
    backgroundColor: COLORS.BG2,
    padding: 30,
    marginTop: 50,
    borderRadius: 30,
  },
  featureHeader: {
    color: COLORS.WHITE,
    fontSize: 25,
    textAlign: "center",
    marginBottom: 30,
  },
  featureFree: {
    fontSize: 40,
    fontWeight: "bold"
  },
  featuresList: {
    marginBottom: 30,
  },
  featuresTitle: {
    color: COLORS.PRIMARY,
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 28,
  },
  featureListItem: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  featureText: {
    color: COLORS.WHITE,
    lineHeight: 25,
  },
  unlockWrapper: {
    marginTop: 50,
    padding: 30,
    borderRadius: 30,
  },
  unlock: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  premiumImg: {
    height: 90,
    width: 65,
    marginRight: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  unlockTitle: {
    color: COLORS.WHITE,
    fontSize: 25,
  },
  unlockButton: {
    marginTop: 20,
    color: COLORS.WHITE,
    fontSize: 12,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 7,
    paddingRight: 15,
    paddingLeft: 15,
  },
  colorPurple: {
    color: COLORS.PURPLE,
  },
  unlockTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
  unlockSubTitle: {
    fontSize: 30,
    color: COLORS.GOLD,
    fontWeight: "bold"
  },
  unlockDesc: {
    color: COLORS.GRAY1,
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center"
  },
  textGold: {
    color: COLORS.GOLD,
  }
})

export default Premium;