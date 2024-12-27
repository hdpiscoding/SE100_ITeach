/* eslint-disable react/no-children-prop,@typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import Markdown from "react-markdown";

export default function LessonContent(props: any){
    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6 ">
            <div className="prose col-start-1">
                <Markdown children={props.content}
                          className="space-y-4"
                          components={{
                              blockquote: ({node, ...props}) => (
                                  <blockquote className="border-l-[3px] border-blue-500 pl-4 italic bg-LightGray p-2" {...props} />
                              ),
                              ul: ({node, ...props}) => (
                                  <ul className="list-disc pl-6" {...props} />
                              ),
                              ol: ({node, ...props}) => (
                                  <ol className="list-decimal pl-6" {...props} />
                              ),
                              h1: ({ children }) => (
                                  <h1 className="text-4xl font-bold my-4">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                  <h2 className="text-3xl font-semibold my-3">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                  <h3 className="text-2xl font-medium my-2">{children}</h3>
                              ),
                              h4: ({ children }) => (
                                  <h4 className="text-xl font-light text-red-400 my-1">{children}</h4>
                              ),
                            }}/>
            </div>
        </div>
    );
};