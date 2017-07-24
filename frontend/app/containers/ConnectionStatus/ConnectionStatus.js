import { connect } from 'react-redux'

import { switchReconnect } from 'actions/Login'
import { wsConnect } from 'actions/Client'

import { ConnectionStatus } from 'components'

import { connectionStatus } from 'selectors'


const mapStateToProps = (state) => {
    return {
        connectionStatus: connectionStatus(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        connect:() => {
            dispatch(wsConnect())
        },
        switchReconnect:() => {
            dispatch(switchReconnect())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionStatus)
