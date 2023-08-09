import React, {Children, cloneElement, useMemo} from "react";
import {forwardRef} from "@get-ui/system";
import {pickChildren} from "@get-ui/react-utils";
import {useAriaButton} from "@get-ui/use-aria-button";
import {Button} from "@get-ui/button";
import {mergeProps} from "@react-aria/utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverTriggerProps {
  children?: React.ReactNode;
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const PopoverTrigger = forwardRef<"button", PopoverTriggerProps>((props, _) => {
  const {triggerRef, getTriggerProps} = usePopoverContext();

  const {children, ...otherProps} = props;

  // force a single child
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;

    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  const {onPress, ...rest} = useMemo(() => {
    return getTriggerProps(mergeProps(child.props, otherProps), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);

  // validates if contains a NextUI Button as a child
  const [, triggerChildren] = pickChildren(children, Button);

  const {buttonProps} = useAriaButton({onPress}, triggerRef);

  const hasNextUIButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  return cloneElement(child, mergeProps(rest, hasNextUIButton ? {onPress} : buttonProps));
});

PopoverTrigger.displayName = "NextUI.PopoverTrigger";

export default PopoverTrigger;
