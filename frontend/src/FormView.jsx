import React from 'react'
import { useLocation } from 'react-router-dom'

function FormView() {
  const location = useLocation();
  const item = location.state.item;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-pink-50 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-gray-700">Form Details</h1>
        <div className="flex flex-col gap-2">
          <p><span className="font-bold">Full Name:</span> {item.fullname}</p>
          <p><span className="font-bold">Email:</span> <a href={`mailto:${item.email}`} className="text-blue-600">{item.email}</a></p>
          <p><span className="font-bold">Type:</span> {item.type}</p>
          <p><span className="font-bold">Message:</span> {item.message}</p>
          <p><span className="font-bold">Submitted At:</span> {new Date(item.createdAt).toLocaleString()}</p>
          {item.image?
          <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold">Bug Image:</p>
          <img src={item.image} alt="Uploaded Bug" className="w-full rounded-xl border" />
        </div>:""}
        </div>
      </div>
    </div>
  )
}

export default FormView
