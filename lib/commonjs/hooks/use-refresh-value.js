"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefreshDerivedValue = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
const useRefreshDerivedValue = (translateYValue, _ref) => {
  let {
    refreshHeight,
    overflowPull,
    animatedValue,
    pullExtendedCoefficient
  } = _ref;
  return (0, _reactNativeReanimated.useDerivedValue)(() => {
    translateYValue.value = (0, _reactNativeReanimated.interpolate)(animatedValue.value, [0, refreshHeight + overflowPull, refreshHeight + overflowPull + 1], [0, refreshHeight + overflowPull, refreshHeight + overflowPull + pullExtendedCoefficient]);
  });
};
exports.useRefreshDerivedValue = useRefreshDerivedValue;
//# sourceMappingURL=use-refresh-value.js.map