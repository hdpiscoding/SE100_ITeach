'use client';
import React, {useEffect, useState} from "react";
import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/components/Account/columns";
import {getOrders} from "@/services/student";

interface Order {
    id: string;
    date: string;
    total: number;
    quantity?: number;
}

export default function OrderHistory() {
    const [orders, setOrders] = useState<Array<Order>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrders(7);
            if (data.errCode === 0) { 
                const orders = data.data.map((order: any) => {
                    return {
                        id: order.id,
                        date: new Date(order.createdAt).toLocaleDateString('en-GB') ,
                        total: order.totalCost,
                        quantity: order.orderItemsCount
                    };
                });
                setOrders(orders);
            }
            else {
                setOrders([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="rounded-md bg-white flex flex-col mx-4">
              <span className="font-bold text-2xl px-6 py-3">
                  Lịch sử mua hàng
              </span>

            <div className="border-t"/>

            <div>
                <DataTable columns={columns} data={orders} itemsPerPage={10} callBy="cart"/>
            </div>
        </div>
    );
}