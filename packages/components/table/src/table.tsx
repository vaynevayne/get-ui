import {clsx} from "@get-ui/shared-utils";
import {forwardRef} from "@get-ui/system";
import {flexRender} from "@tanstack/react-table";

import {TableBody, TableCell, TableHead, TableRow} from "./base";
import {UseTableProps, useTable} from "./use-table";

export interface TableProps extends UseTableProps {}

const Table = forwardRef<"table", TableProps>((props, ref) => {
  const {slots, classNames, table} = useTable(props);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="w-full overflow-auto">
          <table ref={ref} className={slots.table({class: clsx(classNames?.table)})}>
            <thead className={slots.thead({class: clsx(classNames?.thead)})}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className={slots.tr({class: clsx(classNames?.tr)})}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={slots.thead({class: clsx(classNames?.th)})}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </thead>
            <TableBody className={slots.tbody({class: clsx(classNames?.tbody)})}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={slots.tr({class: clsx(classNames?.tr)})}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={slots.td({class: clsx(classNames?.td)})}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center"
                    colSpan={table.getAllLeafColumns().length}
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </table>
        </div>
      </div>
    </div>
  );
});

Table.displayName = "GetUI.Table";
export default Table;
