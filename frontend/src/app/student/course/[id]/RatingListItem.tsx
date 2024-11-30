import React from 'react';
import Rating from "@mui/material/Rating";
import Image from "next/image";

export default function RatingListItem(props: any){
    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2">
                <div className="relative rounded-[50%] overflow-hidden h-[40px] w-[40px] flex items-center">
                    <Image
                        src={props.avatar}
                        alt="user avatar"
                        className="object-cover"
                        fill
                    />
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

                <div className="lg:max-w-[700px] max-w-[200px] lg:pl-8 pl-2">
                    <p>
                        {props.comment}
                    </p>
                </div>
            </div>

            <div className="border-b border-1.5"/>
        </div>
    );
};