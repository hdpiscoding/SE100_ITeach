import React from "react";
import {PlayCircle, PauseCircle} from "lucide-react"

export default function LessonListItem(props: any) {
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
        <div className="flex flex-col gap-1">
            <span className={`font-semibold hover:text-orange cursor-pointer ${props.type === "course" ? "" : "text-sm"}`}>
                Bài {props.index}: {props.name}
            </span>

            <div className={`flex items-center ${props.type === "course" ? "gap-2" : "gap-1"}`}>
                <PlayCircle className={`${props.type === "course" ? "h-3.5 w-3.5" : "h-3 w-3"} text-Lime`}/>

                <span className={`text-Lime ${props.type === "course" ? "text-sm" : "text-[0.8rem]"}`}>
                    {convertMinutes(props.duration)}
                </span>
            </div>
        </div>
    )
};