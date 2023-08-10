import type {ColumnDef} from "@tanstack/react-table";

import React from "react";
import {Meta} from "@storybook/react";
import {table as tableTheme} from "@get-ui/theme";
import {useReactTable, getCoreRowModel} from "@tanstack/react-table";

import {Table, TableProps} from "../src";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    layout: {
      control: {
        type: "select",
      },
      options: ["auto", "fixed"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    shadow: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg"],
    },
    selectionMode: {
      control: {
        type: "select",
      },
      options: ["none", "single", "multiple"],
    },
    isStriped: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Table>;

const defaultProps = {
  ...tableTheme.defaultVariants,
  className: "max-w-lg",
};

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
];

const StaticTemplate = (args: TableProps) => {
  const table = useReactTable({
    data: rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <Table table={table} {...args} />;
};

export const Static = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
  },
};
