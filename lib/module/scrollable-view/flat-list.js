function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { FlatList as RNFlatList, Platform } from "react-native";
import Animated from "react-native-reanimated";
import { SceneComponent } from "../scene";
const AnimatePageView = Platform.OS === "web" ? RNFlatList : Animated.createAnimatedComponent(RNFlatList);
function FlatList(props, ref) {
  return /*#__PURE__*/React.createElement(SceneComponent, _extends({}, props, {
    forwardedRef: ref,
    ContainerView: AnimatePageView
  }));
}
export const TabFlatList = /*#__PURE__*/React.forwardRef(FlatList);
//# sourceMappingURL=flat-list.js.map