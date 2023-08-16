'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Loader from '@/public/icons/Loader'
import { Toast } from '@/app/Components/'
import { ToastNotification } from '@/types'
import { ADD_WORD } from '@/lib/graphql/queries'
import { useMutation } from '@apollo/client'

const Form = () => {
  const [notification, setNotification] = useState<ToastNotification>({
    message: '',
    type: 'Success',
  })

  const [addWord, { called, loading, data, error }] = useMutation(ADD_WORD)

  const handleSubmit = async (data: FormData) => {
    try {
      const word = data.get('word')
      if (!word || typeof word !== 'string') {
        return {
          error: 'Please enter a valid word!',
        }
      }
      await addWord({
        variables: {
          data: {
            word,
          },
        },
      })
    } catch (error) {
      console.log('Error while calling: "handleSubmit()"', error)
    }
  }

  useEffect(() => {
    try {
      if (called && !loading && error)
        setNotification({
          message: `${error?.message}`,
          type: 'Error',
        })
      if (called && !loading && data?.addWord?.word)
        setNotification({
          message: `"${data?.addWord?.word}" Added To DB!`,
          type: 'Success',
        })
    } catch (error) {
      console.log(
        'Error while calling: "handleFeedback()"',
        (error as Error)?.message
      )
    }
  }, [called, data?.addWord?.word, error, loading])

  const hideToast = useCallback(() => {
    setNotification({
      message: '',
      type: 'Success',
    })
  }, [])

  return (
    <>
      {notification?.message && (
        <Toast
          hideToast={hideToast}
          message={notification?.message}
          type={notification?.type}
        />
      )}
      <form action={handleSubmit} className="text-gray-600 body-font">
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
