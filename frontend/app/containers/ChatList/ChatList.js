import { connect } from 'react-redux'

import { ChatList } from 'components'

const mapStateToProps = (state) => {
    return {
        chats: state.chats.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)