'use client'
import React from 'react'
import ReactWordCloud from 'react-d3-cloud'

interface WordCloudProps {
  words: { word: string; frequency: number }[]
}

const rotate = () => (~~(Math.random() * 6) - 3) * 30

const COLORS = [
  '#FFB997',
  '#F67E7D',
  '#EBF2FA',
  '#D9E5D6',
  '#D6D4A0',
  '#DB5461',
  '#FFBF00',
  '#C6DBF0',
  '#D1CFE2',
]

const WordCloud = ({ words }: WordCloudProps) => {
  const data = words?.map(function ({ word, frequency }) {
    return {
      text: word,
      value: frequency,
    }
  })

  return (
    <div className="p-4 w-full">
      <ReactWordCloud
        data={data}
        width={100}
        height={100}
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => word.value * 15}
        spiral="rectangular"
        rotate={rotate}
        padding={1}
        random={Math.random}
        fill={() => COLORS[Math.ceil(Math.random() * 8)]}
      />
    </div>
  )
}

export default React.memo(WordCloud)
