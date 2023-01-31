function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useHeaderTabContext } from "./context";
import { useSharedScrollableRef } from "./hooks";
export function SceneComponent(_ref) {
  let {
    index,
    onScroll,
    ContainerView,
    contentContainerStyle,
    forwardedRef,
    style,
    ...restProps
  } = _ref;
  const {
    updateSceneInfo
  } = useHeaderTabContext();
  const scollViewRef = useSharedScrollableRef(forwardedRef);
  const scrollY = useSharedValue(0);
  useEffect(() => {
    if (scollViewRef && scollViewRef.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/React.createElement(ContainerView, _extends({
    ref: scollViewRef,
    scrollEventThrottle: 16,
    directionalLockEnabled: true,
    style: [styles.container, style],
    onScroll: onScroll,
    contentContainerStyle: [contentContainerStyle],
    bounces: false
  }, restProps));
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.web.js.map