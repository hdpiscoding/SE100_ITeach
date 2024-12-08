"use client"
import { Button } from "@/components/ui/button"
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Input} from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    itemsPerPage?: number,
    callBy: "cart" | "analysis"
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             itemsPerPage,
                                             callBy
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pageSize, setPageSize] = React.useState(itemsPerPage || 10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            pagination: {
                pageSize,
                pageIndex
            },
            columnFilters,
        },
        onPaginationChange: (updater) => {
            const newState =
                typeof updater === "function"
                    ? updater({ pageIndex, pageSize }) // Cập nhật dựa trên hàm updater
                    : updater // Cập nhật trực tiếp nếu là object
            setPageIndex(newState.pageIndex) // Cập nhật chỉ số trang
            setPageSize(newState.pageSize) // Cập nhật số mục mỗi trang
        },
    })

    return (
        <div>
            <div>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Tìm kiếm theo tên..."
                        value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("lastName")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>

                <Table className="border">
                    <TableHeader className="bg-LightGray">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-semibold text-center align-middle">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-center align-middle">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            callBy === "cart"
                                ?
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Bạn chưa có sản phẩm nào trong giỏ hàng 😞
                                    </TableCell>
                                </TableRow>
                                :
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Không tìm thấy học viên... 😞
                                    </TableCell>
                                </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4 mr-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Trang trước
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Trang kế
                </Button>
            </div>
        </div>
    )
}
