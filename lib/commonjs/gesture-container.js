"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _context = require("./context");
var _useRefreshValue = require("./hooks/use-refresh-value");
var _useSceneInfo = require("./hooks/use-scene-info");
var _refreshControl = _interopRequireDefault(require("./refresh-control"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  width
} = _reactNative.Dimensions.get("window");
const GestureContainer = /*#__PURE__*/_react.default.forwardRef(function GestureContainer(_ref, forwardedRef) {
  let {
    refreshHeight = 80,
    pullExtendedCoefficient = 0.1,
    overflowPull = 50,
    overflowHeight = 0,
    scrollEnabled = true,
    minHeaderHeight = 0,
    isRefreshing: isRefreshingProp = false,
    initialPage,
    onStartRefresh,
    initTabbarHeight = 49,
    initHeaderHeight = 0,
    renderScrollHeader,
    overridenShareAnimatedValue,
    overridenTranslateYValue,
    renderTabView,
    renderRefreshControl: renderRefreshControlProp,
    animationHeaderPosition,
    animationHeaderHeight,
    panHeaderMaxOffset,
    onPullEnough,
    refreshControlColor,
    refreshControlTop = 0,
    emptyBodyComponent,
    navigationState,
    renderSceneHeader: renderSceneHeaderProp
  } = _ref;
  //#region animation value
  const defaultShareAnimatedValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const shareAnimatedValue = overridenShareAnimatedValue || defaultShareAnimatedValue;
  const defaultTranslateYValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const translateYValue = overridenTranslateYValue || defaultTranslateYValue;
  const curIndexValue = (0, _reactNativeReanimated.useSharedValue)(initialPage);
  const isSlidingHeader = (0, _reactNativeReanimated.useSharedValue)(false);
  const slideIndex = (0, _reactNativeReanimated.useSharedValue)(curIndexValue.value);
  const headerTrans = (0, _reactNativeReanimated.useSharedValue)(0);
  const opacityValue = (0, _reactNativeReanimated.useSharedValue)(initHeaderHeight === 0 ? 0 : 1);
  /* pull-refresh */
  const isDragging = (0, _reactNativeReanimated.useSharedValue)(false);
  const tabsTrans = (0, _reactNativeReanimated.useSharedValue)(0);
  const tabsRefreshTrans = (0, _reactNativeReanimated.useSharedValue)(refreshHeight);
  const isRefreshing = (0, _reactNativeReanimated.useSharedValue)(false);
  const isStartRefreshing = (0, _reactNativeReanimated.useSharedValue)(false);
  const isRefreshingWithAnimation = (0, _reactNativeReanimated.useSharedValue)(false);
  const basyY = (0, _reactNativeReanimated.useSharedValue)(0);
  const startY = (0, _reactNativeReanimated.useSharedValue)(0);
  const isPullEnough = (0, _reactNativeReanimated.useSharedValue)(false);
  const headerTransStartY = (0, _reactNativeReanimated.useSharedValue)(0);
  const dragIndex = (0, _reactNativeReanimated.useSharedValue)(curIndexValue.value);
  //#endregion

  //#region hooks
  const {
    childScrollRef,
    childScrollYTrans,
    sceneIsReady,
    updateSceneInfo
  } = (0, _useSceneInfo.useSceneInfo)(curIndexValue);
  //#endregion

  //#region state
  const [tabbarHeight, setTabbarHeight] = (0, _react.useState)(initTabbarHeight);
  const [tabviewHeight, setTabviewHeight] = (0, _react.useState)(0);
  const [headerHeight, setHeaderHeight] = (0, _react.useState)(initHeaderHeight - overflowHeight);
  const [scrollStickyHeaderHeight, setStickyHeaderHeight] = (0, _react.useState)(0);
  const [childGestures, setChildRefs] = (0, _react.useState)([]);
  //#endregion

  const calcHeight = (0, _react.useMemo)(() => headerHeight - minHeaderHeight, [headerHeight, minHeaderHeight]);

  //#region methods
  const animateTabsToRefresh = (0, _react.useCallback)(isToRefresh => {
    "worklet";

    if (isToRefresh) {
      (0, _utils.animateToRefresh)({
        transRefreshing: tabsRefreshTrans,
        isRefreshing: isRefreshing,
        isRefreshingWithAnimation: isRefreshingWithAnimation,
        destPoi: 0,
        isToRefresh,
        onStartRefresh
      });
    } else {
      const destPoi = tabsRefreshTrans.value > refreshHeight ? tabsRefreshTrans.value + refreshHeight : refreshHeight;
      (0, _utils.animateToRefresh)({
        transRefreshing: tabsRefreshTrans,
        isRefreshing: isRefreshing,
        isRefreshingWithAnimation: isRefreshingWithAnimation,
        destPoi,
        isToRefresh
      });
    }
  }, [tabsRefreshTrans, isRefreshing, isRefreshingWithAnimation, onStartRefresh, refreshHeight]);
  const stopScrollView = () => {
    "worklet";

    if (!sceneIsReady.value[curIndexValue.value]) return;
    (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, childScrollYTrans[curIndexValue.value].value + 0.1, false);
  };
  const onTabsStartRefresh = (0, _react.useCallback)(() => {
    "worklet";

    animateTabsToRefresh(true);
  }, [animateTabsToRefresh]);
  const onTabsEndRefresh = (0, _react.useCallback)(() => {
    "worklet";

    animateTabsToRefresh(false);
  }, [animateTabsToRefresh]);
  const stopAllAnimation = () => {
    "worklet";

    if (!sceneIsReady.value[curIndexValue.value]) return;
    (0, _reactNativeReanimated.cancelAnimation)(headerTrans);
    slideIndex.value = -1;
    dragIndex.value = -1;
    const handleSceneSync = index => {
      if (!childScrollYTrans[index]) return;
      const syncPosition = Math.min(shareAnimatedValue.value, calcHeight);
      if (childScrollYTrans[index].value >= calcHeight && shareAnimatedValue.value >= calcHeight) return;
      (0, _utils._ScrollTo)(childScrollRef[index], 0, syncPosition, false);
    };
    for (const key in childScrollRef) {
      if (Object.prototype.hasOwnProperty.call(childScrollRef, key)) {
        if (parseInt(key, 10) === curIndexValue.value) continue;
        handleSceneSync(parseInt(key, 10));
      }
    }
  };
  const refHasChanged = (0, _react.useCallback)(ref => {
    if (!ref) return;
    const findItem = childGestures.find(item => item === ref);
    if (findItem) return;
    setChildRefs(prechildRefs => {
      return [...prechildRefs, ref];
    });
  }, [childGestures]);
  const headerOnLayout = (0, _react.useCallback)(_ref2 => {
    let {
      nativeEvent: {
        layout
      }
    } = _ref2;
    const height = layout.height - overflowHeight;
    setHeaderHeight(height);
    if (animationHeaderHeight) {
      animationHeaderHeight.value = Math.abs(calcHeight - minHeaderHeight);
    }
    opacityValue.value = (0, _reactNativeReanimated.withTiming)(1);
  }, [animationHeaderHeight, calcHeight, minHeaderHeight, opacityValue, overflowHeight]);
  const tabbarOnLayout = (0, _react.useCallback)(_ref3 => {
    let {
      nativeEvent: {
        layout: {
          height
        }
      }
    } = _ref3;
    if (overflowHeight > height) {
      console.warn("overflowHeight preferably less than the tabbar height");
    }
    if (Math.abs(tabbarHeight - height) < 1) return;
    setTabbarHeight(height);
  }, [tabbarHeight, overflowHeight]);
  const containerOnLayout = (0, _react.useCallback)(event => {
    setTabviewHeight(event.nativeEvent.layout.height);
  }, []);
  //#endregion

  //#region gesture handler
  const gestureHandlerHeader = _reactNativeGestureHandler.Gesture.Pan().activeOffsetY([-10, 10]).shouldCancelWhenOutside(false).enabled(scrollEnabled !== false).onBegin(() => {
    if (isRefreshing.value) return;
    stopScrollView();
  }).onUpdate(event => {
    if (!sceneIsReady.value[curIndexValue.value]) return;
    if (isSlidingHeader.value === false) {
      slideIndex.value = curIndexValue.value;
      headerTransStartY.value = childScrollYTrans[curIndexValue.value].value + event.translationY;
      isSlidingHeader.value = true;
    }
    headerTrans.value = Math.max(-event.translationY + headerTransStartY.value, 0);
  }).onEnd(event => {
    if (!sceneIsReady.value[curIndexValue.value]) return;
    if (isSlidingHeader.value === false) return;
    headerTransStartY.value = 0;
    headerTrans.value = (0, _reactNativeReanimated.withDecay)({
      velocity: -event.velocityY,
      clamp: [0, panHeaderMaxOffset ?? headerHeight - minHeaderHeight + overflowHeight]
    }, () => {
      isSlidingHeader.value = false;
    });
  });
  const gestureHandler = _reactNativeGestureHandler.Gesture.Pan().simultaneousWithExternalGesture(gestureHandlerHeader, ...childGestures).shouldCancelWhenOutside(false).enabled(scrollEnabled).activeOffsetX([-width, width]).activeOffsetY([-10, 10]).onBegin(() => {
    (0, _reactNativeReanimated.runOnUI)(stopAllAnimation)();
  }).onStart(() => {
    isPullEnough.value = false;
  }).onUpdate(event => {
    var _childScrollYTrans$cu;
    if (!sceneIsReady.value[curIndexValue.value] || !onStartRefresh || ((_childScrollYTrans$cu = childScrollYTrans[curIndexValue.value]) === null || _childScrollYTrans$cu === void 0 ? void 0 : _childScrollYTrans$cu.value) === undefined) return;
    const onReadyToActive = isPulling => {
      dragIndex.value = curIndexValue.value;
      if (isPulling) {
        return event.translationY;
      } else {
        return refreshHeight - tabsTrans.value + childScrollYTrans[curIndexValue.value].value;
      }
    };
    if (isRefreshing.value !== isRefreshingWithAnimation.value) return;
    if (isRefreshing.value) {
      if (isDragging.value === false) {
        const starty = onReadyToActive(false);
        startY.value = starty;
        isDragging.value = true;
      }
      tabsRefreshTrans.value = Math.max(-event.translationY + startY.value, 0);
    } else {
      if (childScrollYTrans[curIndexValue.value].value !== 0 || event.translationY <= 0) return;
      if (isDragging.value === false) {
        basyY.value = onReadyToActive(true);
        isDragging.value = true;
        return;
      }
      tabsRefreshTrans.value = refreshHeight - (event.translationY - basyY.value);
      if (!isPullEnough.value && tabsRefreshTrans.value < 0 && onPullEnough) {
        isPullEnough.value = true;
        (0, _reactNativeReanimated.runOnJS)(onPullEnough)();
      }
    }
  }).onEnd(event => {
    if (!sceneIsReady.value[curIndexValue.value] || !onStartRefresh) return;
    if (isDragging.value === false) return;
    isDragging.value = false;
    if (isRefreshing.value !== isRefreshingWithAnimation.value) return;
    if (isRefreshing.value) {
      startY.value = 0;
      tabsRefreshTrans.value = (0, _reactNativeReanimated.withDecay)({
        velocity: -event.velocityY,
        deceleration: 0.998,
        clamp: [0, Number.MAX_VALUE]
      }, () => {
        isDragging.value = false;
      });
    } else {
      tabsRefreshTrans.value < 0 ? onTabsStartRefresh() : onTabsEndRefresh();
    }
  });
  //#endregion

  (0, _react.useEffect)(() => {
    animateTabsToRefresh(isRefreshingProp);
  }, [isRefreshingProp, animateTabsToRefresh]);

  // render Refresh component
  const renderRefreshControl = (0, _react.useCallback)(() => {
    if (!onStartRefresh) return;
    return /*#__PURE__*/_react.default.createElement(_refreshControl.default, {
      top: refreshControlTop,
      refreshHeight: refreshHeight,
      overflowPull: overflowPull,
      refreshValue: tabsTrans,
      opacityValue: opacityValue,
      isRefreshing: isRefreshing,
      isRefreshingWithAnimation: isRefreshingWithAnimation,
      pullExtendedCoefficient: pullExtendedCoefficient,
      renderContent: renderRefreshControlProp,
      refreshControlColor: refreshControlColor
    });
  }, [renderRefreshControlProp, isRefreshing, isRefreshingWithAnimation, onStartRefresh, opacityValue, overflowPull, pullExtendedCoefficient, refreshControlColor, refreshControlTop, refreshHeight, tabsTrans]);

  //#region animation hooks
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return tabsRefreshTrans.value;
  }, mTrans => {
    tabsTrans.value = Math.max(refreshHeight - mTrans, 0);
  }, [refreshHeight, tabsRefreshTrans]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return shareAnimatedValue.value;
  }, scrollY => {
    // for scrollview bounces effect on iOS
    if (_utils.isIOS && animationHeaderPosition && scrollY < calcHeight) {
      animationHeaderPosition.value = -scrollY;
    }
  }, [calcHeight]);

  // slide header
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return headerTrans && slideIndex.value === curIndexValue.value && isSlidingHeader.value;
  }, start => {
    if (!start) return;
    if (!childScrollRef[curIndexValue.value]) return;
    if (childScrollYTrans[curIndexValue.value].value === headerTrans.value) return;
    (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, headerTrans.value || 0, false);
  }, [headerTrans, slideIndex, curIndexValue, childScrollRef, childScrollYTrans, isSlidingHeader]);
  // isRefreshing
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return tabsRefreshTrans.value > refreshHeight && isRefreshingWithAnimation.value;
  }, isStart => {
    if (!isStart) return;
    if (!childScrollRef[curIndexValue.value]) return;
    const transY = tabsRefreshTrans.value - refreshHeight;
    if (childScrollYTrans[curIndexValue.value].value === transY) return;
    (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, transY, false);
  }, [tabsRefreshTrans, curIndexValue, isRefreshingWithAnimation, childScrollRef, refreshHeight]);

  // drag
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    // added this for avoid tab view confusion when switching
    return tabsRefreshTrans.value < refreshHeight && shareAnimatedValue.value !== 0 && dragIndex.value === curIndexValue.value && (isDragging.value || isRefreshingWithAnimation.value);
  }, isStart => {
    if (!isStart) return;
    (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, 0, false);
  }, [tabsRefreshTrans, refreshHeight, shareAnimatedValue, dragIndex, onStartRefresh, curIndexValue, isDragging, isRefreshingWithAnimation, childScrollRef]);
  const headerTransValue = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const headerTransY = (0, _reactNativeReanimated.interpolate)(shareAnimatedValue.value, [0, calcHeight], [0, -calcHeight], _reactNativeReanimated.Extrapolation.CLAMP);
    // for iOS scrollview bounces prop spring effect.
    if (_utils.isIOS) {
      return shareAnimatedValue.value > 0 ? headerTransY : -shareAnimatedValue.value;
    } else {
      if (animationHeaderPosition && headerTransY < calcHeight) {
        animationHeaderPosition.value = headerTransY;
      }
      return headerTransY;
    }
  });
  const tabbarAnimateStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: headerTransValue.value
      }]
    };
  });
  (0, _useRefreshValue.useRefreshDerivedValue)(translateYValue, {
    animatedValue: tabsTrans,
    refreshHeight,
    overflowPull,
    pullExtendedCoefficient
  });
  const animateStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: translateYValue.value
      }]
    };
  });
  const opacityStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: opacityValue.value
    };
  });
  const headerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: headerTransValue.value
      }]
    };
  });
  //#endregion

  const renderTabBarContainer = children => {
    return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [styles.tabbarStyle, tabbarAnimateStyle]
    }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
      gesture: gestureHandlerHeader
    }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: styles.container
    }, renderScrollHeader && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      onLayout: headerOnLayout
    }, renderScrollHeader()), (navigationState === null || navigationState === void 0 ? void 0 : navigationState.routes.length) === 0 && emptyBodyComponent ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginTop: tabbarHeight
      }
    }, emptyBodyComponent) : /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: {
        transform: [{
          translateY: -overflowHeight
        }]
      },
      onLayout: tabbarOnLayout
    }, children))));
  };
  const renderSceneHeader = (children, props) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.header
    }, children, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      onLayout: _ref4 => {
        let {
          nativeEvent: {
            layout: {
              height
            }
          }
        } = _ref4;
        setStickyHeaderHeight(height);
      },
      style: [{
        top: headerHeight + tabbarHeight,
        ...styles.tabbarStyle
      }, headerStyle]
    }, renderSceneHeaderProp === null || renderSceneHeaderProp === void 0 ? void 0 : renderSceneHeaderProp(props.route)));
  };
  (0, _react.useImperativeHandle)(forwardedRef, () => ({
    setCurrentIndex: index => {
      curIndexValue.value = index;
    },
    scrollToPosition: position => {
      (0, _reactNativeReanimated.runOnUI)(() => {
        "worklet";

        Object.values(childScrollRef).forEach(ref => {
          (0, _utils._ScrollTo)(ref, 0, position, true);
        });
      })();
    }
  }), [curIndexValue, childScrollRef]);
  return /*#__PURE__*/_react.default.createElement(_context.HeaderTabContext.Provider, {
    value: {
      shareAnimatedValue,
      headerTrans,
      tabbarHeight,
      expectHeight: Math.floor(headerHeight + tabviewHeight - minHeaderHeight),
      headerHeight,
      refreshHeight,
      overflowPull,
      pullExtendedCoefficient,
      refHasChanged,
      curIndexValue,
      minHeaderHeight,
      updateSceneInfo,
      isSlidingHeader,
      isStartRefreshing,
      scrollStickyHeaderHeight,
      scrollViewPaddingTop: tabbarHeight + headerHeight + scrollStickyHeaderHeight
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gestureHandler
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.container, opacityStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.container, animateStyle],
    onLayout: containerOnLayout
  }, renderTabView({
    renderTabBarContainer: renderTabBarContainer,
    renderSceneHeader: renderSceneHeader
  })), renderRefreshControl())));
});
exports.GestureContainer = GestureContainer;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  header: {
    flex: 1
  },
  tabbarStyle: {
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 10
  }
});
//# sourceMappingURL=gesture-container.js.map