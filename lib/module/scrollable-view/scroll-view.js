function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { Platform, ScrollView as RNScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { SceneComponent } from "../scene";
const AnimatePageView = Platform.OS === "web" ? RNScrollView : Animated.createAnimatedComponent(RNScrollView);
function ScrollView(props, ref) {
  return /*#__PURE__*/React.createElement(SceneComponent, _extends({}, props, {
    forwardedRef: ref,
    ContainerView: AnimatePageView
  }));
}
export const TabScrollView = /*#__PURE__*/React.forwardRef(ScrollView);
//# sourceMappingURL=scroll-view.js.map