import React from 'react'
import PropTypes from 'prop-types'

import { ChatListItem } from 'components'


const propTypes = {
    chats: PropTypes.array.isRequired,

    changeChat: PropTypes.func.isRequired,
}

class ChatList extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            currentChat: null,
        }

        this.onClickHandler = this.onClickHandler.bind(this)
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