import React from "react";
import { Clock } from "lucide-react"


export default function ChapterListItem(props: any) {
    const convertMinutes = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours === 0) {
            return `${remainingMinutes}m`;
        }
        else if (remainingMinutes === 0) {
            return `${hours}h`;
        }
        return `${hours}h ${remainingMinutes}m`;
    }

    return (
        <div className="flex flex-col">
            <span className={`font-semibold ${props.type === "course" ? "text-lg" : ""}} text-left`}>
                Chương {props.index}: {props.name}
            </span>

            <div className="flex items-center gap-4">
                <span className={`${props.type === "course" ? "text-sm" : "text-[0.8rem]"} text-DarkGray`}>
                    {props.videos} videos
                </span>

                <div className="flex items-center gap-1">
                    <Clock className={`${props.type === "course" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"} text-orange`}/>

                    <span className={`text-orange ${props.type === "course" ? "text-sm" : "text-[0.8rem]"} font-semibold`}>
                        {convertMinutes(props.duration)}
                    </span>
                </div>
            </div>
        </div>
    )
};