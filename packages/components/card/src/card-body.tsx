import {forwardRef, HTMLNextUIProps} from "@get-ui/system";
import {useDOMRef} from "@get-ui/react-utils";
import {clsx} from "@get-ui/shared-utils";

import {useCardContext} from "./card-context";

const CardBody = forwardRef<"div", HTMLNextUIProps<"div">>((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useCardContext();

  const bodyStyles = clsx(classNames?.body, className);

  return (
    <Component ref={domRef} className={slots.body?.({class: bodyStyles})} {...otherProps}>
      {children}
    </Component>
  );
});

CardBody.displayName = "NextUI.CardBody";

export default CardBody;
