import {HTMLNextUIProps} from "@get-ui/system";
import {Row} from "@react-stately/table";
import {RowProps} from "@react-types/table";

export type TableRowProps = RowProps & Omit<HTMLNextUIProps<"tr">, keyof RowProps>;

const TableRow = Row as (props: TableRowProps) => JSX.Element;

export default TableRow;
