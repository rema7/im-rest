import React from 'react'
import PropTypes from 'prop-types'

import { ChatListItem } from 'components'


const propTypes = {
    chats: PropTypes.array.isRequired,
    notifications: PropTypes.object,
    changeChat: PropTypes.func.isRequired,
}

class ChatList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentChat: null,
        }

        this.onClickHandler = this.onClickHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notifications) {
            // eslint-disable-next-line no-console
            console.log(nextProps.notifications)
        }
    }

    onClickHandler(chat) {
        this.setState({
            currentChat: chat,
        })
        this.props.changeChat(chat)
    }

    render() {
        return (
            <div>
                {this.props.chats.map((chat) => {
                    return (
                        <ChatListItem
                            key={chat.chatId}
                            clickHandler={this.onClickHandler}
                            chatItem={chat}
                            isSelected={this.state.currentChat === chat}
                        />
                    )
                })}
            </div>
        )
    }
}

ChatList.propTypes = propTypes

export default ChatList