import React from "react";
import { Clock } from "lucide-react"


export default function ChapterListItem(props: any) {
    const convertMinutes = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes === 0 ? `${hours}h` : `${hours}h ${remainingMinutes}m`;
    }

    return (
        <div className="flex flex-col">
            <span className="font-semibold text-lg text-left">
                Chương {props.index}: {props.name}
            </span>

            <div className="flex items-center gap-4">
                <span className="text-sm text-DarkGray">
                    {props.videos} videos
                </span>

                <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-orange"/>

                    <span className="text-orange text-sm font-semibold">
                        {convertMinutes(props.duration)}
                    </span>
                </div>
            </div>
        </div>
    )
};