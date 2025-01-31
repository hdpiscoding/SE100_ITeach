"use client"
import {ArrowUpDown} from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderItems = {
    id: string
    name: string
    price: number
    image?: string
}

export const dialogColumns: ColumnDef<OrderItems>[] = [
    {
        accessorKey: "name",
        header: "Sản phẩm",
        cell: ({ row }) => {
            const name = String(row.getValue("name"));
            const image = String(row.original.image || "");

            return (
                <div className="flex items-center gap-5">
                    <div className="relative rounded-sm overflow-hidden h-20 w-36">
                        <Image src={image}
                               alt="product_image rounded-lg"
                               className="object-cover"
                               fill/>
                    </div>



                    <span className="font-semibold">
                        {name}
                    </span>
                </div>)
        },
    },
    {
        accessorKey: "price",
        header: ({column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="font-semibold">
                        Giá tiền
                    </span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(price)

            return (
                <div>
                    <span className="font-semibold">
                        {formatted}
                    </span>
                </div>)
        },
    },
]
