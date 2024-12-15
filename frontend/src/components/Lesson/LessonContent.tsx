'use client';
import React from 'react';
import Markdown from "react-markdown";

export default function LessonContent(props: any){
    const [content, setContent] = React.useState<string>(`# JavaScript là gì?

JavaScript (JS) là một ngôn ngữ lập trình phổ biến được sử dụng để phát triển các ứng dụng web động. Nó là một ngôn ngữ kịch bản phía client, có thể được chạy trực tiếp trong trình duyệt mà không cần phải tải lại trang. JavaScript hỗ trợ tương tác động với người dùng, xử lý sự kiện, và thay đổi nội dung trang web mà không cần phải tải lại trang.

## Biến và Kiểu Dữ Liệu

JavaScript hỗ trợ các kiểu dữ liệu cơ bản như số, chuỗi, boolean, đối tượng, mảng, v.v. Bạn có thể khai báo biến với các từ khóa như \`var\`, \`let\`, và \`const\`.

- **var**: Được sử dụng để khai báo biến trong các phiên bản JavaScript cũ.
- **let**: Dùng để khai báo biến có thể thay đổi giá trị.
- **const**: Dùng để khai báo biến có giá trị không thay đổi sau khi khởi tạo.

> Ví dụ:

\`\`\`javascript
let x = 10; // Biến x có giá trị 10`);
    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6 ">
            <div className="prose col-start-1">
                <Markdown children={content}
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