import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import styles from './ChatListItem.scss'


const propTypes = {
    chatItem: PropTypes.shape({
        chatId: PropTypes.number.isRequired,
        title: PropTypes.string,
        members: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        })).isRequired,
        newMessages: PropTypes.number.isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,

    clickHandler: PropTypes.func.isRequired,
}

class ChatListItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        this.props.clickHandler(this.props.chatItem)
    }

    setStyles() {
        let result = [styles['chat-list-item']]
        if (this.props.isSelected) {
            result.push(styles['selected'])
        }
        return result
    }

    renderTitle() {
        const { title, members } = this.props.chatItem
        return title || `${members[0].firstName} ${members[0].lastName}`
    }

    render() {
        return (
            <div onClick={this.clickHandler} className={classNames(this.setStyles())}>
                <div className={classNames(styles['image'])}>
                    {this.props.chatItem.newMessages}
                </div>
                <div className={classNames(styles['info-wrapper'])}>
                    <div className={classNames(styles['title'])}>
                        {this.renderTitle()}
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