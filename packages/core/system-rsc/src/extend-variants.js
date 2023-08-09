import * as React from "react";
import {tv} from "@get-ui/theme";

import {cn, mapPropsVariants} from "./utils";

function getSlots(variants) {
  return variants
    ? Object.values(variants)
        .flatMap(Object.values)
        .reduce((acc, slot) => {
          if (typeof slot === "object" && slot !== null && !(slot instanceof String)) {
            Object.keys(slot).forEach((key) => {
              if (!acc.hasOwnProperty(key)) {
                acc[key] = "";
              }
            });
          }

          return acc;
        }, {})
    : {};
}

export function extendVariants(BaseComponent, styles = {}, opts = {}) {
  const {variants, defaultVariants, compoundVariants} = styles || {};

  const slots = getSlots(variants);
  const hasSlots = typeof slots === "object" && Object.keys(slots).length !== 0;

  const customTv = tv(
    {
      variants,
      defaultVariants,
      compoundVariants,
      ...(hasSlots && {slots}),
    },
    {
      twMerge: opts.twMerge ?? true,
      twMergeConfig: opts.twMergeConfig ?? {},
    },
  );

  const ForwardedComponent = React.forwardRef((originalProps, ref) => {
    const [baseProps, variantProps] = mapPropsVariants(originalProps, customTv.variantKeys, false);

    const newProps = {...baseProps, ...defaultVariants, ref};

    let classNames = {};

    const result = React.useMemo(() => customTv(variantProps), [...Object.values(variantProps)]);

    // if no slots, the result is a string
    if (!hasSlots) {
      newProps.className = cn(result, originalProps.className);
    }
    // if has slots, the result is an object with keys as slots functions
    else {
      Object.entries(result).forEach(([key, value]) => {
        const slotResult = value();

        if (typeof slotResult === "string") {
          classNames[key] = slotResult;
        }
      });

      Object.entries(originalProps.classNames ?? {}).forEach(([key, value]) => {
        classNames[key] = cn(classNames[key], value);
      });
    }

    if (Object.keys(classNames).length !== 0) {
      newProps.classNames = classNames;
    }

    return React.createElement(BaseComponent, newProps);
  });

  // To make dev tools show a proper name
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;

  return ForwardedComponent;
}
