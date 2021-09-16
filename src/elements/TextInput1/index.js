import React from "react";
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import BaseInput from "./BaseInput";
import COLORS from "constants/colors";

export default class TextInput1 extends BaseInput {
  static defaultProps = {
    height: 48,
    inputPadding: 16,
    labelHeight: 24,
    borderHeight: 2,
    animationDuration: 300,
  };

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      inputPadding,
      labelHeight,
      borderHeight,
      inputStyle,
      labelStyle,
      keyboardType = "numeric",
    } = this.props;
    const { width, focusedAnim, value } = this.state;

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + inputPadding,
          },
        ]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, labelHeight + inputPadding],
              }),
            }}
          >
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 13],
                  }),
                  color:  focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [COLORS.SECONDARY_GRAY, COLORS.PRIMARY,],
                  }),
                  paddingTop: inputPadding / 2,
                  paddingBottom: inputPadding / 2,
                },
              ]}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
              paddingTop: inputPadding / 2,
            },
          ]}
          keyboardType={keyboardType}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
        />
        {/* bottom border */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: borderHeight,
            width: width,
            backgroundColor: COLORS.SECONDARY_GRAY,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: borderHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
            backgroundColor: COLORS.PRIMARY,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginTop: 20,
  },
  label: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: '#7771ab',
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 0,
    color: 'white',
    fontSize: 18,
  },
});