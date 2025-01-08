/* eslint-disable @typescript-eslint/no-explicit-any */
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
        <div className={`${(props.type === "lesson" && (props.isStarted || props.isFinished)) ? "grid grid-cols-[73%_2%_25%] items-start" : ""}`}>
            <div className="flex flex-col gap-1">
                <span
                    className={`font-semibold hover:text-orange cursor-pointer ${props.type === "course" ? "" : "text-sm"} ${(props.type === "lesson" && props.isChosen) ? "text-orange" : "text-black"}`}>
                    Bài {props.index}: {props.name}
                </span>

                <div className={`flex items-center ${props.type === "course" ? "gap-2" : "gap-1"}`}>
                    {(props.type === "lesson" && props.isPlaying && props.isChosen && props.isStarted)
                        ? <PauseCircle className={`h-3 w-3 text-orange`}/>
                        :
                        <PlayCircle className={`${props.type === "course" ? "h-3.5 w-3.5" : "h-3 w-3"} ${(props.type === "lesson" && !props.isPlaying && props.isChosen && props.isStarted) ? "text-orange" : "text-Lime"} text-Lime`}/>
                    }

                    <span className={`text-Lime ${props.type === "course" ? "text-sm" : "text-[0.8rem]"} ${(props.type === "lesson" && (props.isPlaying || !props.isPlaying) && props.isChosen && props.isStarted) ? "text-orange" : "text-Lime"}`}>
                        {convertMinutes(props.duration)}
                    </span>
                </div>
            </div>

            {(props.type === "lesson" && props.isFinished && !props.isPlaying && !props.isChosen) && <div className="col-start-3 bg-Lime text-white text-[0.8rem] text-center py-1 px-2 rounded-lg font-semibold">Hoàn thành</div>}
            {(props.type === "lesson" && props.isPlaying && props.isChosen && props.isStarted) && <div className="col-start-3 bg-orange text-white text-[0.8rem] text-center py-1 px-2 rounded-lg font-semibold">Đang phát</div>}
            {(props.type === "lesson" && !props.isPlaying && props.isChosen && props.isStarted) && <div className="col-start-3 bg-orange text-white text-[0.8rem] text-center py-1 px-2 rounded-lg font-semibold">Tạm dừng</div>}
        </div>
    )
};