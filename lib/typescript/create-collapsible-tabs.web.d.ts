import React from "react";
import { TabViewProps } from "react-native-tab-view";
import type { CollapsibleHeaderProps, Route } from "./types";
export { TabFlatList, TabScrollView, TabSectionList, TabScrollViewProps, TabFlatListProps, TabSectionListProps, } from "./scrollable-view";
export type HeaderTabViewRef = {};
export type HeaderTabViewProps<T extends Route> = Partial<TabViewProps<T>> & Pick<TabViewProps<T>, "onIndexChange" | "navigationState" | "renderScene"> & CollapsibleHeaderProps<T>;
export declare function createCollapsibleTabsComponent(): React.ForwardRefExoticComponent<Partial<TabViewProps<Route>> & Pick<TabViewProps<Route>, "navigationState" | "onIndexChange" | "renderScene"> & CollapsibleHeaderProps<Route> & React.RefAttributes<unknown>>;
//# sourceMappingURL=create-collapsible-tabs.web.d.ts.map