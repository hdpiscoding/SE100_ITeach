'use client';
import React from 'react';

export default function LessonContent(props: any){
    const [content, setContent] = React.useState<React.ReactNode>(
        <div style={{fontSize: '18px', fontWeight: '500', color: '#4B5563'}}>
            <h1 style={{fontSize: '2rem', fontWeight: '700', marginBottom: '16px'}}>Giới thiệu về JavaScript</h1>

            <section style={{marginBottom: '24px'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600'}}>JavaScript là gì?</h2>
                <p>
                    JavaScript (JS) là một ngôn ngữ lập trình phổ biến được sử dụng để phát triển các ứng dụng web động.
                    Nó là một ngôn ngữ kịch bản phía client, có thể được chạy trực tiếp trong trình duyệt mà không cần phải
                    tải lại trang. JavaScript hỗ trợ tương tác động với người dùng, xử lý sự kiện, và thay đổi nội dung
                    trang
                    web mà không cần phải tải lại trang.
                </p>
            </section>

            <section style={{marginBottom: '24px'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600'}}>Biến và Kiểu Dữ Liệu</h2>
                <p>
                    JavaScript hỗ trợ các kiểu dữ liệu cơ bản như số, chuỗi, boolean, đối tượng, mảng, v.v. Bạn có thể khai
                    báo
                    biến với các từ khóa như <code>var</code>, <code>let</code>, và <code>const</code>.
                </p>
                <ul style={{listStyleType: 'disc', marginLeft: '20px'}}>
                    <li><strong>var:</strong> Được sử dụng để khai báo biến trong các phiên bản JavaScript cũ.</li>
                    <li><strong>let:</strong> Dùng để khai báo biến có thể thay đổi giá trị.</li>
                    <li><strong>const:</strong> Dùng để khai báo biến có giá trị không thay đổi sau khi khởi tạo.</li>
                </ul>
                <code style={{display: 'block', backgroundColor: '#F3F4F6', padding: '16px', marginTop: '16px'}}>
                    {`let x = 10; // Biến x có giá trị 10`}
                </code>
            </section>

            <section style={{marginBottom: '24px'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600'}}>Các Cấu Trúc Điều Kiện</h2>
                <p>
                    JavaScript hỗ trợ các cấu trúc điều kiện như <code>if</code>, <code>else</code>,
                    và <code>switch</code> để
                    xử lý các tình huống dựa trên điều kiện. Dưới đây là một ví dụ đơn giản với câu lệnh <code>if</code>.
                </p>
                <code style={{display: 'block', backgroundColor: '#F3F4F6', padding: '16px', marginTop: '16px'}}>
                    {`if (x > 10) { \n  console.log("x lớn hơn 10"); \n}`}
                </code>
            </section>

            <section style={{marginBottom: '24px'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600'}}>Vòng Lặp</h2>
                <p>
                    JavaScript hỗ trợ các vòng lặp như <code>for</code>, <code>while</code>, và <code>forEach</code> để
                    lặp qua các phần tử trong mảng hoặc các đối tượng.
                </p>
                <code style={{display: 'block', backgroundColor: '#F3F4F6', padding: '16px', marginTop: '16px'}}>
                    {`for (let i = 0; i < 5; i++) { \n  console.log(i); \n}`}
                </code>
            </section>
        </div>);
    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
            {content}
        </div>
    );
};