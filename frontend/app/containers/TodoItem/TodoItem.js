import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { TodoItem } from 'components'
import { fetchTodoItem, saveTodoItem } from 'actions/TodoItem'

const mapStateToProps = (state) => {
    return {
        item: state.todoItem.item,
        loading: state.todoItem.loading,
        errorMessage: state.todoItem.errorMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodoItem: (params) => {
            dispatch(fetchTodoItem(params))
        },
        saveTodoItem: (params) => {
            dispatch(saveTodoItem(params))
        },
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoItem))
