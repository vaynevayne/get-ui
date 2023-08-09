import React from "react";
import {Meta} from "@storybook/react";
import {table} from "@get-ui/theme";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";

import {Table} from "../src";

export default {
  title: "Components/Table2",
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
  ...table.defaultVariants,
  className: "max-w-lg",
};

const ReactTableTemplate = (args) => {
  const table = useReactTable({
    data: [],
    columns: [],
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("table", table);

  return <span>reactTable</span>;
};

export const ReactTable = {
  render: ReactTableTemplate,
  args: {
    ...defaultProps,
  },
};
