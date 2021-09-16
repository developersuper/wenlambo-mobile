import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import IconButton from "elements/IconButton";
import COLORS from "constants/colors";

const MenuButton = ({ title, icon, onPress, active = false, disabled = false }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
    >
      <LinearGradient 
        colors={active ? [COLORS.PRIMARY, COLORS.BLACK] :
          [COLORS.BLACK, COLORS.BLACK]
        }
        style={[
          styles.container,
          {
            opacity: disabled ? 0.5 : 1,
          }
        ]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <IconButton 
          style={styles.icon}
          icon={{ 
            ...icon,
            color: active ? COLORS.WHITE : COLORS.PRIMARY,
            size: 20, 
          }}
          active
        />
        <Text
          style={[
            styles.text,
            {
              fontStyle: disabled ? 'italic' : 'normal',
            }
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    flexDirection: "row",
    // backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center"
  },
  icon: {
    marginTop: 2,
  },
  text: {
    color: COLORS.GRAY,
    marginLeft: 20,
    fontSize: 20,
  }
})
export default MenuButton;