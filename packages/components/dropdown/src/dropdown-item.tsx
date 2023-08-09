import {useMemo, ReactNode} from "react";
import {forwardRef} from "@get-ui/system";

import {UseDropdownItemProps, useDropdownItem} from "./use-dropdown-item";
import {DropdownSelectedIcon} from "./dropdown-selected-icon";

export interface DropdownItemProps<T extends object = object> extends UseDropdownItemProps<T> {}

/**
 * @internal
 */
const DropdownItem = forwardRef<"li", DropdownItemProps>((props, _) => {
  const {
    Component,
    slots,
    classNames,
    rendered,
    shortcut,
    description,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    startContent,
    endContent,
    disableAnimation,
    getItemProps,
    getLabelProps,
    getDescriptionProps,
    getKeyboardShortcutProps,
    getSelectedIconProps,
  } = useDropdownItem(props);

  const selectedContent = useMemo<ReactNode | null>(() => {
    const defaultIcon = (
      <DropdownSelectedIcon disableAnimation={disableAnimation} isSelected={isSelected} />
    );

    if (typeof selectedIcon === "function") {
      return selectedIcon({icon: defaultIcon, isSelected, isDisabled});
    }

    if (selectedIcon) return selectedIcon;

    return defaultIcon;
  }, [selectedIcon, isSelected, isDisabled, disableAnimation]);

  return (
    <Component {...getItemProps()}>
      {startContent}
      {description ? (
        <div className={slots.wrapper({class: classNames?.wrapper})}>
          <span {...getLabelProps()}>{rendered}</span>
          <span {...getDescriptionProps()}>{description}</span>
        </div>
      ) : (
        <span {...getLabelProps()}>{rendered}</span>
      )}
      {shortcut && <kbd {...getKeyboardShortcutProps()}>{shortcut}</kbd>}
      {isSelectable && <span {...getSelectedIconProps()}>{selectedContent}</span>}
      {endContent}
    </Component>
  );
});

DropdownItem.displayName = "NextUI.DropdownItem";

export default DropdownItem;
