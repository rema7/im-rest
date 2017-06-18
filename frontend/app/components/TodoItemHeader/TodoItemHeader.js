import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import styles from './TodoItemHeader.scss'

const propTypes = {
    onInput: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}


class TodoItemHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            html: '<h1>asd</h1>',
        }
    }

    handleInputChange(event) {
        this.props.onInput(event)
    }

    focusedStyle() {
        return this.props.title.length > 0 ? styles['focused'] : 'empty'
    }

    render() {
        return (
            <h1 className={classNames(styles['wrapper'], this.focusedStyle())}
                data-label="Title" 
                data-placeholder="Title"
            >
                <input className={classNames(styles['lesson-title-input'])}
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={this.props.title}
                    onChange={::this.handleInputChange}
                />
            </h1>
        )
    }
}

TodoItemHeader.propTypes = propTypes

export default TodoItemHeader