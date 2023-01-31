"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSharedScrollableRef = useSharedScrollableRef;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
function useSharedScrollableRef(forwardRef) {
  const ref = (0, _reactNativeReanimated.useAnimatedRef)();
  (0, _react.useEffect)(() => {
    if (!forwardRef) {
      return;
    }
    if (typeof forwardRef === "function") {
      forwardRef(ref.current);
    } else {
      forwardRef.current = ref.current;
    }
  });
  return ref;
}
//# sourceMappingURL=use-shared-scrollable-ref.js.map