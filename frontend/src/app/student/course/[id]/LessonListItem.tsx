import React from "react";
import {PlayCircle} from "lucide-react"

export default function LessonListItem(props: any) {
    const convertMinutes = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        let result = "";
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
            <span className="font-semibold hover:text-orange cursor-pointer">
                Bài {props.index}: {props.name}
            </span>

            <div className="flex items-center gap-2">
                <PlayCircle className="h-3.5 w-3.5 text-Lime"/>

                <span className="text-Lime text-sm">
                    {convertMinutes(props.duration)}
                </span>
            </div>
        </div>
    )
};