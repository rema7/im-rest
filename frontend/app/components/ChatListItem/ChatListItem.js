import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import styles from './ChatListItem.scss'


const propTypes = {
    chatItem: PropTypes.object.isRequired,
}

class ChatListItem extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={classNames(styles['chat-list-item'])}>
                <div className={classNames(styles['image'])}>
                </div>
                <div className={classNames(styles['info-wrapper'])}>
                    <div className={classNames(styles['title'])}>
                        {this.props.chatItem.title}
                    </div>
                    <div className={classNames(styles['last-message'])}>
                    </div>
                </div>
            </div>
        )
    }
}

ChatListItem.propTypes = propTypes

export default ChatListItem