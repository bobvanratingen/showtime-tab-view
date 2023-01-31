"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSyncInitialPosition = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _context = require("../context");
var _utils = require("../utils");
const useSyncInitialPosition = ref => {
  const opacityValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const isInitiated = (0, _react.useRef)(true);
  const {
    headerHeight,
    minHeaderHeight
  } = (0, _context.useHeaderTabContext)();
  const initialPosition = (0, _react.useCallback)(position => {
    if (!isInitiated.current) return;
    isInitiated.current = false;
    (0, _reactNativeReanimated.runOnUI)(_utils._ScrollTo)(ref, 0, Math.min(position, headerHeight - minHeaderHeight), false);
    opacityValue.value = 1;
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [headerHeight, minHeaderHeight, ref]);
  return {
    opacityValue,
    initialPosition
  };
};
exports.useSyncInitialPosition = useSyncInitialPosition;
//# sourceMappingURL=use-sync-initial-position.js.map