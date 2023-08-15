import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    words: [Word]
  }

  type Word {
    word: String
    frequency: Int
  }
`
export default typeDefs
