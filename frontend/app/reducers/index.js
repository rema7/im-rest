import { combineReducers } from 'redux'

import { client } from 'reducers/Client'
import { login } from 'reducers/Login'

export default combineReducers({
    client,
    login,
})

