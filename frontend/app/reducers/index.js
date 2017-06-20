import { combineReducers } from 'redux'

import { auth } from 'reducers/Auth'
import { login } from 'reducers/Login'

export default combineReducers({
    login,
    auth,
})

