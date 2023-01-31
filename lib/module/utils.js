import { Platform } from "react-native";
import { runOnJS, scrollTo, withTiming } from "react-native-reanimated";
export function _ScrollTo(ref, x, y, animated) {
  "worklet";

  if (!ref) return;
  scrollTo(ref, x, y, animated);
}
export const isIOS = Platform.OS === "ios";
export const animateToRefresh = _ref => {
  "worklet";

  let {
    transRefreshing,
    isRefreshing,
    isRefreshingWithAnimation,
    isToRefresh,
    destPoi,
    onStartRefresh
  } = _ref;
  if (isToRefresh === true && isRefreshing.value === true) return;
  if (isToRefresh === false && isRefreshing.value === false && transRefreshing.value === destPoi) return;
  isRefreshing.value = isToRefresh;
  if (isToRefresh && onStartRefresh) {
    runOnJS(onStartRefresh)();
  }
  if (transRefreshing.value === destPoi) {
    isRefreshingWithAnimation.value = isToRefresh;
    return;
  }
  transRefreshing.value = withTiming(destPoi, undefined, () => {
    isRefreshingWithAnimation.value = isToRefresh;
  });
};
//# sourceMappingURL=utils.js.map