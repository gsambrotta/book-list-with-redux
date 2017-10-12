import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from './reducers/index'
// import { createLogger } from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
export default function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware, apiMiddleware))
  )
}
