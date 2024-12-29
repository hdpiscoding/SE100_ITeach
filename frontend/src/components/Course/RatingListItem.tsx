import React from 'react';
import Rating from "@mui/material/Rating";
import Image from "next/image";
import {FaUser} from "react-icons/fa";

export default function RatingListItem(props: any){
    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_3%_57%] gap-2">
                <div className="lg:col-start-1  flex items-center gap-2">
                    <div
                        className={`bg-DarkGray ${props.avatar ? "" : "p-[10px]"} rounded-[50%] h-fit w-fit`}>
                        {props.avatar ?
                            <div
                                className="relative rounded-[50%] overflow-hidden h-[40px] w-[40px] flex items-center">
                                <Image
                                    src={props.avatar}
                                    alt="user avatar"
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            :
                            <FaUser className="text-xl text-LightGray"/>}
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="font-semibold">
                            {props.name}
                        </span>

                        <Rating
                            value={props.rating}
                            readOnly
                        />
                    </div>
                </div>


                <div className="lg:max-w-[700px] lg:col-start-3 lg:pl-8 pl-2">
                    <p className="whitespace-pre-line">
                        {props.comment}
                    </p>
                </div>
            </div>

            <div className="border-b border-1.5"/>
        </div>
    );
};