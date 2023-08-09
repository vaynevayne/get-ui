import {forwardRef} from "@get-ui/system-rsc";

import {UseSpinnerProps, useSpinner} from "./use-spinner";

export interface SpinnerProps extends UseSpinnerProps {}

const Spinner = forwardRef<"div", SpinnerProps>((props, ref) => {
  const {slots, classNames, label, getSpinnerProps} = useSpinner({...props});

  return (
    <div ref={ref} {...getSpinnerProps()}>
      <div className={slots.wrapper({class: classNames?.wrapper})}>
        <i className={slots.circle1({class: classNames?.circle1})} />
        <i className={slots.circle2({class: classNames?.circle2})} />
      </div>
      {label && <span className={slots.label()}>{label}</span>}
    </div>
  );
});

Spinner.displayName = "NextUI.Spinner";

export default Spinner;
