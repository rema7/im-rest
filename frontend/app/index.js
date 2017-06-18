import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import { MainWrapper, TodoItem } from 'containers'
import middlewares from 'middlewares'
import rootReducer from 'reducers'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import classNames from 'classnames'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const enhancer = compose(
    applyMiddleware(...middlewares),
)

import styles from './index.scss'

const store = createStore(rootReducer, {}, enhancer)

const app = (store) => (
    <Provider store={store}>
        <Router history={history}>
            <div className={classNames(styles['body'])}>
                <Switch>
                    <Route exact path="/" component={MainWrapper}/>
                    <Route path="/todo/:id" component={TodoItem}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    </Provider>
)

ReactDOM.render(
    app(store),
    document.getElementById('app'),
)
