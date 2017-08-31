import { combineReducers } from 'redux'

import { app } from 'reducers/App'
import { contacts } from 'reducers/Contacts'
import { chats } from 'reducers/Chats'
import { client } from 'reducers/Client'
import { login } from 'reducers/Login'
import { account } from 'reducers/Account'
import { settings } from 'reducers/Settings'

export default combineReducers({
    app,
    contacts,
    chats,
    client,
    login,
    account,
    settings,
})

