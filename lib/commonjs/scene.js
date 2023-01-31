"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneComponent = SceneComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _context = require("./context");
var _hooks = require("./hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function SceneComponent(_ref) {
  let {
    index,
    onScroll: propOnScroll,
    onContentSizeChange,
    ContainerView,
    contentContainerStyle,
    scrollIndicatorInsets,
    forwardedRef,
    useExternalScrollView = false,
    ...restProps
  } = _ref;
  //#region refs
  const nativeGestureRef = (0, _react.useRef)(_reactNativeGestureHandler.Gesture.Native());
  const scollViewRef = (0, _hooks.useSharedScrollableRef)(forwardedRef);
  //#endregion

  //#region hooks
  const {
    shareAnimatedValue,
    headerHeight,
    expectHeight,
    curIndexValue,
    refHasChanged,
    updateSceneInfo,
    scrollViewPaddingTop
  } = (0, _context.useHeaderTabContext)();
  //#endregion

  //#region animations/style
  const scrollY = (0, _reactNativeReanimated.useSharedValue)(0);
  const {
    opacityValue,
    initialPosition
  } = (0, _hooks.useSyncInitialPosition)(scollViewRef);
  const sceneStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.withTiming)(opacityValue.value)
    };
  }, [opacityValue]);

  //#endregion

  //#region methods
  const onScrollAnimateEvent = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: e => {
      const moveY = e.contentOffset.y;
      scrollY.value = moveY;
      if (curIndexValue.value !== index) return;
      shareAnimatedValue.value = moveY;
      if (propOnScroll) {
        (0, _reactNativeReanimated.runOnJS)(propOnScroll)({
          nativeEvent: e
        });
      }
    }
  });
  // adjust the scene size
  const _onContentSizeChange = (0, _react.useCallback)((contentWidth, contentHeight) => {
    onContentSizeChange === null || onContentSizeChange === void 0 ? void 0 : onContentSizeChange(contentWidth, contentHeight);
    if (Math.ceil(contentHeight) >= expectHeight) {
      initialPosition(shareAnimatedValue.value);
    }
  }, [onContentSizeChange, initialPosition, expectHeight, shareAnimatedValue]);
  //#endregion

  (0, _react.useEffect)(() => {
    refHasChanged === null || refHasChanged === void 0 ? void 0 : refHasChanged(nativeGestureRef.current);
  }, [refHasChanged]);
  (0, _react.useEffect)(() => {
    if (scollViewRef && scollViewRef.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.container, sceneStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: nativeGestureRef.current
  }, /*#__PURE__*/_react.default.createElement(ContainerView, _extends({}, restProps, {
    ref: scollViewRef,
    scrollEventThrottle: 16,
    directionalLockEnabled: true,
    contentContainerStyle: [contentContainerStyle, {
      paddingTop: useExternalScrollView ? 0 : scrollViewPaddingTop,
      minHeight: expectHeight
    }],
    onContentSizeChange: _onContentSizeChange,
    onScroll: onScrollAnimateEvent,
    scrollIndicatorInsets: {
      top: headerHeight,
      ...scrollIndicatorInsets
    }
    // bounces={false}
  }))));
}

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.js.map