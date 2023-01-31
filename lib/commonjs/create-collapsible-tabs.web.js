"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TabFlatList", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabFlatList;
  }
});
Object.defineProperty(exports, "TabFlatListProps", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabFlatListProps;
  }
});
Object.defineProperty(exports, "TabScrollView", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabScrollView;
  }
});
Object.defineProperty(exports, "TabScrollViewProps", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabScrollViewProps;
  }
});
Object.defineProperty(exports, "TabSectionList", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabSectionList;
  }
});
Object.defineProperty(exports, "TabSectionListProps", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabSectionListProps;
  }
});
exports.createCollapsibleTabsComponent = createCollapsibleTabsComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeTabView = require("react-native-tab-view");
var _reactStickynode = _interopRequireDefault(require("react-stickynode"));
var _context = require("./context");
var _hooks = require("./hooks");
var _scrollableView = require("./scrollable-view");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function createCollapsibleTabsComponent() {
  return /*#__PURE__*/_react.default.forwardRef(CollapsibleHeaderTabView);
}
function CollapsibleHeaderTabView(_ref, ref) {
  let {
    renderTabBar: renderTabBarProp,
    renderScrollHeader,
    initTabbarHeight = 44,
    minHeaderHeight = 0,
    navigationState,
    emptyBodyComponent,
    renderScene,
    renderSceneHeader: renderSceneHeaderProp,
    ...restProps
  } = _ref;
  const shareAnimatedValue = {
    value: 0
  };
  const headerTrans = {
    value: 0
  };
  const curIndexValue = {
    value: 0
  };
  const isSlidingHeader = {
    value: false
  };
  const isStartRefreshing = {
    value: false
  };

  // layout
  const [tabbarHeight, setTabbarHeight] = (0, _react.useState)(initTabbarHeight);
  const containeRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({}), []);
  const tabbarOnLayout = (0, _react.useCallback)(_ref2 => {
    let {
      nativeEvent: {
        layout: {
          height
        }
      }
    } = _ref2;
    if (Math.abs(tabbarHeight - height) < 1) return;
    setTabbarHeight(height);
  }, [tabbarHeight]);
  const renderTabBar = (0, _react.useCallback)(tabbarProps => {
    return renderTabBarProp ? renderTabBarProp(tabbarProps) : /*#__PURE__*/_react.default.createElement(_reactNativeTabView.TabBar, tabbarProps);
  }, [renderTabBarProp]);
  const renderTabView = e => {
    return /*#__PURE__*/_react.default.createElement(_reactNativeTabView.TabView, _extends({
      navigationState: navigationState
    }, restProps, {
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    }));
  };
  const renderTabBarContainer = children => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.tabbarStyle
    }, /*#__PURE__*/_react.default.createElement(_reactStickynode.default, {
      enabled: true,
      top: minHeaderHeight
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      onLayout: tabbarOnLayout
    }, children)));
  };
  const renderSceneHeader = (children, props) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.full
    }, renderSceneHeaderProp === null || renderSceneHeaderProp === void 0 ? void 0 : renderSceneHeaderProp(props.route), children);
  };
  const {
    updateSceneInfo
  } = (0, _hooks.useSceneInfo)(curIndexValue);
  return /*#__PURE__*/_react.default.createElement(_context.HeaderTabContext.Provider, {
    value: {
      shareAnimatedValue,
      headerTrans,
      tabbarHeight,
      expectHeight: 0,
      headerHeight: 0,
      refreshHeight: 0,
      overflowPull: 0,
      pullExtendedCoefficient: 0,
      refHasChanged: () => false,
      curIndexValue,
      minHeaderHeight,
      updateSceneInfo,
      isSlidingHeader,
      isStartRefreshing,
      scrollStickyHeaderHeight: 0,
      scrollViewPaddingTop: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    ref: containeRef,
    style: styles.full
  }, renderScrollHeader && renderScrollHeader(), navigationState.routes.length === 0 && emptyBodyComponent ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: tabbarHeight
    }
  }, emptyBodyComponent) : renderTabView({
    renderTabBarContainer: renderTabBarContainer,
    renderSceneHeader: renderSceneHeader
  })));
}
const styles = _reactNative.StyleSheet.create({
  full: {
    flex: 1
  },
  tabbarStyle: {
    zIndex: 1
  }
});
//# sourceMappingURL=create-collapsible-tabs.web.js.map