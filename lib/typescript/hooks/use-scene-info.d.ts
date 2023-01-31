import Animated from "react-native-reanimated";
import type { UpdateSceneInfoParams } from "../types";
export declare const useSceneInfo: (curIndexValue: Animated.SharedValue<number>) => {
    childScrollRef: {
        [index: number]: any;
    };
    childScrollYTrans: {
        [index: number]: Animated.SharedValue<number>;
    };
    sceneIsReady: import("react-native-reanimated").SharedValue<{
        [index: number]: boolean;
    }>;
    updateSceneInfo: ({ index, scrollRef, scrollY }: UpdateSceneInfoParams) => void;
};
//# sourceMappingURL=use-scene-info.d.ts.map