import React from "react";
import type { Route } from "./types";
export type GestureContainerRef = {
    setCurrentIndex: (index: number) => void;
} | null;
export declare const GestureContainer: React.ForwardRefExoticComponent<Pick<import("react-native-tab-view").TabViewProps<Route>, "navigationState"> & import("./types").CollapsibleHeaderProps<Route> & {
    initialPage: number;
    renderTabView: (e: import("./types").TabViewCustomRenders) => JSX.Element;
} & React.RefAttributes<GestureContainerRef>>;
//# sourceMappingURL=gesture-container.d.ts.map