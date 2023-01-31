"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCollapsibleTabsComponent = createCollapsibleTabsComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeTabView = require("react-native-tab-view");
var _gestureContainer = require("./gesture-container");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function createCollapsibleTabsComponent(Component) {
  return /*#__PURE__*/_react.default.forwardRef(function tabView(props, ref) {
    return /*#__PURE__*/_react.default.createElement(CollapsibleHeaderTabView, _extends({}, props, {
      forwardedRef: ref,
      Component: Component
    }));
  });
}
function CollapsibleHeaderTabView(_ref) {
  let {
    forwardedRef,
    ...props
  } = _ref;
  const gestureContainerRef = (0, _react.useRef)(null);
  const initialPageRef = (0, _react.useRef)(props.navigationState.index);
  (0, _react.useEffect)(() => {
    var _gestureContainerRef$;
    (_gestureContainerRef$ = gestureContainerRef.current) === null || _gestureContainerRef$ === void 0 ? void 0 : _gestureContainerRef$.setCurrentIndex(props.navigationState.index);
  }, [props.navigationState.index]);
  (0, _react.useImperativeHandle)(forwardedRef, () => ({
    // Todo: add snapTo tab view content method
  }), []);
  const renderTabBar = (0, _react.useCallback)(tabbarProps => {
    return props !== null && props !== void 0 && props.renderTabBar ? props.renderTabBar(tabbarProps) : /*#__PURE__*/_react.default.createElement(_reactNativeTabView.TabBar, tabbarProps);
  }, [props]);
  const renderTabView = e => {
    const {
      Component,
      renderScene,
      ...restProps
    } = props;
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, restProps, {
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    }));
  };
  return (
    /*#__PURE__*/
    //@ts-ignore
    _react.default.createElement(_gestureContainer.GestureContainer, _extends({
      ref: gestureContainerRef,
      initialPage: initialPageRef.current,
      renderTabView: renderTabView
    }, props))
  );
}
//# sourceMappingURL=create-collapsible-tabs.js.map