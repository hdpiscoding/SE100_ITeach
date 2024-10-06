import React from 'react';

const Narbar = () => {
  return (
    <nav className="p-7 flex justify-center">
      <ul className="flex space-x-32">
        <li>
          <a href="#" className="text-orange-600">Trang chủ</a>
        </li>
        <li>
          <a href="#" className="text-black">Khóa học</a>
        </li>
        <li>
          <a href="#" className="text-black">Quá trình</a>
        </li>
        <li>
          <a href="#" className="text-black">Về chúng tôi</a>
        </li>
      </ul>
    </nav>
  );
};

export default Narbar;