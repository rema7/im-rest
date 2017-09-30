import { combineReducers } from 'redux'

import { app } from 'reducers/App'
import { account } from 'reducers/Account'
import { chats } from 'reducers/Chats'
import { contacts } from 'reducers/Contacts'
import { client } from 'reducers/Client'
import { login } from 'reducers/Login'
import { settings } from 'reducers/Settings'
import { sidebar } from 'reducers/Sidebar'

export default combineReducers({
    account,
    app,
    chats,
    client,
    contacts,
    login,
    settings,
    sidebar,
})

