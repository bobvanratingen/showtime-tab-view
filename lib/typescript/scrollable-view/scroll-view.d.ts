import React from "react";
import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";
export type TabScrollViewProps = ScrollViewProps & {
    index: number;
};
export declare const TabScrollView: (props: TabScrollViewProps & {
    ref?: React.Ref<RNScrollView>;
}) => React.ReactElement;
//# sourceMappingURL=scroll-view.d.ts.map