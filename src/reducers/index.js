import { combineReducers } from 'redux'
import booksList from './booksReducer'

const rootReducer = combineReducers({
  booksList
})

export default rootReducer
