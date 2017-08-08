import { connect } from 'react-redux'

import {
    wsConnect,
    send,
} from 'actions/Client'
import { 
    fetchChats,
    sendMessage,
    updateChatsMessages,
    markMessagesAsRead,
} from 'actions/Chats'

import { logout } from 'actions/Login'
import { ChatPage } from 'components'
import { connectionStatus } from 'selectors'

const mapStateToProps = (state) => {
    return {
        currentChat: state.chats.currentChat,
        currentChatMesages: state.chats.currentChat ? state.chats.currentChat.messages : [],
        chats: state.chats.chats,
        connectionStatus: connectionStatus(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout:() => {
            dispatch(logout())
        },
        send:(message) => {
            dispatch(sendMessage(message))
            dispatch(send(message))
        },
        fetchChats:() => {
            dispatch(fetchChats())
        },
        updateMessages:(messages) => {
            dispatch(updateChatsMessages(messages))
        },
        markMessagesAsRead:(chatId) => {
            dispatch(markMessagesAsRead(chatId))
        },
        connect:() => {
            dispatch(wsConnect())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)