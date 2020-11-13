import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store