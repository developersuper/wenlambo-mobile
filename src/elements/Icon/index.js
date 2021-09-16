import React from "react";
import { Image } from "react-native";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

const iconTypes = {
  ad: AntDesign,
  entypo: Entypo,
  evil: EvilIcons,
  feather: Feather,
  fa: FontAwesome,
  fa5: FontAwesome5,
  foundation: Foundation,
  ion: Ionicons,
  mc: MaterialCommunityIcons,
  material: MaterialIcons,
  oct: Octicons,
  sl: SimpleLineIcons,
  zocial: Zocial,
};

const Icon = ({ type = "material", name, img, ...props }) => {
  if(type === "image") {
    return (
      <Image 
        style={{
          width: props.size || 20,
          height: props.size || 20,
        }}  
        source={img} 
      />
    );
  }
  const Component = iconTypes[type] || MaterialIcons;
  return <Component name={name} {...props} />;
};

export default Icon;
