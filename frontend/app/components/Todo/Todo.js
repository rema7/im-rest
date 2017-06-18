import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

import { TodoRow } from 'components'


const propTypes = {
    fetchTodo: PropTypes.func.isRequired,
    items: PropTypes.array,
    loading: PropTypes.bool,
    history: PropTypes.object,
}

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            createNew: false,
            redirectTo: 'todo/new',
        }
        this.createNew = this.createNew.bind(this)
    }

    componentWillMount() {
        this.props.fetchTodo()
    }
    
    createNew() {
        this.setState({
            createNew: true,
        })
    }

    render() {
        const {items, loading} = this.props
        const {createNew} = this.state

        if (loading) {
            return (
                <h1>Loading</h1>
            )
        }

        if (createNew) {
            return <Redirect to={this.state.redirectTo}/>
        }

        return (
            <div className="container">
                <button className="btn btn-outline-primary" onClick={this.createNew}>Create todo</button>
                {
                    items.map((item, i) => {
                        return (
                            <div key={i.toString()}>
                                <Link to={`todo/${item.id}`}>
                                    <TodoRow item={item}/>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

Todo.propTypes = propTypes

export default Todo
