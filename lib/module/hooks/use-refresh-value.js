import { interpolate, useDerivedValue } from "react-native-reanimated";
export const useRefreshDerivedValue = (translateYValue, _ref) => {
  let {
    refreshHeight,
    overflowPull,
    animatedValue,
    pullExtendedCoefficient
  } = _ref;
  return useDerivedValue(() => {
    translateYValue.value = interpolate(animatedValue.value, [0, refreshHeight + overflowPull, refreshHeight + overflowPull + 1], [0, refreshHeight + overflowPull, refreshHeight + overflowPull + pullExtendedCoefficient]);
  });
};
//# sourceMappingURL=use-refresh-value.js.map