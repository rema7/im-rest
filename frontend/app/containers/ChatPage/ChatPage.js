import { connect } from 'react-redux'

import { 
    send,
} from 'actions/Client'
import { 
    fetchChats,
    sendMessage,
    receivedNewMessages,
} from 'actions/Chats'
import { logout } from 'actions/Login'
import { ChatPage } from 'components'

const mapStateToProps = (state) => {
    return {
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
        fetchChats:() => {
            dispatch(fetchChats())
        },
        updateMessages:(messages) => {
            dispatch(receivedNewMessages(messages))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)