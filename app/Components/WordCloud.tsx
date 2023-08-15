'use client'
import React, { useEffect, useState } from 'react'
import cloud from 'd3-cloud'

interface WordCloudProps {
  words: { word: string; frequency: number }[]
}

const WordCloud = ({ words }: WordCloudProps) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()

  useEffect(() => {
    const canvas = document?.querySelector('#canvas')
    const context = (canvas as HTMLCanvasElement)?.getContext('2d')
    if (context) context.fillStyle = 'white'
    setCanvas(canvas as HTMLCanvasElement)
  }, [])

  const mappedWords = words?.map(function ({ word, frequency }) {
    return {
      text: word,
      size: frequency * 30,
    }
  })

  canvas &&
    cloud()
      .size([1, 1])
      .canvas(() => canvas)
      .words(mappedWords)
      .fontWeight(300)
      .rotate(() => Math.floor(Math.random() * 4) * 90)
      .font('serif')
      .fontSize((word) => word.size as number)
      .start()

  return (
    <section className="overflow-hidden">
      <div className="container px-24 py-24 mx-auto">
        <canvas id="canvas"></canvas>
      </div>
    </section>
  )
}

export default React.memo(WordCloud)
