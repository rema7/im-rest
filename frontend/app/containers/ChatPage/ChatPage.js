import { connect } from 'react-redux'

import { logout } from 'actions/Login'
import { wsConnect, send, disconnect, connecting } from 'actions/Client'
import { ChatPage } from 'components'
import { connectionStatus } from 'selectors'

const mapStateToProps = (state) => {
    return {
        session: state.login.session,
        messages: state.client.messages,
        ws: {
            errorMessage: state.client.errorMessage,
            connecting: state.client.connecting,
            connected: state.client.connected,
        },
        connectionStatus: connectionStatus(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout:() => {
            dispatch(logout())
        },
        send:(message) => {
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)