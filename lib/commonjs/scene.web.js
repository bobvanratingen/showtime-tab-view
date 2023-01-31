"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneComponent = SceneComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _context = require("./context");
var _hooks = require("./hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function SceneComponent(_ref) {
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
  } = (0, _context.useHeaderTabContext)();
  const scollViewRef = (0, _hooks.useSharedScrollableRef)(forwardedRef);
  const scrollY = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _react.useEffect)(() => {
    if (scollViewRef && scollViewRef.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/_react.default.createElement(ContainerView, _extends({
    ref: scollViewRef,
    scrollEventThrottle: 16,
    directionalLockEnabled: true,
    style: [styles.container, style],
    onScroll: onScroll,
    contentContainerStyle: [contentContainerStyle],
    bounces: false
  }, restProps));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.web.js.map