import { RSAA } from 'redux-api-middleware'

const URL_API = 'https://www.googleapis.com/books/v1/volumes'
const MAX_RESULTS = '&maxResults=5'

export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS'
export const FETCH_BOOKS_FAIL = 'FETCH_BOOKS_FAIL'
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST'
export function fetchBooks(query) {
  return {
    [RSAA]: {
      endpoint: `${URL_API}?q=${query}${MAX_RESULTS}`,
      method: 'GET',
      types: [FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAIL]
    }
  }
}
