import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { useMutation } from "@apollo/react-hooks";
import { omit } from "lodash";

import Indicator from "elements/Indicator";
import Block from "elements/Block";
import COLORS from "constants/colors";
import AnnounceIcon from "assets/images/announce-icon.png";
import GradientContainer from "../../elements/GradientContainer";
import { SUBMIT_CONTACT_FORM } from "queries/forms";


const Promote = () => {

  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitContactForm, { loading: submitting }] = useMutation(
    SUBMIT_CONTACT_FORM,
    {
      variables: {
        ...omit(data, "agree"),
      },
      onCompleted: () => {
        setData({});
        setSuccess(true);
      },
    }
  );

  const updateHandler =
    (field) =>
    (value) => {
      setData({ ...data, [field]: value });
    };

  const disabled =
    !data.customerName || !data.email || !data.description || !data.agree;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{padding: 10}}>
          <Text style={styles.title}>Promote</Text>
          <Indicator />
          <Text style={styles.desc}>
            Are you looking to <Text style={styles.bold}>promote</Text> your project to a wider community?
            The Wen Lambo Charting Dapp reaches a wide and ever expanding
            audience and will add huge growth potential to your project. Wen
            Lambo is a trusted name in the crypto community, and our reputation
            can only aid in reinforcing the credibility of your project.
          </Text>
        </View>
        <Block noIndicator>
          <Text style={styles.desc}>
            <Text style={styles.bold}>Adverts placed</Text> on our site will be seen by countless
            people daily as they make use of our unique tracking and
            charting tools to monitor your projects. Wen Lambo is dedicated
            to promoting and helping small start up tokens with real
            potential in the marketplace. Our Dapp is designed with small
            tokens in mind, and our advertising reflects this.
            {"\n\n"}
            So, if you are looking to expand your reach and promote your
            project on a trusted Dapp, you have come to the right place.
            Fill in your details on the contact form below and we will be in
            touch.
          </Text>
        </Block>
        <Block 
          noIndicator
          innerStyle={styles.ad}
        >
          <View style={styles.adUpper}>
            <Image 
              source={AnnounceIcon}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.centered}>
              All projects must meet the below criteria to be considered for
              advertising
            </Text>
          </View>
          <View style = {styles.adDown}>
            <Text style={styles.text}>
              · Must be verified on BSC Scan
              {"\n"}
              · Must have a website
              {"\n"}
              · Must have LP locked for a minimum of 6 months
            </Text>
            <Text style={styles.disclaimer}>
              Please do not apply if your project does not meet these
              requirements. Legitimate projects only.
            </Text>
          </View>
        </Block>
        <Block 
          innerStyle={{padding: 30}}
          noIndicator>
          <Text style={[styles.title, {textAlign: "center"}]}>Promote</Text>
          <Indicator />
          <View style={styles.form}>
            <TextInput 
              placeholder="Name"
              placeholderTextColor={COLORS.GRAY}
              onChangeText={updateHandler("customerName")}
              value={data.customerName || ""}
              style={styles.input}
            />
            <TextInput 
              placeholder="Email"
              placeholderTextColor={COLORS.GRAY}
              onChange={updateHandler("email")}
              value={data.email || ""}
              style={styles.input}
            />
            <TextInput 
              placeholder="Describe your project"
              placeholderTextColor={COLORS.GRAY}
              style={styles.input}
              onChangeText={updateHandler("description")}
              value={data.description || ""}
              multiline
              numberOfLines={5}
            />
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                tintColors={[COLORS.WHITE]}
                onCheckColor={COLORS.PRIMARY}
                disabled={false}
                value={ data.agree || false}
                onValueChange={updateHandler("agree")}
              />
              <Text style={styles.checkBoxText}>
                I agree that my project meets the requirements to be considered for advertising.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                  if(!disabled) submitContactForm();
                }
              }
            >
              <GradientContainer
                colors={[COLORS.LIGHTPURPLE, COLORS.PRIMARY]}
                style={styles.submit}
                start={{x: 1, y: 1}}
              >
                <Text style={[styles.submitText, {opacity: disabled ? 0.5 : 1}]}>SUBMIT</Text>
              </GradientContainer>
            </TouchableOpacity>
          </View>
        </Block>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
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
  bold: {
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
  ad: {
    width: "100%",
    flexDirection: "column",  
    alignItems: "center",
  },
  adUpper: {
    width: "100%",
    flexDirection: "column",  
    alignItems: "center",
    padding: 40,
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 30,
  },
  centered: {
    color: COLORS.WHITE,
    fontSize: 16,
    textAlign: "center",
    maxWidth: 280,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 14,
  },
  adDown: {
    padding: 40,
  },
  disclaimer: {
    color: COLORS.LIGHTPINK,
    marginTop: 20,
  },
  form: {
    marginTop: 10,
  },
  input: {
    flex: 1,
    color: COLORS.WHITE,
    backgroundColor: "#202020",
    marginBottom: 20,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 15,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  checkBoxWrapper: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  checkBoxText: {
    color: COLORS.WHITE,
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 10,
  },
  submit: {
    width: 120,
    alignSelf: "center",
    marginTop: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  submitText: {
    color: COLORS.WHITE,
  }
});

export default Promote;