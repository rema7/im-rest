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

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.chats) {
    //         // eslint-disable-next-line no-console
    //     }
    // }

    onClickHandler(chat) {
        let { chatId } = chat
        this.setState({
            currentChatId: chatId,
        })
        this.props.changeChat(chatId)
    }

    isSelected(chat) {
        return this.state.currentChatId ? this.state.currentChatId === chat.chatId : false
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
                            isSelected={this.isSelected(chat)}
                        />
                    )
                })}
            </div>
        )
    }
}

ChatList.propTypes = propTypes

export default ChatList