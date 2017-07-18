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
                {this.props.chats.map((chatItem) => {
                    return (
                        <ChatListItem
                            key={chatItem.id}
                            clickHandler={this.onClickHandler}
                            chatItem={chatItem}
                            isSelected={this.state.currentChat === chatItem}
                        />
                    )
                })}
            </div>
        )
    }
}

ChatList.propTypes = propTypes

export default ChatList