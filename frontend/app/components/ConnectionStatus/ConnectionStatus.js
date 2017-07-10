import React from 'react'
import PropTypes from 'prop-types'

import {
    SERVER_STATE_CONNECTED,
    SERVER_STATE_CONNECTING,
    SERVER_STATE_CONNECTION_ERROR,
    SERVER_STATE_DISCONNECTED,
} from './translations'

const propTypes = {
    connected: PropTypes.bool.isRequired,
    disconnected: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,

    connect: PropTypes.func.isRequired,
}

class ConnectionStatus extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.state = {
            reconnecting: false,
        }
    }

    reconnect() {
        this.setState({ reconnecting: true })
        setTimeout(() => {
            this.setState({ reconnecting: false })
            this.props.connect()
        }, 2000)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage || (!nextProps.connecting && !nextProps.connected)) {
            if (!this.state.reconnecting) {
                this.reconnect()
            }
        }
    }

    renderConnectionState() {
        let message = SERVER_STATE_DISCONNECTED
        const { connecting, connected } = this.props
        if (connecting) {
            message = SERVER_STATE_CONNECTING
        } else if (connected) {
            message = SERVER_STATE_CONNECTED
        }
        return (
            <h1>Server status: {message}</h1>
        )
    }

    render() {
        return (
            <div>
                {this.renderConnectionState()}
            </div>
        )
    }
}

ConnectionStatus.propTypes = propTypes

export default ConnectionStatus
