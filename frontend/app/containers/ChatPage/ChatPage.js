import { connect } from 'react-redux'

import { 
    wsConnect,
    send,
    disconnect,
    connecting,
} from 'actions/Client'
import { 
    fetchChats,
    sendMessage,
    receivedNewMessages,
} from 'actions/Chats'
import { logout } from 'actions/Login'
import { ChatPage } from 'components'
import { connectionStatus } from 'selectors'

const mapStateToProps = (state) => {
    return {
        session: state.login.session,
        ws: {
            errorMessage: state.client.errorMessage,
            connecting: state.client.connecting,
            connected: state.client.connected,
        },
        connectionStatus: connectionStatus(state),
        currentChat: state.chats.currentChat,
        chats: state.chats.chats,
        newMessages: state.client.messages,
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
        disconnect:() => {
            dispatch(disconnect())
        },
        connect:() => {
            dispatch(connecting())
            dispatch(wsConnect())
        },
        connecting:() => {
            dispatch(connecting())
        },
        fetchChats:() => {
            dispatch(fetchChats())
        },
        updateMessages:(messages) => {
            dispatch(receivedNewMessages(messages))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)