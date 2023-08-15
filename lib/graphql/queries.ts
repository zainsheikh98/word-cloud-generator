import { gql } from '@apollo/client'

const GET_WORDS = gql`
  query {
    words {
      word
      frequency
    }
  }
`
export { GET_WORDS }
