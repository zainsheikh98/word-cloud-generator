'use client'
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { Toast, WordCloud } from '@/app/Components'
import { deleteWordCloudAction } from '@/app/actions'
import { useLazyQuery } from '@apollo/client'
import { GET_WORDS } from '@/lib/graphql/queries'

const CTAs = () => {
  const [loading, setLoading] = useState(false)
  const [showWordCloud, setShowWordCloud] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'Success' | 'Error'
  }>({
    message: '',
    type: 'Success',
  })

  const [
    getWords,
    { loading: loadingWords, data: words, error: displayWordsError },
  ] = useLazyQuery(GET_WORDS, {})

  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await deleteWordCloudAction({ path: '/' })
      if (response?.recordsDeleted) {
        setNotification({
          message: `${response?.recordsDeleted} Records Removed!`,
          type: 'Success',
        })
      }
      if (response?.error) {
        setNotification({
          message: `${response?.error || 'Something went wrong!'}`,
          type: 'Error',
        })
      }
    } catch (error) {
      console.log('Error while calling: "handleDelete()"', error)
    } finally {
      setLoading(false)
      setShowWordCloud(false)
      setTimeout(() => {
        setNotification({
          message: '',
          type: 'Success',
        })
      }, 3000)
    }
  }

  const handleDisplayWordCloud = async () => {
    try {
      await getWords()
      let message = ''
      if (displayWordsError)
        message = `${displayWordsError?.message || 'Something went wrong!'}`
      if (!words?.words?.length) message = 'DB is empty!'
      if (words?.words?.length) setShowWordCloud(true)
      setNotification({
        message,
        type: 'Error',
      })
    } catch (error) {
      console.log('Error while calling: "handleDisplayWordCloud()"', error)
    } finally {
      setTimeout(() => {
        setNotification({
          message: '',
          type: 'Success',
        })
      }, 3000)
    }
  }

  return (
    <>
      <section className="w-2/4 text-gray-600 body-font">
        {notification?.message && (
          <Toast message={notification?.message} type={notification?.type} />
        )}
        <div className="container w-full mx-auto">
          <div className="w-full flex flex-row sm:flex-row sm:items-start items-start justify-between mx-auto">
            <button
              disabled={loading}
              onClick={handleDelete}
              className="w-64 flex-shrink-0 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mt-10 sm:mt-0"
            >
              Clear DB
            </button>
            <button
              disabled={loadingWords}
              className="w-64 flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
              onClick={handleDisplayWordCloud}
            >
              Display Word Cloud
            </button>
          </div>
        </div>
      </section>
      {showWordCloud && <WordCloud words={words?.words} />}
    </>
  )
}

export default CTAs
