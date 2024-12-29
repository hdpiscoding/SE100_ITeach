"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";

const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map((part) => parseInt(part, 10));
    return new Date(year, month - 1, day); // Month trong Date bắt đầu từ 0
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface Student {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    birthday: string //dd/MM/yyyy
    progress: number
}

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "User.firstName",
        header: ({column }) => {
            return (
                <div className="hidden sm:table-cell min-w-[150px]">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    <span className="font-semibold">
                        Họ
                    </span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <span className="hidden sm:table-cell min-w-[150px]">{row.getValue("firstName")}</span>
    },
    {
        accessorKey: "lastName",
        header: ({column }) => {
            return (
                <div className="hidden sm:table-cell min-w-[150px]">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    <span className="font-semibold">
                        Tên
                    </span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <span className="hidden sm:table-cell min-w-[150px]">{row.getValue("lastName")}</span>
    },
    {
        accessorKey: "phoneNumber",
        header: () => <div className="hidden sm:table-cell min-w-[150px]">Số điện thoại</div>,
        cell: ({ row }) => <span className="hidden sm:table-cell min-w-[150px]">{row.getValue("phoneNumber")}</span>
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "birthday",
        header: ({column }) => {
            return (
                <div className="hidden sm:table-cell min-w-[150px]">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    <span className="font-semibold">
                        Ngày sinh
                    </span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        sortingFn: (rowA, rowB) => {
            const dateA = parseDate(rowA.getValue("birthday"));
            const dateB = parseDate(rowB.getValue("birthday"));
            return dateA.getTime() - dateB.getTime();
        },
        cell: ({ row }) => <span className="hidden sm:table-cell min-w-[150px]">{row.getValue("birthday")}</span>
    },
    {
        accessorKey: "progress",
        header: ({column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="font-semibold">
                        Tiến độ
                    </span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (rowA, rowB) => {
            const progressA = Number(rowA.getValue("progress"));
            const progressB = Number(rowB.getValue("progress"));
            return progressA - progressB;
        },
        cell: ({ row }) => {
            const progress = Number(row.getValue("progress"))


            return (
                <div className="flex items-center gap-2">
                    <Progress value={progress} indicatorColor={"bg-DarkGreen"} />

                    <span className="font-semibold">
                        {progress}%
                    </span>
                </div>);
        },
    },
]
