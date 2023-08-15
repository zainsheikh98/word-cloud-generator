import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    words: [Word]
    deleteWords: DeleteWordsResponse
  }

  type Word {
    word: String
    frequency: Int
  }

  type DeleteWordsResponse {
    deletedCount: Int
  }
`
export default typeDefs
