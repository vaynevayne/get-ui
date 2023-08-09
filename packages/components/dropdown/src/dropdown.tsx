import React, {ReactNode} from "react";
import {Popover} from "@get-ui/popover";

import {DropdownProvider} from "./dropdown-context";
import {UseDropdownProps, useDropdown} from "./use-dropdown";

export interface DropdownProps extends UseDropdownProps {
  /**
   * The content of the dropdown. It is usually the `Dropdown.Trigger`,
   * and `Dropdown.Menu`
   */
  children: ReactNode[];
}

const Dropdown = (props: DropdownProps) => {
  const {children, ...otherProps} = props;

  const context = useDropdown(otherProps);

  const [menuTrigger, menu] = React.Children.toArray(children);

  return (
    <DropdownProvider value={context}>
      <Popover {...context.getPopoverProps()}>
        {menuTrigger}
        {menu}
      </Popover>
    </DropdownProvider>
  );
};

Dropdown.displayName = "NextUI.Dropdown";

export default Dropdown;
