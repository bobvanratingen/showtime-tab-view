function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { memo } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { useRefreshDerivedValue } from "./hooks";
import { RefreshTypeEnum } from "./types";
const RefreshControlContainer = _ref => {
  let {
    top,
    refreshHeight,
    overflowPull,
    opacityValue,
    refreshValue,
    isRefreshing,
    isRefreshingWithAnimation,
    pullExtendedCoefficient,
    renderContent,
    refreshControlColor = "#999999"
  } = _ref;
  const refreshType = useSharedValue(RefreshTypeEnum.Idle);
  const progress = useDerivedValue(() => {
    if (isRefreshingWithAnimation.value) return 1;
    return Math.min(refreshValue.value / refreshHeight, 1);
  });
  const tranYValue = useSharedValue(0);
  useRefreshDerivedValue(tranYValue, {
    animatedValue: refreshValue,
    refreshHeight,
    overflowPull,
    pullExtendedCoefficient
  });
  useAnimatedReaction(() => {
    return {
      _progress: progress.value,
      _isRefreshing: isRefreshing.value,
      _isRefreshingWithAnimation: isRefreshingWithAnimation.value
    };
  }, _ref2 => {
    let {
      _progress,
      _isRefreshing,
      _isRefreshingWithAnimation
    } = _ref2;
    if (_isRefreshing !== _isRefreshingWithAnimation) {
      refreshType.value = _isRefreshing ? RefreshTypeEnum.Pending : RefreshTypeEnum.Finish;
      return;
    }
    if (_isRefreshing) {
      refreshType.value = RefreshTypeEnum.Refreshing;
    } else {
      refreshType.value = _progress < 1 ? RefreshTypeEnum.Cancel : RefreshTypeEnum.Success;
    }
  }, [refreshHeight]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
      transform: [{
        translateY: tranYValue.value
      }]
    };
  });
  const _renderContent = () => {
    const _props = makeChildProps();
    if (renderContent) {
      return /*#__PURE__*/React.cloneElement(renderContent(_props), makeChildProps());
    }
    return /*#__PURE__*/React.createElement(RefreshControlNormal, _extends({}, _props, {
      refreshControlColor: refreshControlColor
    }));
  };
  const makeChildProps = () => {
    return {
      refreshValue,
      refreshType,
      progress
    };
  };
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, {
      top: top - refreshHeight,
      height: refreshHeight
    }, animatedStyle]
  }, _renderContent());
};
export default RefreshControlContainer;
const RefreshControlNormal = /*#__PURE__*/memo(function RefreshControlNormal(_ref3) {
  let {
    refreshControlColor
  } = _ref3;
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: styles.baseControl
  }, /*#__PURE__*/React.createElement(ActivityIndicator, {
    color: refreshControlColor
  }));
});
const styles = StyleSheet.create({
  baseControl: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingTop: 10
  },
  container: {
    left: 0,
    position: "absolute",
    right: 0,
    width: "100%"
  },
  textStyle: {
    marginTop: 4,
    fontSize: 13,
    textAlign: "center"
  }
});
//# sourceMappingURL=refresh-control.js.map