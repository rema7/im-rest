import { combineReducers } from 'redux'

import { todo } from 'reducers/Todo'
import { todoItem } from 'reducers/TodoItem'
import { settings } from 'reducers/Settings'

export default combineReducers({
    todo,
    todoItem,
    settings,
})

