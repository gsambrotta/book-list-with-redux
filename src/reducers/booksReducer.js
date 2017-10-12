import * as actions from '../actions/books'

const initialState = {
  books: [],
  isLoading: false,
  error: false,
  total: null
}

export default function(state = initialState, action) {

  switch (action.type) {
    case actions.FETCH_BOOKS_REQUEST:
      return { ...state, isLoading: true }

    case actions.FETCH_BOOKS_SUCCESS:
      const { items, totalItems } = action.payload
      return {
        ...state,
        isLoading: false,
        books: items,
        total: totalItems
      }

    case actions.FETCH_BOOKS_FAIL:
      return { ...state, error: action.payload, isLoading: false }

    default:
      return state
  }
}
