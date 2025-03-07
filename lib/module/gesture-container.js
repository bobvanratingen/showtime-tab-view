import React, { useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { cancelAnimation, Extrapolation, interpolate, runOnJS, runOnUI, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withTiming } from "react-native-reanimated";
import { HeaderTabContext } from "./context";
import { useRefreshDerivedValue } from "./hooks/use-refresh-value";
import { useSceneInfo } from "./hooks/use-scene-info";
import RefreshControlContainer from "./refresh-control";
import { animateToRefresh, isIOS, _ScrollTo } from "./utils";
const {
  width
} = Dimensions.get("window");
export const GestureContainer = /*#__PURE__*/React.forwardRef(function GestureContainer(_ref, forwardedRef) {
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
  const defaultShareAnimatedValue = useSharedValue(0);
  const shareAnimatedValue = overridenShareAnimatedValue || defaultShareAnimatedValue;
  const defaultTranslateYValue = useSharedValue(0);
  const translateYValue = overridenTranslateYValue || defaultTranslateYValue;
  const curIndexValue = useSharedValue(initialPage);
  const isSlidingHeader = useSharedValue(false);
  const slideIndex = useSharedValue(curIndexValue.value);
  const headerTrans = useSharedValue(0);
  const opacityValue = useSharedValue(initHeaderHeight === 0 ? 0 : 1);
  /* pull-refresh */
  const isDragging = useSharedValue(false);
  const tabsTrans = useSharedValue(0);
  const tabsRefreshTrans = useSharedValue(refreshHeight);
  const isRefreshing = useSharedValue(false);
  const isStartRefreshing = useSharedValue(false);
  const isRefreshingWithAnimation = useSharedValue(false);
  const basyY = useSharedValue(0);
  const startY = useSharedValue(0);
  const isPullEnough = useSharedValue(false);
  const headerTransStartY = useSharedValue(0);
  const dragIndex = useSharedValue(curIndexValue.value);
  //#endregion

  //#region hooks
  const {
    childScrollRef,
    childScrollYTrans,
    sceneIsReady,
    updateSceneInfo
  } = useSceneInfo(curIndexValue);
  //#endregion

  //#region state
  const [tabbarHeight, setTabbarHeight] = useState(initTabbarHeight);
  const [tabviewHeight, setTabviewHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(initHeaderHeight - overflowHeight);
  const [scrollStickyHeaderHeight, setStickyHeaderHeight] = useState(0);
  const [childGestures, setChildRefs] = useState([]);
  //#endregion

  const calcHeight = useMemo(() => headerHeight - minHeaderHeight, [headerHeight, minHeaderHeight]);

  //#region methods
  const animateTabsToRefresh = useCallback(isToRefresh => {
    "worklet";

    if (isToRefresh) {
      animateToRefresh({
        transRefreshing: tabsRefreshTrans,
        isRefreshing: isRefreshing,
        isRefreshingWithAnimation: isRefreshingWithAnimation,
        destPoi: 0,
        isToRefresh,
        onStartRefresh
      });
    } else {
      const destPoi = tabsRefreshTrans.value > refreshHeight ? tabsRefreshTrans.value + refreshHeight : refreshHeight;
      animateToRefresh({
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
    _ScrollTo(childScrollRef[curIndexValue.value], 0, childScrollYTrans[curIndexValue.value].value + 0.1, false);
  };
  const onTabsStartRefresh = useCallback(() => {
    "worklet";

    animateTabsToRefresh(true);
  }, [animateTabsToRefresh]);
  const onTabsEndRefresh = useCallback(() => {
    "worklet";

    animateTabsToRefresh(false);
  }, [animateTabsToRefresh]);
  const stopAllAnimation = () => {
    "worklet";

    if (!sceneIsReady.value[curIndexValue.value]) return;
    cancelAnimation(headerTrans);
    slideIndex.value = -1;
    dragIndex.value = -1;
    const handleSceneSync = index => {
      if (!childScrollYTrans[index]) return;
      const syncPosition = Math.min(shareAnimatedValue.value, calcHeight);
      if (childScrollYTrans[index].value >= calcHeight && shareAnimatedValue.value >= calcHeight) return;
      _ScrollTo(childScrollRef[index], 0, syncPosition, false);
    };
    for (const key in childScrollRef) {
      if (Object.prototype.hasOwnProperty.call(childScrollRef, key)) {
        if (parseInt(key, 10) === curIndexValue.value) continue;
        handleSceneSync(parseInt(key, 10));
      }
    }
  };
  const refHasChanged = useCallback(ref => {
    if (!ref) return;
    const findItem = childGestures.find(item => item === ref);
    if (findItem) return;
    setChildRefs(prechildRefs => {
      return [...prechildRefs, ref];
    });
  }, [childGestures]);
  const headerOnLayout = useCallback(_ref2 => {
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
    opacityValue.value = withTiming(1);
  }, [animationHeaderHeight, calcHeight, minHeaderHeight, opacityValue, overflowHeight]);
  const tabbarOnLayout = useCallback(_ref3 => {
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
  const containerOnLayout = useCallback(event => {
    setTabviewHeight(event.nativeEvent.layout.height);
  }, []);
  //#endregion

  //#region gesture handler
  const gestureHandlerHeader = Gesture.Pan().activeOffsetY([-10, 10]).shouldCancelWhenOutside(false).enabled(scrollEnabled !== false).onBegin(() => {
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
    headerTrans.value = withDecay({
      velocity: -event.velocityY,
      clamp: [0, panHeaderMaxOffset ?? headerHeight - minHeaderHeight + overflowHeight]
    }, () => {
      isSlidingHeader.value = false;
    });
  });
  const gestureHandler = Gesture.Pan().simultaneousWithExternalGesture(gestureHandlerHeader, ...childGestures).shouldCancelWhenOutside(false).enabled(scrollEnabled).activeOffsetX([-width, width]).activeOffsetY([-10, 10]).onBegin(() => {
    runOnUI(stopAllAnimation)();
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
        runOnJS(onPullEnough)();
      }
    }
  }).onEnd(event => {
    if (!sceneIsReady.value[curIndexValue.value] || !onStartRefresh) return;
    if (isDragging.value === false) return;
    isDragging.value = false;
    if (isRefreshing.value !== isRefreshingWithAnimation.value) return;
    if (isRefreshing.value) {
      startY.value = 0;
      tabsRefreshTrans.value = withDecay({
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

  useEffect(() => {
    animateTabsToRefresh(isRefreshingProp);
  }, [isRefreshingProp, animateTabsToRefresh]);

  // render Refresh component
  const renderRefreshControl = useCallback(() => {
    if (!onStartRefresh) return;
    return /*#__PURE__*/React.createElement(RefreshControlContainer, {
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
  useAnimatedReaction(() => {
    return tabsRefreshTrans.value;
  }, mTrans => {
    tabsTrans.value = Math.max(refreshHeight - mTrans, 0);
  }, [refreshHeight, tabsRefreshTrans]);
  useAnimatedReaction(() => {
    return shareAnimatedValue.value;
  }, scrollY => {
    // for scrollview bounces effect on iOS
    if (isIOS && animationHeaderPosition && scrollY < calcHeight) {
      animationHeaderPosition.value = -scrollY;
    }
  }, [calcHeight]);

  // slide header
  useAnimatedReaction(() => {
    return headerTrans && slideIndex.value === curIndexValue.value && isSlidingHeader.value;
  }, start => {
    if (!start) return;
    if (!childScrollRef[curIndexValue.value]) return;
    if (childScrollYTrans[curIndexValue.value].value === headerTrans.value) return;
    _ScrollTo(childScrollRef[curIndexValue.value], 0, headerTrans.value || 0, false);
  }, [headerTrans, slideIndex, curIndexValue, childScrollRef, childScrollYTrans, isSlidingHeader]);
  // isRefreshing
  useAnimatedReaction(() => {
    return tabsRefreshTrans.value > refreshHeight && isRefreshingWithAnimation.value;
  }, isStart => {
    if (!isStart) return;
    if (!childScrollRef[curIndexValue.value]) return;
    const transY = tabsRefreshTrans.value - refreshHeight;
    if (childScrollYTrans[curIndexValue.value].value === transY) return;
    _ScrollTo(childScrollRef[curIndexValue.value], 0, transY, false);
  }, [tabsRefreshTrans, curIndexValue, isRefreshingWithAnimation, childScrollRef, refreshHeight]);

  // drag
  useAnimatedReaction(() => {
    // added this for avoid tab view confusion when switching
    return tabsRefreshTrans.value < refreshHeight && shareAnimatedValue.value !== 0 && dragIndex.value === curIndexValue.value && (isDragging.value || isRefreshingWithAnimation.value);
  }, isStart => {
    if (!isStart) return;
    _ScrollTo(childScrollRef[curIndexValue.value], 0, 0, false);
  }, [tabsRefreshTrans, refreshHeight, shareAnimatedValue, dragIndex, onStartRefresh, curIndexValue, isDragging, isRefreshingWithAnimation, childScrollRef]);
  const headerTransValue = useDerivedValue(() => {
    const headerTransY = interpolate(shareAnimatedValue.value, [0, calcHeight], [0, -calcHeight], Extrapolation.CLAMP);
    // for iOS scrollview bounces prop spring effect.
    if (isIOS) {
      return shareAnimatedValue.value > 0 ? headerTransY : -shareAnimatedValue.value;
    } else {
      if (animationHeaderPosition && headerTransY < calcHeight) {
        animationHeaderPosition.value = headerTransY;
      }
      return headerTransY;
    }
  });
  const tabbarAnimateStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: headerTransValue.value
      }]
    };
  });
  useRefreshDerivedValue(translateYValue, {
    animatedValue: tabsTrans,
    refreshHeight,
    overflowPull,
    pullExtendedCoefficient
  });
  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: translateYValue.value
      }]
    };
  });
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value
    };
  });
  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: headerTransValue.value
      }]
    };
  });
  //#endregion

  const renderTabBarContainer = children => {
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.tabbarStyle, tabbarAnimateStyle]
    }, /*#__PURE__*/React.createElement(GestureDetector, {
      gesture: gestureHandlerHeader
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: styles.container
    }, renderScrollHeader && /*#__PURE__*/React.createElement(View, {
      onLayout: headerOnLayout
    }, renderScrollHeader()), (navigationState === null || navigationState === void 0 ? void 0 : navigationState.routes.length) === 0 && emptyBodyComponent ? /*#__PURE__*/React.createElement(View, {
      style: {
        marginTop: tabbarHeight
      }
    }, emptyBodyComponent) : /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        transform: [{
          translateY: -overflowHeight
        }]
      },
      onLayout: tabbarOnLayout
    }, children))));
  };
  const renderSceneHeader = (children, props) => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.header
    }, children, /*#__PURE__*/React.createElement(Animated.View, {
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
  useImperativeHandle(forwardedRef, () => ({
    setCurrentIndex: index => {
      curIndexValue.value = index;
    },
    scrollToPosition: position => {
      runOnUI(() => {
        "worklet";

        Object.values(childScrollRef).forEach(ref => {
          _ScrollTo(ref, 0, position, true);
        });
      })();
    }
  }), [curIndexValue, childScrollRef]);
  return /*#__PURE__*/React.createElement(HeaderTabContext.Provider, {
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
  }, /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: gestureHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, opacityStyle]
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, animateStyle],
    onLayout: containerOnLayout
  }, renderTabView({
    renderTabBarContainer: renderTabBarContainer,
    renderSceneHeader: renderSceneHeader
  })), renderRefreshControl())));
});
const styles = StyleSheet.create({
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