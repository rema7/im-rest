import { combineReducers } from 'redux'

import { contacts } from 'reducers/Contacts'
import { client } from 'reducers/Client'
import { login } from 'reducers/Login'

export default combineReducers({
    client,
    contacts,
    login,
})

