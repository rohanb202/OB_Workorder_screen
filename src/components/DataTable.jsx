import { useState, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from "@tanstack/react-table";
import MainData from "../assets/MainData";

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
const Add = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};
const Subtract = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
};
const columns = [
  {
    accessorKey: "name",
    header: ({ table }) => (
      <div className="flex items-center space-x-2">
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />{" "}
        <button
          {...{
            onClick: table.getToggleAllRowsExpandedHandler(),
          }}
        >
          {/* {table.getIsAllRowsExpanded() ? "👇" : "👉"} */}
        </button>
        Packages
      </div>
    ),
    cell: ({ row, getValue }) => (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <div className="flex space-x-2 item-center">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
          <div>{getValue()}</div>
          {row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? (
                <Subtract className="w-4 transition duration-100 rounded-md hover:bg-black/20" />
              ) : (
                <Add className="w-4 transition duration-100 rounded-md hover:bg-black/20" />
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "rate_per_sqft",
    header: () => "Rate",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "total_expenditure",
    header: () => "Total",
    footer: (props) => props.column.id,
  },
];
function flattenArray(arr, attributeName) {
  let flattenedArray = [];

  arr.forEach((item) => {
    // Push the original attribute from the current item

    flattenedArray.push({
      name: item[attributeName]["name"],
      rate: item[attributeName]["rate_per_sqft"],
      total: item[attributeName]["total_expenditure"],
    });

    // If the current item has sub-rows, recursively flatten them
    if (item.subRows && Array.isArray(item.subRows)) {
      flattenedArray = flattenedArray.concat(
        flattenArray(item.subRows, attributeName)
      );
    }
  });

  return flattenedArray;
}
function DataTable({ setPackages }) {
  const [data] = useState(MainData);
  const [expanded, setExpanded] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.contents,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  //   console.log(table.getSelectedRowModel().rows);
  //   console.log(table.getGroupedSelectedRowModel().rows);
  useEffect(() => {
    // setPackages(table.get);
    // console.log(rowSelection);
    // setPackages(rowSelection);
    setPackages(flattenArray(table.getSelectedRowModel().rows, "original"));
  }, [rowSelection]);
  return (
    <div>
      <table className="min-w-full border-2 divide-y divide-black rounded-md">
        <thead className="bg-sky-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="px-6 py-3 text-sm font-medium uppercase md:text-base text-start"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-black">
          {table.getRowModel().rows.map((row) => (
            <tr className="hover:bg-gray-200" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="px-6 py-4 text-xs font-medium whitespace-nowrap md:text-sm"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
