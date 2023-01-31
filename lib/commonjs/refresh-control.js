"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _hooks = require("./hooks");
var _types = require("./types");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  const refreshType = (0, _reactNativeReanimated.useSharedValue)(_types.RefreshTypeEnum.Idle);
  const progress = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (isRefreshingWithAnimation.value) return 1;
    return Math.min(refreshValue.value / refreshHeight, 1);
  });
  const tranYValue = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _hooks.useRefreshDerivedValue)(tranYValue, {
    animatedValue: refreshValue,
    refreshHeight,
    overflowPull,
    pullExtendedCoefficient
  });
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
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
      refreshType.value = _isRefreshing ? _types.RefreshTypeEnum.Pending : _types.RefreshTypeEnum.Finish;
      return;
    }
    if (_isRefreshing) {
      refreshType.value = _types.RefreshTypeEnum.Refreshing;
    } else {
      refreshType.value = _progress < 1 ? _types.RefreshTypeEnum.Cancel : _types.RefreshTypeEnum.Success;
    }
  }, [refreshHeight]);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
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
      return /*#__PURE__*/_react.default.cloneElement(renderContent(_props), makeChildProps());
    }
    return /*#__PURE__*/_react.default.createElement(RefreshControlNormal, _extends({}, _props, {
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
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.container, {
      top: top - refreshHeight,
      height: refreshHeight
    }, animatedStyle]
  }, _renderContent());
};
var _default = RefreshControlContainer;
exports.default = _default;
const RefreshControlNormal = /*#__PURE__*/(0, _react.memo)(function RefreshControlNormal(_ref3) {
  let {
    refreshControlColor
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: styles.baseControl
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    color: refreshControlColor
  }));
});
const styles = _reactNative.StyleSheet.create({
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