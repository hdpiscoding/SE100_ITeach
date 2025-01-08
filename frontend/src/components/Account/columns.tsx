/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars */
"use client"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DataTable} from "@/components/ui/data-table";
import { dialogColumns } from "@/components/Account/DialogColumns";
import {getOrderItems} from "@/services/student";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
    id: string
    date: string
    total: number
    quantity?: number
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Mã đơn hàng",
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="font-semibold">
                        Ngày đặt
                    </span>
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        sortingFn: (rowA, rowB) => {
            const dateA = new Date(rowA.getValue("date")).getTime()
            const dateB = new Date(rowB.getValue("date")).getTime()
            return dateA - dateB;
        }
    },
    {
        accessorKey: "total",
        header: ({column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="font-semibold">
                        Tổng tiền
                    </span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const total = parseFloat(row.getValue("total"))
            const quantity = row.original.quantity || 1
            const formatted = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(total)

            return (
                <div>
                    <span className="font-semibold">
                        {formatted}
                    </span>

                    <span>
                        &nbsp; ({quantity} sản phẩm)
                    </span>
                </div>)
        },
    },
    {
        id: "actions",
        cell: async ({ row }) => {
            const order = row.original
            const data = await getOrderItems(row.getValue("id"))
             const orderItems: any[] = []
            if (Array.isArray(data.data)) {
                data.data.map((item: any) => {
                    orderItems.push({
                        id: item.id,
                        name: item.course.courseName,
                        price: item.course.cost,
                        image: item.course.anhBia,
                    });
                });
            } else {
                console.error("Expected data to be an array, but got:", data);
            }

            // const orderItems = [
            //     {
            //         id: "1",
            //         name: "Java cơ bản",
            //         price: 100000,
            //         image: "https://cdn.codegym.vn/wp-content/uploads/2022/01/khoa-hoc-lap-trinh-java-online-9.jpg"
            //     },
                
            // ]
             

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="cursor-pointer">
                            <span className="font-semibold text-DarkGreen hover:text-DarkGreen_Hover">
                                Xem chi tiết
                            </span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] max-h-[520px] h-[520px] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                        </DialogHeader>

                        <DataTable columns={dialogColumns} data={orderItems} itemsPerPage={3} callBy="cart"/>

                    </DialogContent>
                </Dialog>
            )
        },
    },
]
