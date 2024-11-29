'use client';
import React, {useEffect, useState} from "react";
import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/app/student/account/columns";

interface Order {
    id: string;
    date: string;
    total: number;
    quantity?: number;
}

export default function OrderHistory() {
    const [orders, setOrders] = useState<Array<Order>>([]);

    useEffect(() => {
        setOrders([
            {
                id: "1",
                date: "2021-09-01",
                total: 100000,
                quantity: 1,
            },
            {
                id: "2",
                date: "2021-09-02",
                total: 200000,
                quantity: 5,
            },
            {
                id: "3",
                date: "2021-09-03",
                total: 300000,
                quantity: 12,
            },
            {
                id: "4",
                date: "2021-09-01",
                total: 100000,
                quantity: 11,
            },
            {
                id: "5",
                date: "2021-09-02",
                total: 200000,
                quantity: 8,
            },
            {
                id: "6",
                date: "2021-09-03",
                total: 300000,
                quantity: 2,
            },
            {
                id: "7",
                date: "2021-09-01",
                total: 100000,
                quantity: 1,
            },
            {
                id: "8",
                date: "2021-09-02",
                total: 200000,
                quantity: 2,
            },
            {
                id: "9",
                date: "2021-09-03",
                total: 300000,
                quantity: 4,
            },
            {
                id: "10",
                date: "2021-09-01",
                total: 100000,
                quantity: 5,
            },
            {
                id: "11",
                date: "2021-09-02",
                total: 200000,
                quantity: 7,
            },
            {
                id: "12",
                date: "2021-09-03",
                total: 300000,
                quantity: 4,
            },
        ])
    }, []);

    return (
        <div className="border rounded-md bg-white flex flex-col mx-4">
              <span className="font-bold text-2xl px-6 py-3">
                  Lịch sử mua hàng
              </span>

            <div className="border-t"/>

            <div>
                <DataTable columns={columns} data={orders} itemsPerPage={10}/>
            </div>
        </div>
    );
}