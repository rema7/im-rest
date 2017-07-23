import thunkMiddleware from 'redux-thunk'
import socketMiddleware from './socketMiddleware'
import authInterceptor from './authInterceptor'

let middlewares = [
    thunkMiddleware,
    socketMiddleware,
    authInterceptor,
]

export default middlewares

