import {useMemo} from "react";
import {forwardRef} from "@get-ui/system";
import {OverlayContainer} from "@react-aria/overlays";
import {AnimatePresence, motion} from "framer-motion";
import {TRANSITION_VARIANTS} from "@get-ui/framer-transitions";
import {warn} from "@get-ui/shared-utils";
import {Children, cloneElement} from "react";
import {getTransformOrigins} from "@get-ui/aria-utils";

import {UseTooltipProps, useTooltip} from "./use-tooltip";

export interface TooltipProps extends Omit<UseTooltipProps, "disableTriggerFocus" | "backdrop"> {}

const Tooltip = forwardRef<"div", TooltipProps>((props, ref) => {
  const {
    Component,
    children,
    content,
    isOpen,
    portalContainer,
    placement,
    disableAnimation,
    motionProps,
    showArrow,
    getTriggerProps,
    getTooltipProps,
    getArrowProps,
  } = useTooltip({
    ...props,
    ref,
  });

  let trigger: React.ReactElement;

  try {
    /**
     * Ensure tooltip has only one child node
     */
    const child = Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };

    trigger = cloneElement(child, getTriggerProps(child.props, child.ref));
  } catch (error) {
    trigger = <span />;
    warn("Tooltip must have only one child node. Please, check your code.");
  }

  const arrowContent = useMemo(() => {
    if (!showArrow) return null;

    return <span {...getArrowProps()} />;
  }, [showArrow, getArrowProps]);

  const animatedContent = useMemo(() => {
    const {className, ...otherTooltipProps} = getTooltipProps();

    return (
      <div {...otherTooltipProps}>
        <motion.div
          animate="enter"
          exit="exit"
          initial="exit"
          style={{
            ...getTransformOrigins(placement),
          }}
          variants={TRANSITION_VARIANTS.scaleSpring}
          {...motionProps}
        >
          <Component className={className}>
            {content}
            {arrowContent}
          </Component>
        </motion.div>
      </div>
    );
  }, [getTooltipProps, placement, motionProps, Component, content, arrowContent]);

  return (
    <>
      {trigger}
      {disableAnimation && isOpen ? (
        <OverlayContainer portalContainer={portalContainer}>
          <Component {...getTooltipProps()}>
            {content}
            {arrowContent}
          </Component>
        </OverlayContainer>
      ) : (
        <AnimatePresence>
          {isOpen ? (
            <OverlayContainer portalContainer={portalContainer}>{animatedContent}</OverlayContainer>
          ) : null}
        </AnimatePresence>
      )}
    </>
  );
});

Tooltip.displayName = "NextUI.Tooltip";

export default Tooltip;
