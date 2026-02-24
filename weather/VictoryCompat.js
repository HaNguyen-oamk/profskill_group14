import { Platform } from "react-native";

let VictoryAxis, VictoryChart, VictoryLine, VictoryScatter;

if (Platform.OS === "web") {
  ({
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryScatter,
  } = require("victory"));
} else {
  ({
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryScatter,
  } = require("victory-native"));
}

export { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter };
