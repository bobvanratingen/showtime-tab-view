function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useImperativeHandle, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import Sticky from "react-stickynode";
import { HeaderTabContext } from "./context";
import { useSceneInfo } from "./hooks";
export { TabFlatList, TabScrollView, TabSectionList, TabScrollViewProps, TabFlatListProps, TabSectionListProps } from "./scrollable-view";
export function createCollapsibleTabsComponent() {
  return /*#__PURE__*/React.forwardRef(CollapsibleHeaderTabView);
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
  const [tabbarHeight, setTabbarHeight] = useState(initTabbarHeight);
  const containeRef = useRef(null);
  useImperativeHandle(ref, () => ({}), []);
  const tabbarOnLayout = useCallback(_ref2 => {
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
  const renderTabBar = useCallback(tabbarProps => {
    return renderTabBarProp ? renderTabBarProp(tabbarProps) : /*#__PURE__*/React.createElement(TabBar, tabbarProps);
  }, [renderTabBarProp]);
  const renderTabView = e => {
    return /*#__PURE__*/React.createElement(TabView, _extends({
      navigationState: navigationState
    }, restProps, {
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    }));
  };
  const renderTabBarContainer = children => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.tabbarStyle
    }, /*#__PURE__*/React.createElement(Sticky, {
      enabled: true,
      top: minHeaderHeight
    }, /*#__PURE__*/React.createElement(View, {
      onLayout: tabbarOnLayout
    }, children)));
  };
  const renderSceneHeader = (children, props) => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.full
    }, renderSceneHeaderProp === null || renderSceneHeaderProp === void 0 ? void 0 : renderSceneHeaderProp(props.route), children);
  };
  const {
    updateSceneInfo
  } = useSceneInfo(curIndexValue);
  return /*#__PURE__*/React.createElement(HeaderTabContext.Provider, {
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
  }, /*#__PURE__*/React.createElement(View, {
    ref: containeRef,
    style: styles.full
  }, renderScrollHeader && renderScrollHeader(), navigationState.routes.length === 0 && emptyBodyComponent ? /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: tabbarHeight
    }
  }, emptyBodyComponent) : renderTabView({
    renderTabBarContainer: renderTabBarContainer,
    renderSceneHeader: renderSceneHeader
  })));
}
const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  tabbarStyle: {
    zIndex: 1
  }
});
//# sourceMappingURL=create-collapsible-tabs.web.js.map