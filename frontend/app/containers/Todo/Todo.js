import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Todo } from 'components'
import { fetchTodo } from 'actions/Todo'

const mapStateToProps = (state) => {
    return {
        items: state.todo.items,
        loading: state.todo.loading,
    }
}

const mapDispatchToProps = { fetchTodo }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Todo))
