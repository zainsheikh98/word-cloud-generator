import Error from '@/public/icons/Error'
import Success from '@/public/icons/Success'
import React from 'react'

interface ToastProps {
  message: string
  type: 'Success' | 'Error'
}

const Toast = ({ message, type }: ToastProps) => {
  const COLOR_SCHEME =
    type === 'Success'
      ? 'bg-green-500 border-green-700'
      : 'bg-red-500 border-red-700'

  const ICON = type === 'Success' ? <Success /> : <Error />

  return (
    <div
      className={`flex items-center ${COLOR_SCHEME} border-l-4 py-2 px-3 shadow-md mb-2 absolute inset-x-0 top-0`}
    >
      <div className="text-red-500 rounded-full bg-white mr-3">{ICON}</div>
      <div className="text-white max-w-xs ">{message}</div>
    </div>
  )
}

export default Toast
