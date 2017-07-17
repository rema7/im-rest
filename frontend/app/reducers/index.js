import { combineReducers } from 'redux'

import { contacts } from 'reducers/Contacts'
import { chats } from 'reducers/Chats'
import { client } from 'reducers/Client'
import { login } from 'reducers/Login'

export default combineReducers({
    contacts,
    chats,
    client,
    login,
})

