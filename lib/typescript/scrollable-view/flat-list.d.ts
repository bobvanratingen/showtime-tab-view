import React from "react";
import { FlatList as RNFlatList, FlatListProps } from "react-native";
export type TabFlatListProps<T> = FlatListProps<T> & {
    index: number;
};
export declare const TabFlatList: <T>(props: FlatListProps<T> & {
    index: number;
} & {
    ref?: React.Ref<RNFlatList<T>> | undefined;
}) => React.ReactElement;
//# sourceMappingURL=flat-list.d.ts.map