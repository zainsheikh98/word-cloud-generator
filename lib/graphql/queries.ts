import { gql } from '@apollo/client'

const GET_WORDS = gql`
  query {
    words {
      word
      frequency
    }
  }
`

const DELETE_WORDS = gql`
  query {
    deleteWords {
      deletedCount
    }
  }
`
export { GET_WORDS, DELETE_WORDS }
