import type {CodeVariantProps} from "@get-ui/theme";
import type {HTMLNextUIProps, PropGetter} from "@get-ui/system-rsc";

import {code} from "@get-ui/theme";
import {mapPropsVariants} from "@get-ui/system-rsc";
import {ReactRef} from "@get-ui/react-utils";
import {useMemo} from "react";

export interface UseCodeProps extends HTMLNextUIProps<"code">, CodeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useCode(originalProps: UseCodeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);

  const {as, children, className, ...otherProps} = props;

  const Component = as || "code";

  const classNames = useMemo(
    () =>
      code({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const getCodeProps: PropGetter = () => {
    return {
      className: classNames,
      ...otherProps,
    };
  };

  return {Component, children, getCodeProps};
}

export type UseCodeReturn = ReturnType<typeof useCode>;
