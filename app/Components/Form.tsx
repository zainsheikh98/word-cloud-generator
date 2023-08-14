'use client'

import React, { useState } from 'react'
import { AddToWordCloudAction } from '../actions'
import Loader from '@/public/icons/Loader'
import { Toast } from '@/app/Components/'
import { setTimeout } from 'timers'

const Form = () => {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'Success' | 'Error'
  }>({
    message: '',
    type: 'Success',
  })

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const word = data.get('word')
      if (!word || typeof word !== 'string') {
        return {
          error: 'Missing Word!',
        }
      }
      const response = await AddToWordCloudAction({ word, path: '/' })
      return response
    } catch (error) {
      setLoading(false)
      console.log('Error while calling: "handleSubmit()"', error)
    }
  }

  const handleFeedback = async (data: { error: Error; word: string }) => {
    try {
      if (data.error)
        setNotification({
          message: `Something Went Wrong: "${data.error}"`,
          type: 'Error',
        })
      if (data.word)
        setNotification({
          message: `"${data.word}" Added To DB!`,
          type: 'Success',
        })
    } catch (error) {
      console.log('Error while calling: "handleFeedback()"', error)
    } finally {
      setTimeout(() => {
        setNotification({
          message: '',
          type: 'Success',
        })
      }, 3000)
      setLoading(false)
    }
  }

  return (
    <>
      {notification?.message && (
        <Toast message={notification?.message} type={notification?.type} />
      )}
      <form
        action={async (formData) => {
          const data = await handleSubmit(formData)
          await handleFeedback(data)
        }}
        key={Math.random()}
        className="text-gray-600 body-font"
      >
        <div className="container py-24 mx-auto flex flex-wrap items-center w-full">
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              WORD CLOUD GENERATOR
            </h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Write a sentence
              </label>
              <input
                type="text"
                name="word"
                placeholder="What's on your mind"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              disabled={loading}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {loading ? <Loader /> : 'Add'}
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Your sentence will be saved in our DB
            </p>
          </div>
        </div>
      </form>
    </>
  )
}

export default Form
