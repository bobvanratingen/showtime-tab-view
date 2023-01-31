import React from "react";
import { TabView, TabViewProps } from "react-native-tab-view";
import type { CollapsibleHeaderProps, Route } from "./types";
export type CollapsibleTabViewRef = {};
export type CollapsibleTabViewProps<T extends Route> = Partial<TabViewProps<T>> & Pick<TabViewProps<T>, "onIndexChange" | "navigationState" | "renderScene"> & CollapsibleHeaderProps<T>;
export type ForwardTabViewProps<T extends Route> = CollapsibleTabViewProps<T> & {
    forwardedRef: React.ForwardedRef<CollapsibleTabViewRef>;
    Component: React.PropsWithRef<typeof TabView>;
};
export declare function createCollapsibleTabsComponent<T extends Route>(Component: React.PropsWithRef<typeof TabView>): React.ForwardRefExoticComponent<Partial<TabViewProps<T>> & Pick<TabViewProps<T>, "navigationState" | "onIndexChange" | "renderScene"> & CollapsibleHeaderProps<T> & React.RefAttributes<CollapsibleTabViewRef>>;
//# sourceMappingURL=create-collapsible-tabs.d.ts.map