import thunkMiddleware from 'redux-thunk'
import socketMiddleware from './socketMiddleware'

let middlewares = [
    thunkMiddleware,
    socketMiddleware,
]

export default middlewares

