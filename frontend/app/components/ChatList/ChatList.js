import React from 'react'
import PropTypes from 'prop-types'

import { ChatListItem } from 'components'


const propTypes = {
    chats: PropTypes.array.isRequired,
}

class ChatList extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.chats.map((chatItem) => {
                    return (
                        <ChatListItem
                            chatItem={chatItem}
                        />
                    )
                })}
            </div>
        )
    }
}

ChatList.propTypes = propTypes

export default ChatList