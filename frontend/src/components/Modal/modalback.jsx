import React from 'react'

const modalback = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 className="text-lg font-semibold mb-4">Bạn chưa lưu bài giảng, bài học của mình</h3>
      <p className="mb-6">Bạn có chắc chắn muốn rời khỏi trang này?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          onClick={handleConfirmBack}
          className="px-4 py-2 bg-orange text-white rounded hover:bg-orange-600"
        >
          Xác nhận
        </button>
      </div>
    </div>
  </div>
  )
}

export default modalback
