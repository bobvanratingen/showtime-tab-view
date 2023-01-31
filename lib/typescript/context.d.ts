import React from "react";
import type { TabHeaderContext } from "./types";
export declare const HeaderTabContext: React.Context<TabHeaderContext>;
export declare const useHeaderTabContext: () => {
    isSlidingHeader: {
        value: boolean;
    };
    shareAnimatedValue: {
        value: number;
    };
    isStartRefreshing: {
        value: boolean;
    };
    minHeaderHeight: number;
    tabbarHeight: number;
    headerHeight: number;
    scrollStickyHeaderHeight: number;
    refreshHeight: number;
    overflowPull: number;
    pullExtendedCoefficient: number;
    headerTrans: {
        value: number;
    };
    expectHeight: number;
    refHasChanged: (ref: import("react-native-gesture-handler/lib/typescript/handlers/gestures/nativeGesture").NativeGesture) => void;
    curIndexValue: {
        value: number;
    };
    updateSceneInfo: (e: import("./types").UpdateSceneInfoParams) => void;
    scrollViewPaddingTop: number;
};
//# sourceMappingURL=context.d.ts.map