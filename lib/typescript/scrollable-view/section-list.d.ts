import React from "react";
import { SectionList as RNSectionList, SectionListProps } from "react-native";
export type TabSectionListProps<T, SectionT> = SectionListProps<T, SectionT> & {
    index: number;
};
export declare const TabSectionList: <T, SectionT>(props: SectionListProps<T, SectionT> & {
    index: number;
} & {
    ref?: React.Ref<RNSectionList<T, SectionT>> | undefined;
}) => React.ReactElement;
//# sourceMappingURL=section-list.d.ts.map