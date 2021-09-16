import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Route } from "react-router-native";
import Sidebar from "react-native-side-menu-updated";

import COLORS from "constants/colors";
import Home from "screens/Home";
import Tools from "screens/Tools";
import RugDetector from "screens/RugDetector";
import Premium from "screens/Premium";
import MultiChart from "screens/MultiChart";
import Buylambo from "screens/BuyLambo";
import Promote from "screens/Promote";

import Header from "./Header";
import SideBarMenu from "./SideBarMenu";

const MainApp = ({ match, history }) => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };


  return (
    <View style={styles.view}>
      <Sidebar
        isOpen={sidebar}
        onChange={(isOpen) => setTimeout(() => setSidebar(isOpen), 100)} 
        menu={
          <SideBarMenu 
            history={history} 
            match={match}
            toggleSidebar={() => toggleSidebar()} 
          />}
      >
        <View style={styles.container}>
          <Header toggleSidebar={toggleSidebar}/>
          <Route path={`${match.url}/home`} component={Home} />
          <Route path={`${match.url}/tools`} component={Tools} />
          <Route path={`${match.url}/rugdetector`} component={RugDetector} />
          <Route path={`${match.url}/premium`} component={Premium} />
          <Route path={`${match.url}/multi-chart`} component={MultiChart} />
          <Route path={`${match.url}/buy-lambo`} component={Buylambo} />
          <Route path={`${match.url}/promote`} component={Promote} />
        </View>
      </Sidebar>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.BLACK,
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
});

export default MainApp;
