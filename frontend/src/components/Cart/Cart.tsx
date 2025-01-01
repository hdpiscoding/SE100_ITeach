'use client';
import React, {useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/components/Cart/columns";
import { Button } from "@/components/ui/button";
import {getCartItems} from "@/services/student";
import { toast } from "react-toastify";
import {deleteAllCartItems, postPayment} from "@/services/student";
interface OrderItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    courseId?: number;
}

export default function Cart() {
    const [orderItems, setOrderItems] = React.useState<Array<OrderItem>>([]);
    const [total, setTotal] = React.useState<number>(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const id= user.id;
            const cartItems = await getCartItems(id);
            console.log(cartItems);
            const tempOrderItems: Array<OrderItem> = [];
            if (cartItems.data) {
                cartItems.data.forEach((item: any) => {
                    tempOrderItems.push({
                        id: item.id,
                        name: item.Course.courseName,
                        price: item.Course.cost,
                        image: item.Course.anhBia,  
                        courseId: item.courseId
                    });
                });
                setOrderItems(tempOrderItems);
            }
            setOrderItems(
               tempOrderItems
            //[
            //     {
            //         id: "1",
            //         name: "Java cơ bản",
            //         price: 100000,
            //         image: "https://cdn.codegym.vn/wp-content/uploads/2022/01/khoa-hoc-lap-trinh-java-online-9.jpg"
            //     },
            //     {
            //         id: "2",
            //         name: "Nhập môn lập trình web",
            //         price: 200000,
            //         image: "https://hoclaptrinhonline.asia/pluginfile.php/2137/course/overviewfiles/la%CC%A3%CC%82p-tri%CC%80nh-web-min.png",
            //     },
            //     {
            //         id: "3",
            //         name: "JavaScript cơ bản",
            //         price: 300000,
            //         image: "https://f.howkteam.vn/Upload/cke/images/1_LOGO%20SHOW%20WEB/7_JavaScript/Javascript%20c%C6%A1%20ba%CC%89n/00_%20Javascript%20basic_Kteam.png",
            //     },
            // ]
            );
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        setTotal(orderItems.reduce((acc, item) => acc + item.price, 0));
    }, [orderItems]);

    const handleClick = async () => {
        
        const data = {
            userId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}").id : 0,
            totalCost: total,
            cartItems:orderItems
        }
        await postPayment(data);
        window.location.href = "/";
        await deleteAllCartItems(data.userId);       
        toast.success("Thanh toán thành công");


    };
    return (
        <div>
            <div className='h-[120px] bg-bg grid grid-cols-[0.5fr_11fr_0.5fr]'>
                <div className="col-start-2 pl-6 flex items-center gap-2">
                    <Link href="">
                        <Image className='inline-block' src='/assets/images/home.png' alt='banner' width={20}
                               height={20}/>
                    </Link>

                    <Image className='inline-block' src='/assets/images/arrow_right.png' alt='banner' width={5}
                           height={5}/>
                    <span className='text-orange font-bold'>Giỏ hàng</span>
                </div>
            </div>

            <div className="grid grid-cols-[0.5fr_11fr_0.5fr] my-8 gap-8">
                <div className="col-start-2 flex flex-col items-center justify-center">
                    <span className="text-3xl font-semibold">
                        Giỏ hàng của tôi
                    </span>
                </div>

                <div className="grid grid-cols-[70%_2%_28%] col-start-2">
                    <div className="col-start-1">
                        <DataTable columns={columns} data={orderItems} itemsPerPage={10} callBy="cart"/>
                    </div>

                    <div className="col-start-3 border rounded-sm flex flex-col p-4 h-fit">
                        <span className="font-semibold text-xl">
                            Trị giá giỏ hàng
                        </span>

                        <div className="border-t border-[1.5px] rounded mt-1 border-DarkGray"/>

                        <div className="flex items-center justify-between mt-6">
                            <span className="font-semibold">
                                Tổng:
                            </span>

                            <span className="font-bold">
                                {new Intl.NumberFormat("vi-VN",
                                    {
                                        style: "currency",
                                        currency: "VND",
                                    })
                                    .format(total)
                                }
                            </span>
                        </div>

                        <Button onClick={handleClick} className="rounded-3xl bg-DarkGreen hover:bg-DarkGreen_Hover mt-10">
                            <span className="font-semibold">
                                Thanh toán
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}