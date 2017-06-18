import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isEmpty, clone } from 'lodash'
import { Redirect } from 'react-router-dom'

import { TodoItemHeader, Loader } from 'components'

import styles from './TodoItem.scss'


const propTypes = {
    fetchTodoItem: PropTypes.func.isRequired,
    saveTodoItem: PropTypes.func.isRequired,
    item: PropTypes.object,
    loading: PropTypes.bool,
    errorMessage: PropTypes.object,
    match: PropTypes.object,
}

class TodoItem extends React.Component {
    componentWillMount() {
        if (!this.state.isNew)
            this.props.fetchTodoItem(this.state.itemId)
    }
    
    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.item)) {
            this.setState({
                redirectTo: `/todo/${nextProps.item.id}`,
                isNew: false,
            })

            let item = {
                id: nextProps.item.id,
                title: nextProps.item.title,
                description: nextProps.item.description,
            }

            this.setState({item})
        }
    }

    constructor(props) {
        super(props)

        let itemId = this.props.match.params.id

        this.state = {
            item: {
                title: '',
                description: '',
            },
            isNew: (itemId === 'new'),
            itemId: itemId,
            redirectTo: null,
            isEditing: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    handleInputChange(event) {
        const target = event.target
        const name = target.name
        let value = target.value
        let item = {...this.state.item}
        item[name] = value

        this.setState({item})
    }
    
    onSubmit() {
        let data = clone(this.state.item)
        if (!this.state.isNew)
            data['id'] = this.props.item.id
        this.props.saveTodoItem(data)
    }

    render() {
        const {loading} = this.props
        const {isNew, redirectTo} = this.state
        
        if (isNew && !isEmpty(redirectTo)) {
            return (
                <Redirect to={this.state.redirectTo}/>
            )
        }

        if (this.props.errorMessage) {
            return <h1>{this.props.errorMessage}</h1>
        }

        if (loading) {
            return (
                <Loader />
            )
        }

        return (
            <div className="row">
                <div className="col-md-10">
                    <TodoItemHeader
                        title={this.state.item.title || ''} 
                        description={this.state.item.description || ''}
                        onInput={this.handleInputChange}
                    />
                </div>
                <div className="col-md-2 pull-right">
                    <button className={
                            classNames(styles['publish-button'], 
                                'btn btn-outline-primary')
                            }
                            onClick={this.onSubmit}
                    >
                        {isEmpty(this.props.item) ? 'Publish' : this.state.isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        )
    }
}

TodoItem.propTypes = propTypes

export default TodoItem