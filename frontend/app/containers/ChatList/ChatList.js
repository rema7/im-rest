import { connect } from 'react-redux'

import { changeChat } from 'actions/Chats'
import { ChatList } from 'components'

const mapStateToProps = (state) => {
    return {
        chats: state.chats.chats,
        notifications: state.notifications.notifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeChat:(selectedChat) => {
            dispatch(changeChat(selectedChat))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)