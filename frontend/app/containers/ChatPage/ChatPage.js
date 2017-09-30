import { connect } from 'react-redux'

import {
    fetchAccount,
} from 'actions/Account'
import {
    fetchChats,
    sendMessage,
    updateChatsMessages,
    markMessagesAsRead,
} from 'actions/Chats'
import {
    wsConnect,
    send,
} from 'actions/Client'
import {
    closeSidebar,
} from 'actions/Sidebar'

import { logout } from 'actions/Login'
import { ChatPage } from 'components'
import { connectionStatus } from 'selectors'

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        currentChat: state.chats.currentChat,
        connectionStatus: connectionStatus(state),
        isSidebarOpen: state.sidebar.open,
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
        fetchAccount:() => {
            dispatch(fetchAccount())
        },
        closeSidebar:() => {
            dispatch(closeSidebar())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)