/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { runOnJS, useAnimatedReaction, useSharedValue } from "react-native-reanimated";
export const useSceneInfo = curIndexValue => {
  const sceneIsReady = useSharedValue({});
  const [childScrollYTrans, setChildScrollYTrans] = useState({});
  const [childScrollRef, setChildScrollRef] = useState({});
  const updateSceneInfo = useCallback(_ref => {
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
  const updateIsReady = useCallback(() => {
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
  useEffect(() => {
    updateIsReady();
  }, [updateIsReady, ...aArray]);

  /**
   * If all of the elements in the Aarray have changed, the tabIndex is switched.
   * At this point the above useEffect will not be called again,
   * and we will have to call the updateisReady function again.
   */
  useAnimatedReaction(() => {
    return curIndexValue.value;
  }, () => {
    runOnJS(updateIsReady)();
  }, [updateIsReady]);
  return {
    childScrollRef,
    childScrollYTrans,
    sceneIsReady,
    updateSceneInfo
  };
};
//# sourceMappingURL=use-scene-info.js.map