import React, { useState } from "react";
import { Modal, StyleSheet, Pressable } from "react-native";

const FadeModal = ({ handler, children, style, opacity = 0.9 }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {handler(() => setVisible(true))}
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
              style, 
              {
                backgroundColor: `rgba(0, 0, 0, ${opacity})`
              }]}
            onPress={() => setVisible(false)}
          >
            {typeof children === "object"
              ? children
              : children(() => setVisible(false))}
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
});

export default FadeModal;
