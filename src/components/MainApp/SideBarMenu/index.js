import React from "react";
import { Linking, View, ScrollView, StyleSheet, Image } from "react-native";

import COLORS from "constants/colors";
import logoImg from "assets/images/logo.png";
import MenuButton from "elements/MenuButton";

const menuItems = [
  { 
    path: "home", 
    title: "Dashboard", 
    icon: {
      name: "home",
      type: "material",
    } 
  },
  { 
    path: "tools", 
    title: "Tools", 
    icon: {
      name: "build",
      type: "material",
    } 
  },
  {
    path: "rugdetector",
    title: "Rug Detector",
    icon: {
      name: "user-secret",
      type: "fa",
    },
  },
  {
    path: "premium",
    title: "Premium",
    icon: {
      name: "verified-user",
      type: "material",
    },
  },
  {
    path: "multi-chart",
    title: "Multi Chart",
    icon: {
      name: "apps",
      type: "material",
    } ,
  },
  { 
    path: "buy-lambo", 
    title: "Buy $Lambo",     
    icon: {
      name: "attach-money",
      type: "material",
    }  
  },
  { 
    path: "promote", 
    title: "Promote", 
    icon: {
      name: "loyalty",
      type: "material",
    } 
  },
  {
    path: "stake",
    title: "Stake (Soon)",
    icon: {
      name: "amp-stories",
      type: "material",
    }, 
    disabled: true,
  },
  { 
    path: "nft", 
    title: "Nft (Soon)", 
    icon: {
      name: "wallpaper",
      type: "material",
    }, 
    disabled: true },
  {
    path: "dex",
    title: "Dex (Soon)",
    icon: {
      name: "multiline-chart",
      type: "material",
    }, 
    disabled: true,
  },
  {
    path: "https://wen-lambo.com",
    title: "Home Page",
    icon: {
      name: "logo.png",
      type: "image",
      img: require("assets/images/icons/logo.png"),
    }, 
    external: true,
  },
];

const SideBarMenu = ({ history, match, toggleSidebar }) => {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image 
          style={styles.img}
          source={logoImg}
        />
        {
          menuItems.map(({ path, title, icon, disabled, external }, index) => {
            return (
              <MenuButton
                title={title}
                icon={icon}
                disabled={disabled}
                key={title}
                onPress={
                  () => {
                    if(!disabled) {
                      if(external) {
                        Linking.openURL(path);
                      }
                      history.push(`${match.url}/${path}`)
                      toggleSidebar();
                    }
                  }
                }
                active={
                  history.location.pathname.trim().split("/")[2] === path
                }
              />
            );
          })
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    zIndex: -2222,
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
  }
});

export default SideBarMenu;