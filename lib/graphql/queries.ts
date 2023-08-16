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

const ADD_WORD = gql`
  mutation ($data: AddWordInput!) {
    addWord(input: $data) {
      word
      id
    }
  }
`
export { GET_WORDS, DELETE_WORDS, ADD_WORD }
