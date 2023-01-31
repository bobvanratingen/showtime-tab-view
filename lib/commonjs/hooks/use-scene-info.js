"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSceneInfo = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
/* eslint-disable react-hooks/exhaustive-deps */

const useSceneInfo = curIndexValue => {
  const sceneIsReady = (0, _reactNativeReanimated.useSharedValue)({});
  const [childScrollYTrans, setChildScrollYTrans] = (0, _react.useState)({});
  const [childScrollRef, setChildScrollRef] = (0, _react.useState)({});
  const updateSceneInfo = (0, _react.useCallback)(_ref => {
    let {
      index,
      scrollRef,
      scrollY
    } = _ref;
    if (scrollRef && childScrollRef[index] !== scrollRef) {
      setChildScrollRef(preChildRef => {
        return {
          ...preChildRef,
          [index]: scrollRef
        };
      });
    }
    if (scrollY && childScrollYTrans[index] !== scrollY) {
      setChildScrollYTrans(_p => {
        return {
          ..._p,
          [index]: scrollY
        };
      });
    }
  }, []);
  const aArray = [childScrollRef, childScrollYTrans];
  const updateIsReady = (0, _react.useCallback)(() => {
    const mIndex = curIndexValue.value;
    const isReady = aArray.every(item => Object.prototype.hasOwnProperty.call(item, mIndex));
    if (isReady) {
      sceneIsReady.value = {
        ...sceneIsReady.value,
        [mIndex]: isReady
      };
    }
  }, [curIndexValue, sceneIsReady, ...aArray]);

  // We should call function updateIsReady when the elements in the aArray change
  (0, _react.useEffect)(() => {
    updateIsReady();
  }, [updateIsReady, ...aArray]);

  /**
   * If all of the elements in the Aarray have changed, the tabIndex is switched.
   * At this point the above useEffect will not be called again,
   * and we will have to call the updateisReady function again.
   */
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return curIndexValue.value;
  }, () => {
    (0, _reactNativeReanimated.runOnJS)(updateIsReady)();
  }, [updateIsReady]);
  return {
    childScrollRef,
    childScrollYTrans,
    sceneIsReady,
    updateSceneInfo
  };
};
exports.useSceneInfo = useSceneInfo;
//# sourceMappingURL=use-scene-info.js.map