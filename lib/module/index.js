import { TabView as RNTabView } from "react-native-tab-view";
import { createCollapsibleTabsComponent } from "./create-collapsible-tabs";
export { TabFlatList, TabScrollView, TabSectionList } from "./scrollable-view";
export * from "./create-collapsible-tabs";
export * from "./scene";
export * from "./types";
export * from "./hooks";
export { useHeaderTabContext } from "./context";
export const TabView = createCollapsibleTabsComponent(RNTabView);
//# sourceMappingURL=index.js.map