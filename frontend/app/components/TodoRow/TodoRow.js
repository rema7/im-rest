import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import styles from './TodoRow.scss'


const propTypes = {
    item: PropTypes.object.isRequired,
}


class TodoRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {title, descr} = this.props.item

        return (
            <div>
                <div className={classNames(styles['lesson-row'])}>
                    <h1>{title}</h1>
                    <h2>{descr}</h2>
                </div>
            </div>
        )
    }
}

TodoRow.propTypes = propTypes

export default TodoRow