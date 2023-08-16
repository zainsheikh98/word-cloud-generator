import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    words: [WordCloud]
    deleteWords: DeleteWordsResponse
  }

  type Mutation {
    addWord(input: AddWordInput!): Word
  }

  input AddWordInput {
    word: String!
  }

  type Word {
    id: ID
    word: String!
  }

  type WordCloud {
    word: String
    frequency: Int
  }

  type DeleteWordsResponse {
    deletedCount: Int
  }
`
export default typeDefs
