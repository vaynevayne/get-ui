import type {DividerVariantProps} from "@get-ui/theme";
import type {HTMLNextUIProps, PropGetter} from "@get-ui/system-rsc";

import {divider} from "@get-ui/theme";
import {Ref, useCallback, useMemo} from "react";

import {SeparatorProps as AriaSeparatorProps, useSeparator} from "./use-separator";

interface Props extends HTMLNextUIProps<"hr"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement> | undefined;
}

export type UseDividerProps = Props & DividerVariantProps & Omit<AriaSeparatorProps, "elementType">;

export function useDivider(props: UseDividerProps) {
  const {as, className, orientation, ...otherProps} = props;

  let Component = as || "hr";

  if (Component === "hr" && orientation === "vertical") {
    Component = "div";
  }

  const {separatorProps} = useSeparator({
    elementType: typeof Component === "string" ? Component : "hr",
    orientation,
  });

  const styles = useMemo(
    () =>
      divider({
        orientation,
        className,
      }),
    [orientation, className],
  );

  const getDividerProps: PropGetter = useCallback(
    (props = {}) => ({
      className: styles,
      role: "separator",
      "data-orientation": orientation,
      ...separatorProps,
      ...otherProps,
      ...props,
    }),
    [styles, orientation, separatorProps, otherProps],
  );

  return {Component, getDividerProps};
}

export type UseDividerReturn = ReturnType<typeof useDivider>;
