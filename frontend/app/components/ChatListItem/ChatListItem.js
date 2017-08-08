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
        newMessagesCount: PropTypes.number,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,

    clickHandler: PropTypes.func.isRequired,
}

class ChatListItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: false,
            newMessages: 0,
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { newMessagesCount } = nextProps.chatItem
        if (nextProps.chatItem) {
            this.setState({
                newMessages: newMessagesCount,
            })
        }
        if (nextProps.isSelected) {
            this.setState({
                isSelected: nextProps.isSelected,
                newMessages: 0,
            })
        }
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

    renderBadge() {
        return this.state.newMessages > 0 ? 
            <div className={classNames(styles['badge'])}>
                <span>{this.state.newMessages}</span>
            </div>
            : null
    }

    render() {
        return (
            <div onClick={this.clickHandler} className={classNames(this.setStyles())}>
                { this.renderBadge() }
                <div className={classNames(styles['image'])}>
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