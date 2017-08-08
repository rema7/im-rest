import { connect } from 'react-redux'

import { changeChat } from 'actions/Chats'
import { ChatList } from 'components'

const mapStateToProps = (state) => {
    const chats = state.chats.chats.map((chat) => {
        const { chatId, title, members, newMessagesCount } = chat
        return {
            chatId,
            title,
            members, 
            newMessagesCount,
        }
    })

    return {
        chats: chats,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeChat:(chatId) => {
            dispatch(changeChat(chatId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)