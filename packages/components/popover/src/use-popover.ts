import type {PopoverVariantProps, SlotsToClasses, PopoverSlots} from "@get-ui/theme";
import type {HTMLMotionProps} from "framer-motion";
import type {RefObject, Ref} from "react";

import {OverlayTriggerState, useOverlayTriggerState} from "@react-stately/overlays";
import {useFocusRing} from "@react-aria/focus";
import {useOverlayTrigger, ariaHideOutside} from "@react-aria/overlays";
import {OverlayTriggerProps} from "@react-types/overlays";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@get-ui/system";
import {getArrowPlacement, getShouldUseAxisPlacement} from "@get-ui/aria-utils";
import {popover} from "@get-ui/theme";
import {mergeProps, mergeRefs, useLayoutEffect} from "@react-aria/utils";
import {createDOMRef} from "@get-ui/react-utils";
import {clsx, dataAttr} from "@get-ui/shared-utils";
import {ReactRef} from "@get-ui/react-utils";
import {useId, useMemo, useCallback, useImperativeHandle, useRef} from "react";

import {useReactAriaPopover, ReactAriaPopoverProps} from "./use-aria-popover";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the popover.
   */
  state?: OverlayTriggerState;
  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  triggerRef?: RefObject<HTMLElement>;
  /**
   * Whether the scroll event should be blocked when the overlay is open.
   * @default true
   */
  shouldBlockScroll?: boolean;
  /**
   * Type of overlay that is opened by the trigger.
   */
  triggerType?: "dialog" | "menu" | "listbox" | "tree" | "grid";
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"div">;
  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Popover classNames={{
   *    base:"base-classes",
   *    trigger: "trigger-classes",
   *    backdrop: "backdrop-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PopoverSlots>;
  /**
   *  Callback fired when the popover is closed.
   */
  onClose?: () => void;
}

export type UsePopoverProps = Props &
  Omit<ReactAriaPopoverProps, "triggerRef" | "popoverRef"> &
  OverlayTriggerProps &
  PopoverVariantProps;

export function usePopover(originalProps: UsePopoverProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, popover.variantKeys);

  const {
    ref,
    as,
    children,
    state: stateProp,
    triggerRef: triggerRefProp,
    scrollRef,
    isOpen,
    defaultOpen,
    onOpenChange,
    shouldFlip = true,
    containerPadding = 12,
    shouldBlockScroll = false,
    portalContainer,
    placement: placementProp = "top",
    triggerType = "dialog",
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    isKeyboardDismissDisabled,
    motionProps,
    className,
    classNames,
    onClose,
    ...otherProps
  } = props;

  const Component = as || "div";
  const popoverId = useId();

  const popoverRef = useRef<HTMLDivElement>(null);
  const domTriggerRef = useRef<HTMLElement>(null);

  const triggerRef = triggerRefProp || domTriggerRef;

  const disableAnimation = originalProps.disableAnimation ?? false;

  // Sync ref with popoverRef from passed ref.
  useImperativeHandle(ref, () =>
    // @ts-ignore
    createDOMRef(popoverRef),
  );

  const innerState = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const state = stateProp || innerState;

  const {
    popoverProps,
    underlayProps,
    arrowProps,
    placement: ariaPlacement,
  } = useReactAriaPopover(
    {
      triggerRef,
      popoverRef,
      placement: placementProp,
      offset: offset,
      scrollRef,
      crossOffset,
      shouldFlip,
      containerPadding,
      isKeyboardDismissDisabled,
    },
    state,
  );

  const {triggerProps} = useOverlayTrigger({type: triggerType}, state, triggerRef);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing();

  const slots = useMemo(
    () =>
      popover({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getPopoverProps: PropGetter = (props = {}) => ({
    ref: popoverRef,
    ...mergeProps(popoverProps, otherProps, props),
    id: popoverId,
  });

  const getDialogProps: PropGetter = (props = {}) => ({
    "data-open": dataAttr(state.isOpen),
    "data-focus": dataAttr(isFocused),
    "data-focus-visible": dataAttr(isFocusVisible),
    "data-placement": getArrowPlacement(ariaPlacement, placementProp),
    ...mergeProps(focusProps, props),
    className: slots.base({class: clsx(baseStyles, props.className)}),
    style: {
      // this prevent the dialog to have a default outline
      outline: "none",
    },
  });

  const placement = useMemo(
    () => (getShouldUseAxisPlacement(ariaPlacement, placementProp) ? ariaPlacement : placementProp),
    [ariaPlacement, placementProp],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => {
      return {
        ...mergeProps(triggerProps, props),
        className: slots.trigger({class: clsx(classNames?.trigger, props.className)}),
        ref: mergeRefs(_ref, triggerRef),
        "aria-controls": popoverId,
        "aria-haspopup": "dialog",
      };
    },
    [isOpen, popoverId, state, triggerProps, triggerRef],
  );

  const getBackdropProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.backdrop({class: classNames?.backdrop}),
      onClick: () => state.close(),
      ...underlayProps,
      ...props,
    }),
    [slots, classNames, underlayProps],
  );

  const getArrowProps = useCallback<PropGetter>(
    () => ({
      className: slots.arrow({class: classNames?.arrow}),
      "data-placement": getArrowPlacement(ariaPlacement, placementProp),
      ...arrowProps,
    }),
    [arrowProps, ariaPlacement, placementProp, slots, classNames],
  );

  useLayoutEffect(() => {
    if (state.isOpen && popoverRef.current) {
      return ariaHideOutside([popoverRef.current]);
    }
  }, [state.isOpen, popoverRef]);

  return {
    Component,
    children,
    classNames,
    showArrow,
    triggerRef,
    placement,
    portalContainer,
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    shouldBlockScroll,
    backdrop: originalProps.backdrop ?? "transparent",
    motionProps,
    focusProps,
    getBackdropProps,
    getPopoverProps,
    getTriggerProps,
    getArrowProps,
    getDialogProps,
  };
}

export type UsePopoverReturn = ReturnType<typeof usePopover>;
