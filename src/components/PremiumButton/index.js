import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useHistory } from "react-router-native";
import { useSelector } from "react-redux";

import COLORS from "constants/colors";
import Icon from "elements/Icon";

const PremiumButton = ({ style }) => {

  const history = useHistory();
  const premium = useSelector((state) => state.account?.lp?.premium);  

  if(premium) {
    return <></>;
  }

  return (
    <TouchableOpacity
      onPress={() => history.push("/main/premium")}  
    >
      <Icon 
        style={[style]}
        type="material"
        name="verified-user"
        color={COLORS.YELLOW}
        size={35}
      />    
    </TouchableOpacity>
  );
};

const styles= StyleSheet.create({

});

export default PremiumButton;