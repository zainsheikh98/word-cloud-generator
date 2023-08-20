'use client'
export const dynamic = 'force-dynamic'

import React, { useCallback, useEffect, useState } from 'react'
import { Toast, WordCloud } from '@/app/Components'
import { useLazyQuery } from '@apollo/client'
import { DELETE_WORDS, GET_WORDS } from '@/lib/graphql/queries'
import { ToastNotification } from '@/types'

const CTAs = () => {
  const [showWordCloud, setShowWordCloud] = useState(false)
  const [notification, setNotification] = useState<ToastNotification>({
    message: '',
    type: 'Success',
  })

  const [
    getWords,
    {
      called: isDisplayWordsCalled,
      loading: loadingWords,
      data: wordsResponse,
      error: displayWordsError,
    },
  ] = useLazyQuery(GET_WORDS, {
    fetchPolicy: 'no-cache',
  })

  const [
    deleteWords,
    {
      called: isDeleteWordsCalled,
      loading: loadingDelete,
      data: deleteResponse,
      error: deleteWordsError,
    },
  ] = useLazyQuery(DELETE_WORDS, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (deleteWordsError)
      setNotification({
        message: `${deleteWordsError?.message || 'Something went wrong!'}`,
        type: 'Error',
      })

    if (isDeleteWordsCalled && !loadingDelete)
      setNotification({
        message: `${
          deleteResponse?.deleteWords?.deletedCount || 0
        } Records Removed!`,
        type: 'Success',
      })
  }, [deleteResponse, deleteWordsError, isDeleteWordsCalled, loadingDelete])

  useEffect(() => {
    if (displayWordsError)
      setNotification({
        message: `${displayWordsError?.message || 'Something went wrong!'}`,
        type: 'Error',
      })
    if (isDisplayWordsCalled && !loadingWords && !wordsResponse?.words?.length)
      setNotification({
        message: 'DB is empty!',
        type: 'Error',
      })

    if (wordsResponse?.words?.length) setShowWordCloud(true)
  }, [displayWordsError, isDisplayWordsCalled, loadingWords, wordsResponse])

  const handleDelete = async () => {
    try {
      await deleteWords()
    } catch (error) {
      console.log('Error while calling: "handleDelete()"', error)
    } finally {
      setShowWordCloud(false)
    }
  }

  const handleDisplayWordCloud = async () => {
    try {
      await getWords()
    } catch (error) {
      console.log('Error while calling: "handleDisplayWordCloud()"', error)
    }
  }

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
      <section className="container w-full lg:w-[50%] text-gray-600 body-font">
        <div className="w-full flex flex-col items-center justify-center content-center md:flex-row md:justify-between">
          <button
            disabled={loadingDelete}
            onClick={handleDelete}
            className="w-full md:w-64 flex-shrink-0 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mt-2"
          >
            Clear DB
          </button>
          <button
            disabled={loadingWords}
            className="w-full md:w-64 flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-2"
            onClick={handleDisplayWordCloud}
          >
            Display Word Cloud
          </button>
        </div>
      </section>
      {showWordCloud && <WordCloud words={wordsResponse?.words} />}
    </>
  )
}

export default CTAs
