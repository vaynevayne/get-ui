import {forwardRef, HTMLNextUIProps} from "@get-ui/system";
import {useDOMRef} from "@get-ui/react-utils";
import {clsx} from "@get-ui/shared-utils";

import {useNavbarContext} from "./navbar-context";

export interface NavbarBrandProps extends HTMLNextUIProps<"div"> {
  children?: React.ReactNode | React.ReactNode[];
}

const NavbarBrand = forwardRef<"div", NavbarBrandProps>((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useNavbarContext();

  const styles = clsx(classNames?.brand, className);

  return (
    <Component ref={domRef} className={slots.brand?.({class: styles})} {...otherProps}>
      {children}
    </Component>
  );
});

NavbarBrand.displayName = "NextUI.NavbarBrand";

export default NavbarBrand;
