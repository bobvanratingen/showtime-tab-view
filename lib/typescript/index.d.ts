/// <reference types="react" />
export { TabFlatList, TabScrollView, TabSectionList } from "./scrollable-view";
export * from "./create-collapsible-tabs";
export * from "./scene";
export * from "./types";
export type { TabScrollViewProps, TabFlatListProps, TabSectionListProps, } from "./scrollable-view";
export { useHeaderTabContext } from "./context";
export declare const TabView: import("react").ForwardRefExoticComponent<Partial<import("react-native-tab-view").TabViewProps<any>> & Pick<import("react-native-tab-view").TabViewProps<any>, "navigationState" | "onIndexChange" | "renderScene"> & import("./types").CollapsibleHeaderProps<any> & import("react").RefAttributes<import("./create-collapsible-tabs").CollapsibleTabViewRef>>;
//# sourceMappingURL=index.d.ts.map