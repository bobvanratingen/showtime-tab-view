import React from "react";
import Animated from "react-native-reanimated";
import { RefreshControlProps } from "./types";
type RefreshControlContainerProps = {
    top: number;
    refreshHeight: number;
    overflowPull: number;
    opacityValue: Animated.SharedValue<number>;
    refreshValue: Animated.SharedValue<number>;
    isRefreshing: Animated.SharedValue<boolean>;
    isRefreshingWithAnimation: Animated.SharedValue<boolean>;
    pullExtendedCoefficient: number;
    renderContent?: (refreshProps: RefreshControlProps) => React.ReactElement;
    refreshControlColor?: string;
};
declare const RefreshControlContainer: React.FC<RefreshControlContainerProps>;
export default RefreshControlContainer;
//# sourceMappingURL=refresh-control.d.ts.map