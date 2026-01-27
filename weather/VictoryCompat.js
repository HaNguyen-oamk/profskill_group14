import { Platform } from "react-native";

let VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer;

if (Platform.OS === "web") {
  ({
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryTooltip,
    VictoryVoronoiContainer,
  } = require("victory"));
} else {
  ({
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryTooltip,
    VictoryVoronoiContainer,
  } = require("victory-native"));
}

export {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
};
