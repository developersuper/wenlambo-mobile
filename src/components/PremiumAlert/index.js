import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import { useHistory } from "react-router-native";

import Block from "elements/Block";
import COLORS from "constants/colors";
import Button from "elements/Button";

const PremiumAlert = ({ visible, setVisible, full }) => {
  const history = useHistory();
  return (
    <>
      {visible && (
        <Modal
          animationType="fade"
          transparent
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
          }}
        >
          
          <Pressable
            style={[
              styles.modal, 
              {
                backgroundColor: `rgba(0, 0, 0, 0.9)`
              }]}
            onPress={() => setVisible(false)}
          >
            <Block noIndicator>
              <Text style={styles.text}>
                Please upgrade to Premium to use {full ? "full features" : "this feature"}.
              </Text>
              <Button 
                onPress={() => history.push("/main/premium")}
                fontSize={14}
              >
                GO TO PREMIUM
              </Button>
            </Block>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    backgroundColor: "green"
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
  },
});

export default PremiumAlert;
