import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { enableBatching } from 'redux-batched-actions'
import { createStore, applyMiddleware, compose } from 'redux'

import { MainPage } from 'containers'
import middlewares from 'middlewares'
import rootReducer from 'reducers'


const enhancer = compose(
    applyMiddleware(...middlewares),
)

import './index.scss'

const store = createStore(
    enableBatching(rootReducer),
    {},
    enhancer
)

const app = (store) => (
    <Provider store={store}>
        <MainPage />
    </Provider>
)

ReactDOM.render(
    app(store),
    document.getElementById('app'),
)
