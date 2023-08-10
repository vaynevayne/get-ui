import {ReactRef} from "@get-ui/react-utils";
import {HTMLNextUIProps, mapPropsVariants} from "@get-ui/system";
import {SlotsToClasses, TableSlots, TableVariantProps, table as tableTheme} from "@get-ui/theme";
import {Table} from "@tanstack/react-table";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"table"> {
  ref?: ReactRef<HTMLElement | null>;
  classNames?: SlotsToClasses<TableSlots>;
  table: Table<unknown>;
}

export type UseTableProps = Props & TableVariantProps;

export function useTable(originalProps: UseTableProps) {
  // {非tw:'',tw相关Prop} => [{非tw},{tw相关Prop}]
  const [props, variantProps] = mapPropsVariants(originalProps, tableTheme.variantKeys);

  const {ref, classNames, table} = props;

  // 从 /theme 中获取 样式相关 prop 默认值,以及合并 props.slots
  const slots = useMemo(
    () =>
      tableTheme({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  return {
    ref,
    slots,
    classNames,
    table,
  };
}
