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
import {dialogColumns} from "@/app/student/account/DialogColumns";

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
        cell: ({ row }) => {
            const order = row.original
            const orderItems = [
                {
                    id: "1",
                    name: "Java cơ bản",
                    price: 100000,
                    image: "https://cdn.codegym.vn/wp-content/uploads/2022/01/khoa-hoc-lap-trinh-java-online-9.jpg"
                },
                {
                    id: "2",
                    name: "Nhập môn lập trình web",
                    price: 200000,
                    image: "https://hoclaptrinhonline.asia/pluginfile.php/2137/course/overviewfiles/la%CC%A3%CC%82p-tri%CC%80nh-web-min.png",
                },
                {
                    id: "3",
                    name: "JavaScript cơ bản",
                    price: 300000,
                    image: "https://f.howkteam.vn/Upload/cke/images/1_LOGO%20SHOW%20WEB/7_JavaScript/Javascript%20c%C6%A1%20ba%CC%89n/00_%20Javascript%20basic_Kteam.png",
                },
            ]

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

                        <DataTable columns={dialogColumns} data={orderItems} itemsPerPage={3}/>

                    </DialogContent>
                </Dialog>
            )
        },
    },
]
