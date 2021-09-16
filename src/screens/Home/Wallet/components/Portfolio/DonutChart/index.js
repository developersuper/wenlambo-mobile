import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import currencyFormatter from "currency-formatter";
import { sumBy } from "lodash";

import COLORS from "constants/colors";
import GradientContainer from "elements/GradientContainer";

const outerBlockRadius = 75;
const innerBlockRadius = 55;
const innerTextBlockRadius = 51;

const DonutChart = ({ balances }) => {
  const colors = ["#FDF61B", "#4F11E9", "#F57740"];
  const sum = sumBy(balances, "value");
  const pieData = balances.map(({ value }, index) => ({
    value,
    svg: {
      fill: `url(#grad-${index % 3})`,
      onPress: () => console.log("press", index),
    },
    key: `pie-${index}`,
  }));
  let startAngle = 0;
  const angles = balances.map(({ value }) => {
    const offset = (value / sum) * 2 * Math.PI;
    return [startAngle, (startAngle = startAngle + offset)];
  });

  return (
    <View style={styles.container}>
      <PieChart
        style={styles.pie}
        padAngle={0}
        data={pieData}
        innerRadius={innerBlockRadius}
      >
        {colors.slice(0, angles.length).map((color, index) => (
          <Defs key={color}>
            <LinearGradient
              id={`grad-${index}`}
              x1={0.5 + Math.sin(angles[index][0]) * 0.5}
              y1={0.5 - Math.cos(angles[index][0]) * 0.5}
              x2={0.5 + Math.sin(angles[index][1]) * 0.5}
              y2={0.5 - Math.cos(angles[index][1]) * 0.5}
            >
              <Stop offset={0} stopColor={color} />
              <Stop offset={1} stopColor={COLORS.BLACK} />
            </LinearGradient>
          </Defs>
        ))}
      </PieChart>
      <Text style={styles.sum}>
        {currencyFormatter.format(sum, {
          locale: "en-US",
        })}
      </Text>
      <ScrollView style={styles.legend} nestedScrollEnabled={true}>
        {balances.map(({ id, name, price, value, symbol }, index) => {
          return (
            <View key={id+name} style={styles.legendItem}>
              <View style={styles.legendSymbolWrapper}>
                <GradientContainer
                  style={styles.legendRect}
                  colors={[colors[index % 3], COLORS.BLACK]}
                />
                <Text style={styles.legendText}>{symbol}</Text>
              </View>
              <Text style={styles.legendText}>
                {((value * 100) / sum).toFixed(2)}%
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
  },
  pie: {
    width: outerBlockRadius * 2,
    height: outerBlockRadius * 2,
  },
  sum: {
    position: "absolute",
    left: outerBlockRadius - innerTextBlockRadius,
    top: outerBlockRadius - innerTextBlockRadius,
    width: innerTextBlockRadius * 2,
    height: innerTextBlockRadius * 2,
    lineHeight: innerTextBlockRadius * 2,
    textAlign: "center",
    color: COLORS.GRAY,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: innerTextBlockRadius,
    borderStyle: "dashed",
  },
  legend: {
    marginLeft: 10,
    height: outerBlockRadius * 2,
  },
  legendItem: {
    flexDirection: "row",
    padding: 2,
    justifyContent: "space-between",
  },
  legendSymbolWrapper: {
    flexDirection: "row",
  },
  legendRect: {
    width: 20,
    height: 20,
    marginRight: 5,
    flex: 0,
  },
  legendText: {
    color: COLORS.WHITE,
  },
});

export default DonutChart;
