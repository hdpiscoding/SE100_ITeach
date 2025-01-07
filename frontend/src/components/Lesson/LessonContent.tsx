/* eslint-disable react/no-children-prop,@typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */
'use client';
import React from 'react';

export default function LessonContent(props: any){
    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6 ">
            <div className="col-start-1">
                <div dangerouslySetInnerHTML={{ __html: props.content }}>

                </div>
            </div>
        </div>
    );
};