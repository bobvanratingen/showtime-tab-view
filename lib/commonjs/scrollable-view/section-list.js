"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabSectionList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _scene = require("../scene");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatePageView = _reactNative.Platform.OS === "web" ? _reactNative.SectionList : _reactNativeReanimated.default.createAnimatedComponent(_reactNative.SectionList);
function SectionList(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_scene.SceneComponent, _extends({}, props, {
    forwardedRef: ref,
    ContainerView: AnimatePageView
  }));
}
const TabSectionList = /*#__PURE__*/_react.default.forwardRef(SectionList);
exports.TabSectionList = TabSectionList;
//# sourceMappingURL=section-list.js.map