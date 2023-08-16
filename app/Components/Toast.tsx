'use client'

import Error from '@/public/icons/Error'
import Success from '@/public/icons/Success'
import { ToastNotification } from '@/types'
import React, { useEffect } from 'react'

interface ToastProps extends ToastNotification {
  hideToast: () => void
}

const Toast = ({ message, type, hideToast }: ToastProps) => {
  const COLOR_SCHEME = {
    Success: 'bg-green-500 border-green-700',
    Error: 'bg-red-500 border-red-700',
  }
  const ICON = {
    Success: <Success />,
    Error: <Error />,
  }

  useEffect(() => {
    setTimeout(() => {
      hideToast()
    }, 3000)
  }, [hideToast])

  return (
    <div
      className={`flex items-center ${COLOR_SCHEME[type]} border-l-4 py-2 px-3 shadow-md mb-2 absolute inset-x-0 top-0`}
    >
      <div className="text-red-500 rounded-full bg-white mr-3">
        {ICON[type]}
      </div>
      <div className="text-white max-w-xs ">{message}</div>
    </div>
  )
}

export default Toast
