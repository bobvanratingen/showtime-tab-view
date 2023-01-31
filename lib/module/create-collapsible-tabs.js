function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { TabBar } from "react-native-tab-view";
import { GestureContainer } from "./gesture-container";
export function createCollapsibleTabsComponent(Component) {
  return /*#__PURE__*/React.forwardRef(function tabView(props, ref) {
    return /*#__PURE__*/React.createElement(CollapsibleHeaderTabView, _extends({}, props, {
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
  const gestureContainerRef = useRef(null);
  const initialPageRef = useRef(props.navigationState.index);
  useEffect(() => {
    var _gestureContainerRef$;
    (_gestureContainerRef$ = gestureContainerRef.current) === null || _gestureContainerRef$ === void 0 ? void 0 : _gestureContainerRef$.setCurrentIndex(props.navigationState.index);
  }, [props.navigationState.index]);
  useImperativeHandle(forwardedRef, () => ({
    // Todo: add snapTo tab view content method
  }), []);
  const renderTabBar = useCallback(tabbarProps => {
    return props !== null && props !== void 0 && props.renderTabBar ? props.renderTabBar(tabbarProps) : /*#__PURE__*/React.createElement(TabBar, tabbarProps);
  }, [props]);
  const renderTabView = e => {
    const {
      Component,
      renderScene,
      ...restProps
    } = props;
    return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    }));
  };
  return (
    /*#__PURE__*/
    //@ts-ignore
    React.createElement(GestureContainer, _extends({
      ref: gestureContainerRef,
      initialPage: initialPageRef.current,
      renderTabView: renderTabView
    }, props))
  );
}
//# sourceMappingURL=create-collapsible-tabs.js.map