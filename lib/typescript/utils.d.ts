import Animated from "react-native-reanimated";
export declare function _ScrollTo(ref: any, x: number, y: number, animated: boolean): void;
export declare const isIOS: boolean;
export declare const animateToRefresh: ({ transRefreshing, isRefreshing, isRefreshingWithAnimation, isToRefresh, destPoi, onStartRefresh, }: {
    transRefreshing: Animated.SharedValue<number>;
    isRefreshing: Animated.SharedValue<boolean>;
    isRefreshingWithAnimation: Animated.SharedValue<boolean>;
    isToRefresh: boolean;
    destPoi: number;
    onStartRefresh?: (() => void) | undefined;
}) => void;
//# sourceMappingURL=utils.d.ts.map