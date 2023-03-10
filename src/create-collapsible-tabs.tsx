import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
  TabViewProps,
} from "react-native-tab-view";

import { GestureContainer, GestureContainerRef } from "./gesture-container";
import type {
  CollapsibleHeaderProps,
  Route,
  TabViewCustomRenders,
} from "./types";
import { runOnUI, useSharedValue } from "react-native-reanimated";
import { _ScrollTo } from "./utils";
import { useSceneInfo } from "./hooks/use-scene-info";

export type CollapsibleTabViewRef = {};
export type CollapsibleTabViewProps<T extends Route> = Partial<
  TabViewProps<T>
> &
  Pick<TabViewProps<T>, "onIndexChange" | "navigationState" | "renderScene"> &
  CollapsibleHeaderProps<T>;

export type ForwardTabViewProps<T extends Route> =
  CollapsibleTabViewProps<T> & {
    forwardedRef: React.ForwardedRef<CollapsibleTabViewRef>;
    Component: React.PropsWithRef<typeof TabView>;
  };

export function createCollapsibleTabsComponent<T extends Route>(
  Component: React.PropsWithRef<typeof TabView>
) {
  return React.forwardRef<CollapsibleTabViewRef, CollapsibleTabViewProps<T>>(
    function tabView(props, ref) {
      return (
        <CollapsibleHeaderTabView
          {...props}
          forwardedRef={ref}
          Component={Component}
        />
      );
    }
  );
}

function CollapsibleHeaderTabView<T extends Route>({
  forwardedRef,
  ...props
}: ForwardTabViewProps<T>) {
  const gestureContainerRef = useRef<GestureContainerRef>(null);
  const initialPageRef = useRef(props.navigationState.index);

  useEffect(() => {
    gestureContainerRef.current?.setCurrentIndex(props.navigationState.index);
  }, [props.navigationState.index]);

  const curIndexValue = useSharedValue(initialPageRef.current);
  const { childScrollRef } = useSceneInfo(curIndexValue);

  useImperativeHandle(
    forwardedRef,
    () => ({
      scrollToTop: () => {
        runOnUI(() => {
          "worklet";
          Object.values(childScrollRef).forEach((ref) => {
            _ScrollTo(ref, 0, 0, false);
          });
        })();
      },
    }),
    [childScrollRef]
  );
  const renderTabBar = useCallback(
    (
      tabbarProps: SceneRendererProps & {
        navigationState: NavigationState<T>;
      }
    ) => {
      return props?.renderTabBar ? (
        props.renderTabBar(tabbarProps)
      ) : (
        <TabBar {...tabbarProps} />
      );
    },
    [props]
  );

  const renderTabView = (e: TabViewCustomRenders) => {
    const { Component, renderScene, ...restProps } = props;

    return (
      <Component
        {...restProps}
        renderTabBar={(
          tabbarProps: SceneRendererProps & {
            navigationState: NavigationState<T>;
          }
        ) => e.renderTabBarContainer(renderTabBar(tabbarProps))}
        renderScene={(props: any) =>
          e.renderSceneHeader(renderScene(props), props)
        }
      />
    );
  };

  return (
    //@ts-ignore
    <GestureContainer
      ref={gestureContainerRef}
      initialPage={initialPageRef.current}
      renderTabView={renderTabView}
      {...props}
    />
  );
}
