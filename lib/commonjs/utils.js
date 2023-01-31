"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ScrollTo = _ScrollTo;
exports.isIOS = exports.animateToRefresh = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
function _ScrollTo(ref, x, y, animated) {
  "worklet";

  if (!ref) return;
  (0, _reactNativeReanimated.scrollTo)(ref, x, y, animated);
}
const isIOS = _reactNative.Platform.OS === "ios";
exports.isIOS = isIOS;
const animateToRefresh = _ref => {
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
    (0, _reactNativeReanimated.runOnJS)(onStartRefresh)();
  }
  if (transRefreshing.value === destPoi) {
    isRefreshingWithAnimation.value = isToRefresh;
    return;
  }
  transRefreshing.value = (0, _reactNativeReanimated.withTiming)(destPoi, undefined, () => {
    isRefreshingWithAnimation.value = isToRefresh;
  });
};
exports.animateToRefresh = animateToRefresh;
//# sourceMappingURL=utils.js.map