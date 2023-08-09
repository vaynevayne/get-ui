import {forwardRef, HTMLNextUIProps} from "@get-ui/system";
import {useDOMRef} from "@get-ui/react-utils";
import {clsx, dataAttr} from "@get-ui/shared-utils";

import {useNavbarContext} from "./navbar-context";

export interface NavbarMenuItemProps extends HTMLNextUIProps<"li"> {
  children?: React.ReactNode;
}

const NavbarMenuItem = forwardRef<"li", NavbarMenuItemProps>((props, ref) => {
  const {className, children, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const {slots, isMenuOpen, classNames} = useNavbarContext();

  const styles = clsx(classNames?.menuItem, className);

  return (
    <li
      ref={domRef}
      className={slots.menuItem?.({class: styles})}
      data-open={dataAttr(isMenuOpen)}
      {...otherProps}
    >
      {children}
    </li>
  );
});

NavbarMenuItem.displayName = "NextUI.NavbarMenuItem";

export default NavbarMenuItem;
