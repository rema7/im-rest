import { combineReducers } from 'redux'

import { login } from 'reducers/Login'
import { client } from 'reducers/Client'

export default combineReducers({
    login,
    client,
})

